import { useState, useRef, useEffect, useCallback } from "react";

import "./App.css";

function App() {
 

  const [ctx, setCTX] = useState(null);
  const [mouse, setMouse] = useState({});
  const [isDrag, setDrag] = useState(false);
  const canvas = useRef(null);


  const drawCircle = useCallback(() => {
    ctx.fillStyle = "blue";
    ctx.clearRect(0, 0, canvas.current.height, canvas.current.width);
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
    ctx.fill();
  }, [ctx, mouse]);

  const distanceBetween = useCallback((pointA, pointB) => {
    const temp =
      Math.pow(Math.abs(pointA.x - pointB.x), 2) +
      Math.pow(Math.abs(pointA.y - pointB.y), 2);
    return Math.sqrt(temp);
  }, []);

  useEffect(() => {
    if (canvas.current) {
      let ctxTemp = canvas.current.getContext("2d");
      setCTX(ctxTemp);
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.canvas.width = 1500;
      ctx.canvas.height = 1500;
    }
  }, [ctx]);

  useEffect(() => {
    if (mouse.x) {
      drawCircle();
    }
  }, [mouse.x, mouse.radius]);

  const handleMouseDown = (e) => {
    setDrag(true);
    setMouse({ x: e.clientX, y: e.clientY, radius: 50 });
  };

  const handleMouseMove = (e) => {
    if (isDrag) {
      let newCordinate = { x: e.clientX, y: e.clientY };
      const dis = distanceBetween(newCordinate, mouse);
      setMouse({ ...mouse, radius: Math.floor(dis) });
    }
  };

  const handleMouseUp = (e) => {
    setDrag(false);
  };

  return (
    <>
      <canvas
        ref={canvas}
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      ></canvas>
    </>
  );
}

export default App;
