"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const starColors = [0xffffff, 0xdde9ff, 0x9fc7ff, 0xf8fbff, 0xbfd7ff] as const;

type AnimatedObject = {
  kind: "points";
  points: THREE.Points;
  positions: Float32Array;
  speeds: Float32Array;
  depth: number;
};

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (
      child instanceof THREE.Mesh ||
      child instanceof THREE.Points ||
      child instanceof THREE.Line ||
      child instanceof THREE.LineSegments
    ) {
      child.geometry.dispose();

      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
}

function addStarLayer({
  scene,
  count,
  size,
  opacity,
  radiusMin,
  radiusMax,
  depth,
  speedMin,
  speedMax,
}: {
  scene: THREE.Scene;
  count: number;
  size: number;
  opacity: number;
  radiusMin: number;
  radiusMax: number;
  depth: number;
  speedMin: number;
  speedMax: number;
}) {
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const colorValues = new Float32Array(count * 3);
  const color = new THREE.Color();

  for (let i = 0; i < count; i += 1) {
    const radius = radiusMin + Math.random() * (radiusMax - radiusMin);
    const angle = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = -Math.random() * depth;
    speeds[i] = speedMin + Math.random() * speedMax;

    color.setHex(starColors[Math.floor(Math.random() * starColors.length)]);
    color.multiplyScalar(0.72 + Math.random() * 0.58);
    colorValues[i * 3] = color.r;
    colorValues[i * 3 + 1] = color.g;
    colorValues[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colorValues, 3));
  const material = new THREE.PointsMaterial({
    size,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  return { kind: "points", points, positions, speeds, depth } satisfies AnimatedObject;
}

function addStarTunnel(scene: THREE.Scene) {
  return [
    addStarLayer({
      scene,
      count: 1700,
      size: 0.018,
      opacity: 0.85,
      radiusMin: 0.2,
      radiusMax: 4.6,
      depth: 16,
      speedMin: 0.018,
      speedMax: 0.052,
    }),
    addStarLayer({
      scene,
      count: 520,
      size: 0.045,
      opacity: 0.98,
      radiusMin: 0.12,
      radiusMax: 3.6,
      depth: 12,
      speedMin: 0.045,
      speedMax: 0.105,
    }),
    addStarLayer({
      scene,
      count: 120,
      size: 0.085,
      opacity: 0.9,
      radiusMin: 0.08,
      radiusMax: 2.8,
      depth: 9,
      speedMin: 0.075,
      speedMax: 0.15,
    }),
  ];
}

export default function SignalVisualizer() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.035);

    const camera = new THREE.PerspectiveCamera(64, 1, 0.1, 90);
    camera.position.set(0, 0, 4.6);

    const animated = addStarTunnel(scene);

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let animationId = 0;
    const startedAt = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startedAt) / 1000;

      animated.forEach((item) => {
        for (let i = 0; i < item.speeds.length; i += 1) {
          const zIndex = i * 3 + 2;
          item.positions[zIndex] += item.speeds[i] * (0.48 + Math.sin(elapsed * 0.7) * 0.07);
          if (item.positions[zIndex] > 4.2) item.positions[zIndex] = -item.depth;
        }
        item.points.rotation.z += 0.00045;
        item.points.rotation.x = Math.sin(elapsed * 0.12) * 0.055;
        item.points.geometry.attributes.position.needsUpdate = true;
      });

      scene.rotation.y = Math.sin(elapsed * 0.08) * 0.055;
      scene.rotation.x = Math.sin(elapsed * 0.07) * 0.025;
      camera.position.x = Math.sin(elapsed * 0.14) * 0.08;
      camera.position.y = Math.cos(elapsed * 0.12) * 0.055;
      camera.lookAt(0, 0, -0.4);
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      disposeObject(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section className="relative min-h-[calc(100svh-104px)] overflow-hidden bg-black text-white lg:min-h-[calc(100svh-112px)]">
      <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,transparent_0,rgba(0,0,0,0.2)_34%,rgba(0,0,0,0.82)_100%)]" />

    </section>
  );
}
