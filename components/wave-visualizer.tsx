"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type WaveVisualizerProps = {
  audioRef?: React.RefObject<HTMLAudioElement | null>;
};

const LOGO_ASPECT = 1536 / 1024;
const LOGO_WIDTH = 7.2;
const LOGO_HEIGHT = LOGO_WIDTH / LOGO_ASPECT;
const HALF_SCENE_WIDTH = 4.7;
const HALF_SCENE_HEIGHT = 3.25;

export default function WaveVisualizer({ audioRef }: WaveVisualizerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.zIndex = "10";
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const loader = new THREE.TextureLoader();
    const logoTexture = loader.load("/images/logo5.png");
    logoTexture.colorSpace = THREE.SRGBColorSpace;

    const mainMaterial = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 1,
      depthWrite: false,
    });

    const mainLogo = new THREE.Mesh(
      new THREE.PlaneGeometry(LOGO_WIDTH, LOGO_HEIGHT),
      mainMaterial,
    );
    root.add(mainLogo);

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
      analyser.smoothingTimeConstant = 0.74;
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
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const aspect = width / height;
      const halfHeight = Math.max(HALF_SCENE_HEIGHT, HALF_SCENE_WIDTH / aspect) * 1.05;
      const halfWidth = halfHeight * aspect;

      camera.left = -halfWidth;
      camera.right = halfWidth;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const averageRange = (start: number, end: number, time: number) => {
      if (!frequencyData) {
        return (
          0.34 +
          Math.sin(time * 1.5 + start * 0.04) * 0.2 +
          Math.sin(time * 3.7 + end * 0.018) * 0.14
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

      const bass = averageRange(0, 28, time);
      const mid = averageRange(28, 118, time);
      const high = averageRange(118, 220, time);

      const shakeX = Math.sin(time * 38.0) * high * 0.09;
      const shakeY = Math.cos(time * 31.0) * mid * 0.055;
      const pulse = 1 + bass * 0.12 + mid * 0.035;

      root.position.x = shakeX;
      root.position.y = shakeY;
      root.rotation.z = Math.sin(time * 24.0) * high * 0.035;
      mainLogo.scale.set(pulse + high * 0.025, pulse + bass * 0.04, 1);
      mainMaterial.opacity = 0.84 + mid * 0.16;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      audioElement?.removeEventListener("play", onPlay);
      mainLogo.geometry.dispose();
      mainMaterial.dispose();
      logoTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      source?.disconnect();
      analyser?.disconnect();
      void audioContext?.close();
    };
  }, [audioRef]);

  return (
    <div
      ref={containerRef}
      data-testid="signal-sculpture"
      className="relative h-full min-h-0 w-full overflow-hidden bg-white"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[min(58svh,62vw)] w-[min(87svh,93vw)] -translate-x-1/2 -translate-y-1/2 bg-contain bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: "url('/images/logo5.png')" }}
      />
    </div>
  );
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
