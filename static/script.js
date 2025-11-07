// Particle System
const canvas = document.getElementById('particleCanvas');
const particleCtx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(255, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 0.5 + 0.3})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY *= -1;
        }
    }

    draw() {
        particleCtx.fillStyle = this.color;
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particleCtx.fill();
    }
}

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    particleCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                particleCtx.strokeStyle = `rgba(255, 107, 157, ${0.2 - distance / 500})`;
                particleCtx.lineWidth = 1;
                particleCtx.beginPath();
                particleCtx.moveTo(a.x, a.y);
                particleCtx.lineTo(b.x, b.y);
                particleCtx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Modal functionality
const revealBtn = document.getElementById('revealBtn');
const messageModal = document.getElementById('messageModal');
const closeBtn = document.getElementById('closeBtn');

revealBtn.addEventListener('click', () => {
    messageModal.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    messageModal.classList.remove('show');
});

messageModal.addEventListener('click', (e) => {
    if (e.target === messageModal) {
        messageModal.classList.remove('show');
    }
});

// Add sparkle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.background = '#fff';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }
});

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
