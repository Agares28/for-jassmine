// Canvas-based cute flower drawing
const flowerCanvas = document.getElementById('flowerCanvas');
const ctx = flowerCanvas.getContext('2d');

flowerCanvas.width = 600;
flowerCanvas.height = 600;

class CuteFlower {
    constructor(x, y, size, petalColor, centerColor) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.petalColor = petalColor;
        this.centerColor = centerColor;
        this.time = Math.random() * Math.PI * 2;
        this.petalCount = 5;
        this.petalTimes = Array(this.petalCount).fill(0).map(() => Math.random() * Math.PI * 2);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Animate flower sway
        this.time += 0.02;
        const sway = Math.sin(this.time) * 3;
        ctx.rotate(sway * 0.01);
        
        const scale = this.size;
        ctx.scale(scale, scale);
        
        // Draw petals with individual animation
        for (let i = 0; i < this.petalCount; i++) {
            const angle = (Math.PI * 2 / this.petalCount) * i;
            
            // Update petal animation
            this.petalTimes[i] += 0.03 + (i * 0.005);
            const petalWave = Math.sin(this.petalTimes[i]) * 0.15;
            const petalScale = 1 + Math.sin(this.petalTimes[i] * 0.8) * 0.1;
            
            ctx.save();
            ctx.rotate(angle + petalWave);
            ctx.scale(petalScale, petalScale);
            
            // Petal
            ctx.fillStyle = this.petalColor;
            ctx.beginPath();
            ctx.ellipse(0, -35, 25, 35, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Petal outline
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Petal highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.ellipse(-5, -40, 8, 12, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
        
        // Center circle
        ctx.fillStyle = this.centerColor;
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.fill();
        
        // Center outline
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Center highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(-7, -7, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Center dots (for sunflower effect)
        if (this.centerColor === '#8B4513') {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            for (let i = 0; i < 8; i++) {
                const dotAngle = (Math.PI * 2 / 8) * i;
                const dotX = Math.cos(dotAngle) * 12;
                const dotY = Math.sin(dotAngle) * 12;
                ctx.beginPath();
                ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.restore();
    }
}

class Stem {
    constructor(x, y, height, curve) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.curve = curve || 0;
    }

    draw(ctx) {
        ctx.save();
        
        ctx.strokeStyle = '#5a9234';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.quadraticCurveTo(
            this.x + this.curve,
            this.y + this.height / 2,
            this.x,
            this.y + this.height
        );
        ctx.stroke();
        
        ctx.restore();
    }
}

class Leaf {
    constructor(x, y, size, rotation) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.rotation = rotation;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.size, this.size);
        
        // Leaf shape
        ctx.fillStyle = '#5a9234';
        ctx.beginPath();
        ctx.ellipse(0, 0, 25, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Leaf outline
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Leaf vein
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-15, 0);
        ctx.lineTo(15, 0);
        ctx.stroke();
        
        ctx.restore();
    }
}

class Heart {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.time = Math.random() * Math.PI * 2;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Animate floating
        this.time += 0.03;
        const float = Math.sin(this.time) * 5;
        ctx.translate(0, float);
        
        ctx.scale(this.size, this.size);
        
        // Draw heart
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-10, -10, -20, -5, -20, 5);
        ctx.bezierCurveTo(-20, 15, 0, 25, 0, 25);
        ctx.bezierCurveTo(0, 25, 20, 15, 20, 5);
        ctx.bezierCurveTo(20, -5, 10, -10, 0, 0);
        ctx.closePath();
        ctx.fill();
        
        // Heart outline
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
    }
}

// Create flowers - bigger and centered
const flowers = [
    new CuteFlower(300, 180, 1.8, '#FFD700', '#8B4513'), // Yellow sunflower (center)
    new CuteFlower(200, 240, 1.4, '#FFA500', '#8B4513'), // Orange flower (left)
    new CuteFlower(400, 260, 1.3, '#FFB6C1', '#FF69B4'), // Pink flower (right)
];

const stems = [
    new Stem(300, 260, 280, -15),
    new Stem(200, 300, 240, 20),
    new Stem(400, 320, 220, -10),
];

const leaves = [
    new Leaf(270, 360, 1.2, -0.5),
    new Leaf(330, 370, 1.2, 0.5),
    new Leaf(180, 400, 1.1, -0.6),
    new Leaf(420, 410, 1.1, 0.6),
    new Leaf(240, 420, 1, -0.4),
    new Leaf(380, 430, 1, 0.4),
];

const hearts = [
    new Heart(150, 280, 0.8, '#FFB6C1'),
    new Heart(450, 320, 0.7, '#FFB6C1'),
    new Heart(170, 360, 0.6, '#FFC0CB'),
    new Heart(430, 380, 0.7, '#FFC0CB'),
    new Heart(120, 320, 0.5, '#FFE4E1'),
    new Heart(480, 360, 0.6, '#FFE4E1'),
];

// Animation loop
function animateFlowers() {
    ctx.clearRect(0, 0, flowerCanvas.width, flowerCanvas.height);
    
    // Draw in order
    stems.forEach(stem => stem.draw(ctx));
    leaves.forEach(leaf => leaf.draw(ctx));
    flowers.forEach(flower => flower.draw(ctx));
    hearts.forEach(heart => heart.draw(ctx));
    
    requestAnimationFrame(animateFlowers);
}

animateFlowers();
