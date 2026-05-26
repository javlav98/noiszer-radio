"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type WaveVisualizerProps = {
  audioRef?: React.RefObject<HTMLAudioElement | null>;
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uBass;
  uniform float uMid;
  uniform float uHigh;
  uniform vec2 uResolution;

  varying vec2 vUv;

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float rings(float radius, float speed, float density) {
    return sin(radius * density - uTime * speed);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);

    float bass = max(uBass, 0.08);
    float mid = max(uMid, 0.08);
    float high = max(uHigh, 0.08);

    vec2 p = uv;
    float time = uTime * 0.32;

    vec3 deep = vec3(0.055, 0.025, 0.12);
    vec3 color = deep;

    for (int i = 0; i < 45; i++) {
      float fi = float(i);
      float lane = mod(fi, 9.0) - 4.0;
      float row = floor(fi / 9.0) - 2.0;
      float drift = time * (0.55 + fi * 0.018);
      vec2 center = vec2(
        lane * 0.34 + sin(drift + fi * 1.73) * 0.08,
        row * 0.22 + cos(drift * 0.92 + fi * 2.11) * 0.055
      );

      vec2 delta = p - center;
      delta.x *= 0.78 + sin(time * 1.3 + fi) * 0.12;
      delta.y *= 1.18 + cos(time * 1.1 + fi) * 0.16;

      float radius = 0.075 + bass * 0.025 + sin(time * 1.8 + fi * 1.37) * 0.018;
      float dist = length(delta) / max(radius, 0.02);
      float blob = smoothstep(1.25, 0.0, dist);
      float glow = exp(-dist * dist * 1.8) * 0.22;

      vec3 purple = vec3(0.42, 0.05, 0.95);
      vec3 pink = vec3(1.0, 0.09, 0.58);
      vec3 orange = vec3(1.0, 0.34, 0.04);
      vec3 cyan = vec3(0.0, 0.72, 1.0);

      float cycle = 0.5 + 0.5 * sin(time * 0.9 + fi * 0.7);
      vec3 blobColor = mix(purple, pink, cycle);
      blobColor = mix(blobColor, orange, smoothstep(0.28, 0.9, bass) * (0.4 + 0.4 * sin(fi)));
      blobColor = mix(blobColor, cyan, high * 0.28);

      color += blobColor * (blob * 0.95 + glow);
    }

    float liquid =
      sin(p.x * 4.0 + time * 1.3) *
      sin(p.y * 5.0 - time * 1.1) * 0.08;
    color += vec3(0.35, 0.05, 0.8) * liquid;

    float vignette = 0.62 + smoothstep(1.12, 0.16, length(uv)) * 0.38;
    float scan = 0.97 + sin(gl_FragCoord.y * 1.1) * 0.018;

    color *= vignette * scan;
    color = pow(color, vec3(0.82));

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WaveVisualizer({ audioRef }: WaveVisualizerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uBass: { value: 0.25 },
      uMid: { value: 0.25 },
      uHigh: { value: 0.25 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let source: MediaElementAudioSourceNode | null = null;
    let frequencyData: Uint8Array<ArrayBuffer> | null = null;
    let raf = 0;

    const audioElement = audioRef?.current ?? null;

    const setupAudio = () => {
      if (!audioElement || audioContext) return;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContextClass();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.86;
      frequencyData = new Uint8Array(
        new ArrayBuffer(analyser.frequencyBinCount),
      );

      source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
    };

    const onPlay = async () => {
      setupAudio();
      if (audioContext?.state === "suspended") {
        await audioContext.resume();
      }
    };

    audioElement?.addEventListener("play", onPlay);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      uniforms.uResolution.value.set(width, height);
      renderer.setSize(width, height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const averageRange = (start: number, end: number, time: number) => {
      if (!frequencyData) {
        const center = (start + end) * 0.5;
        return (
          0.42 +
          Math.sin(time * 1.7 + center * 0.025) * 0.18 +
          Math.sin(time * 3.3 + center * 0.01) * 0.14
        );
      }

      let total = 0;
      for (let i = start; i < end; i += 1) {
        total += frequencyData[i] ?? 0;
      }
      return total / Math.max(end - start, 1) / 255;
    };

    const animate = (timeMs: number) => {
      const time = timeMs * 0.001;

      if (analyser && frequencyData) {
        analyser.getByteFrequencyData(frequencyData);
      }

      uniforms.uTime.value = time;
      uniforms.uBass.value = averageRange(0, 28, time);
      uniforms.uMid.value = averageRange(28, 118, time);
      uniforms.uHigh.value = averageRange(118, 220, time);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      audioElement?.removeEventListener("play", onPlay);
      plane.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      source?.disconnect();
      analyser?.disconnect();
      void audioContext?.close();
    };
  }, [audioRef]);

  return <div ref={containerRef} className="h-full min-h-[420px] w-full bg-black" />;
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
