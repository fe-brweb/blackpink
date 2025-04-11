"use client";

import { cn } from "@/lib/utils/cn";
import React, { useEffect, useRef } from "react";

interface FireflyEffectProps extends React.HTMLAttributes<HTMLElement> {}

// 반딧불 객체
class Firefly {
  x: number;
  y: number;
  scale: number;
  angle: number;
  velocity: number;

  constructor(width: number, height: number, color?: string) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.scale = Math.random() * 2;
    this.angle = Math.random() * (Math.PI * 2);
    this.velocity = (this.scale * this.scale) / 4;
  }

  move() {
    this.x += this.velocity * Math.cos(this.angle);
    this.y += this.velocity * Math.sin(this.angle);
    this.angle += (Math.random() * (20 * Math.PI)) / 180 - (10 * Math.PI) / 180;
  }

  show(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.scale * 2
    );

    gradient.addColorStop(0, "rgba(251, 207, 232, 0.8)");
    gradient.addColorStop(0.5, "rgba(236, 72, 153, 0.2)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.scale * 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

const FireflyEffect: React.FC<FireflyEffectProps> = ({ color, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firefliesRef = useRef<Firefly[]>([]);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    // 캔버스 초기 설정
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth),
      h = (canvas.height = window.innerHeight);

    ctx.fillStyle = "rgba(30,30,30,1)";
    ctx.fillRect(0, 0, w, h);

    // 반딧불 객체 렌더링
    const draw = () => {
      if (firefliesRef.current.length < 100) {
        for (let j = 0; j < 10; j++) {
          firefliesRef.current.push(new Firefly(w, h, color));
        }
      }
      ctx.clearRect(0, 0, w, h);

      for (let i = firefliesRef.current.length - 1; i >= 0; i--) {
        const firefly = firefliesRef.current[i];
        firefly.move();
        firefly.show(ctx);

        if (firefly.x < 0 || firefly.y < 0 || firefly.x > w || firefly.y > h) {
          firefliesRef.current.splice(i, 1);
        }
      }

      frameId.current = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      firefliesRef.current = [];
      if (!frameId.current) {
        draw();
      }
    };

    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={cn(className)}>
      <canvas
        ref={canvasRef}
        className="w-ful fixed left-0 top-0 h-lvh"
      ></canvas>
    </div>
  );
};

export default FireflyEffect;
