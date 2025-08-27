"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function Logo({ isScrolled }: { isScrolled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // console.log(canvas, "canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dotRadius = isScrolled ? 44 : 55;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw dotted circle
        ctx.fillStyle = isScrolled ? "#6B26B7" : "#6B26B7";
        ctx.beginPath();
        for (let i = 0; i < 360; i += 15) {
          const x = centerX + dotRadius * Math.cos((i * Math.PI) / 180);
          const y = centerY + dotRadius * Math.sin((i * Math.PI) / 180);
          ctx.moveTo(x, y);
          ctx.arc(x, y, 1, 0, 2 * Math.PI);
        }
        ctx.fill();

        // Draw "IX" in the center
        ctx.fillStyle = isScrolled ? "#6B26B7" : "#6B26B7";
        ctx.font = isScrolled ? "bold 40px sans" : "bold 48px sans";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("IX", centerX, centerY);
      }
    }
  }, [isScrolled]);

  return (
    <div className="flex items-center justify-center">
      <Link href="/" className="relative flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="md:w-24 md:h-24 w-20 h-20"
        />
      </Link>
    </div>
  );
}
