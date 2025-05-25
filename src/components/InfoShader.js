// src/components/InfoShader.js

import React, { useRef, useEffect } from 'react';

const InfoShader = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Настройки
    const lineCount = 40;
    const lines = [];

    class Line {
      constructor(x, y, length, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.angle = angle;
        this.speed = speed;
        this.color = color;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < -this.length) this.x = width + this.length;
        if (this.x > width + this.length) this.x = -this.length;
        if (this.y < -this.length) this.y = height + this.length;
        if (this.y > height + this.length) this.y = -this.length;
      }

      draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x + Math.cos(this.angle) * this.length,
          this.y + Math.sin(this.angle) * this.length
        );
        ctx.stroke();
      }
    }

    function randomColor() {
      const base = 255;
      const r = base;
      const g = 128;
      const b = 0;
      const a = 0.3 + Math.random() * 0.7;
      return `rgba(${r},${g},${b},${a.toFixed(2)})`;
    }

    // Инициализация линий
    for (let i = 0; i < lineCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const length = 200 + Math.random() * 100;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.4;
      const color = randomColor();
      lines.push(new Line(x, y, length, angle, speed, color));
    }

    // Анимация
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Создаём размытие и свечение
      ctx.shadowColor = 'rgba(255, 0, 200, 0.7)';
      ctx.shadowBlur = 15;

      // Рисуем линии
      lines.forEach(line => {
        line.update();
        line.draw(ctx);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Обработка ресайза
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        backgroundColor: '#000',
      }}
    />
  );
};

export default InfoShader;
