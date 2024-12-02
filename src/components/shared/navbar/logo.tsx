// "use client";

// import { useEffect, useRef } from "react";
// import Link from "next/link";

// export function Logo() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         const centerX = canvas.width / 2;
//         const centerY = canvas.height / 2;
//         const dotRadius = 70;
//         // const textRadius = 90;

//         // Clear canvas
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // Draw dotted circle
//         ctx.beginPath();
//         for (let i = 0; i < 360; i += 15) {
//           const x = centerX + dotRadius * Math.cos((i * Math.PI) / 180);
//           const y = centerY + dotRadius * Math.sin((i * Math.PI) / 180);
//           ctx.moveTo(x, y);
//           ctx.arc(x, y, 1, 0, 2 * Math.PI);
//         }
//         ctx.fill();

//         // Draw "U" in the center
//         ctx.fillStyle = "white";
//         // ctx.fillStyle = getComputedStyle(
//         //   document.documentElement
//         // ).getPropertyValue("--tw-bg-opacity")
//         //   ? "rgba(31, 41, 55, var(--tw-bg-opacity))"
//         //   : "#1F2937";
//         // ctx.fillStyle = getComputedStyle(
//         //   document.documentElement
//         // ).getPropertyValue("--tw-bg-opacity")
//         //   ? "rgba(55, 65, 81, var(--tw-bg-opacity))"
//         //   : "#374151";

//         ctx.font = "bold 56px sans";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillText("IX", centerX, centerY);

//         // Draw curved "UTERO STORE" text along the circle
//         ctx.font = "16px sans";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";

//         // const text = "UTERO STORE";
//         // const angle = Math.PI;

//         ctx.save();
//         ctx.translate(centerX, centerY);

//         // Loop through each character and draw it along the curve below the circle in the correct order
//         // for (let i = 0; i < text.length; i++) {
//         //   const charAngle = -angle / 8 + (angle / (text.length + 12)) * i; // Adjusted angle calculation for correct order
//         //   ctx.save();
//         //   ctx.rotate(charAngle);
//         //   ctx.translate(0, textRadius);
//         //   ctx.rotate(Math.PI); // Keep text upright below the circle
//         //   ctx.fillText(text[i], 0, 0);
//         //   ctx.restore();
//         // }

//         ctx.restore();
//       }
//     }
//   }, []);

//   return (
//     <div className="flex items-center justify-center">
//       <Link href="/" className="relative flex items-center justify-center">
//         <canvas
//           ref={canvasRef}
//           width={200}
//           height={200}
//           className="md:w-32 md:h-32  w-20 h-20"
//         />
//       </Link>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function Logo({ isScrolled }: { isScrolled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dotRadius = 70;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw dotted circle
        ctx.fillStyle = isScrolled ? "#8B5E3C" : "white";
        ctx.beginPath();
        for (let i = 0; i < 360; i += 15) {
          const x = centerX + dotRadius * Math.cos((i * Math.PI) / 180);
          const y = centerY + dotRadius * Math.sin((i * Math.PI) / 180);
          ctx.moveTo(x, y);
          ctx.arc(x, y, 1, 0, 2 * Math.PI);
        }
        ctx.fill();

        // Draw "IX" in the center
        ctx.fillStyle = isScrolled ? "#8B5E3C" : "white";
        ctx.font = "bold 56px sans";
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
          className="md:w-32 md:h-32 w-20 h-20"
        />
      </Link>
    </div>
  );
}
