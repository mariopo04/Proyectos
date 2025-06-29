// Versión optimizada del fondo dinámico con fondo azul oscuro sólido
class DynamicBackground {
  constructor() {
    this.canvas = document.getElementById('fondo-dinamico');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = window.innerWidth < 768 ? 50 : 100;
    this.time = 0;

    this.init();
  }

  init() {
    this.setupCanvas();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `rgba(100, 150, 255, ${Math.random() * 0.5 + 0.1})`
      });
    }
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Fondo azul oscuro sólido
    this.ctx.fillStyle = 'rgb(5, 10, 35)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Dibujar partículas
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();

      // Conectar partículas cercanas
      this.connectParticles(particle);
    });
  }

  connectParticles(currentParticle) {
    this.particles.forEach(particle => {
      const distance = Math.sqrt(
        Math.pow(currentParticle.x - particle.x, 2) +
        Math.pow(currentParticle.y - particle.y, 2)
      );

      if (distance < 150) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(100, 150, 255, ${0.3 - distance / 500})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.moveTo(currentParticle.x, currentParticle.y);
        this.ctx.lineTo(particle.x, particle.y);
        this.ctx.stroke();
      }
    });
  }

  updateParticles() {
    this.time += 0.01;

    this.particles.forEach(particle => {
      // Movimiento básico
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Movimiento orgánico con ruido
      particle.x += Math.sin(this.time + particle.y * 0.01) * 0.3;
      particle.y += Math.cos(this.time + particle.x * 0.01) * 0.3;

      // Rebotar en los bordes
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.speedX = -particle.speedX;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.speedY = -particle.speedY;
      }
    });
  }

  animate() {
    this.updateParticles();
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new DynamicBackground();
});
