import React, { useRef, useState, useEffect } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [circles, setCircles] = useState([]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getRandomRadius = () => Math.floor(Math.random() * 50) + 10;

  const drawCircle = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = getRandomRadius();
    const color = getRandomColor();

    const newCircle = { x, y, radius, color };

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    setCircles((prevCircles) => [...prevCircles, newCircle]);
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawCircle(x, y);
  };

  // Check for overlap with existing circles
  const detectOverlap = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    circles.forEach((circle, index) => {
      circles.forEach((otherCircle, otherIndex) => {
        if (index !== otherIndex) {
          const dx = circle.x - otherCircle.x;
          const dy = circle.y - otherCircle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < circle.radius + otherCircle.radius) {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Indicate overlap
            ctx.fill();
            ctx.closePath();
          }
        }
      });
    });
  };

  useEffect(() => {
    detectOverlap();
  }, [circles]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "1px solid black" }}
      onClick={handleCanvasClick}
    />
  );
};

export default Canvas;
