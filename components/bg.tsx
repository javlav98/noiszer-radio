"use client";

import { useEffect, useRef } from "react";
import type p5 from "p5";

export default function Bg() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sketchInstance: p5 | null = null;

    const loadP5 = async () => {
      const P5 = (await import("p5")).default;

      const sketch = (p: p5) => {
        let zoff = 0;

        const resizeToContainer = () => {
          if (!containerRef.current) return;

          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight;

          p.resizeCanvas(width, height);
        };

        p.setup = () => {
          if (!containerRef.current) return;

          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight;

          const canvas = p.createCanvas(width, height);
          canvas.parent(containerRef.current);
          canvas.style("display", "block");

          p.noFill();
        };

        p.draw = () => {
          p.background(0);

          for (let y = 0; y < p.height; y += 12) {
            p.beginShape();
            p.stroke(255, 255, 255, 90);
            p.strokeWeight(1);

            for (let x = 0; x <= p.width + 10; x += 10) {
              const n = p.noise(x * 0.005, y * 0.01, zoff);
              const offset = p.map(n, 0, 1, -80, 80);

              const px = x;
              const py = y + offset;

              p.vertex(px, py);
            }

            p.endShape();
          }

          zoff += 0.01;
        };

        p.windowResized = () => {
          setTimeout(() => {
            resizeToContainer();
          }, 10);
        };
      };

      sketchInstance = new P5(sketch);
    };

    loadP5();

    return () => {
      sketchInstance?.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden" />;
}