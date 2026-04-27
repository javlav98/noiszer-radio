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

            let xoff = 0;

            for (let x = 0; x <= p.width + 10; x += 10) {
              const n = p.noise(xoff, y * 0.01, zoff);

              // 🔥 bigger waves + smooth motion
              const offset = p.map(n, 0, 1, -75, 75);

              p.vertex(x, y + offset);

              // smoother horizontal flow
              xoff += 0.05;
            }

            p.endShape();
          }

          // slower = continuous flow
          zoff += 0.003;
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

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
    />
  );
}