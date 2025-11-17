// Canvas-based cherry blossom tree with snow
const flowerCanvas = document.getElementById('flowerCanvas');

if (!flowerCanvas) {
    console.error('Flower canvas not found!');
} else {
    const ctx = flowerCanvas.getContext('2d');

    flowerCanvas.width = 400;
    flowerCanvas.height = 350;

class CherryBlossom {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.time = Math.random() * Math.PI * 2;
        this.petalCount = 5;
        this.rotation = Math.random() * Math.PI * 2;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Gentle rotation animation
        this.time += 0.02;
        this.rotation += 0.01;
        ctx.rotate(this.rotation);
        
        const scale = this.size;
        ctx.scale(scale, scale);
        
        // Draw cherry blossom petals
        for (let i = 0; i < this.petalCount; i++) {
            const angle = (Math.PI * 2 / this.petalCount) * i;
            
            ctx.save();
            ctx.rotate(angle);
            
            // Petal - heart-shaped
            ctx.fillStyle = '#FFB7C5';
            ctx.beginPath();
            ctx.moveTo(0, -8);
            ctx.bezierCurveTo(-4, -12, -8, -10, -8, -6);
            ctx.bezierCurveTo(-8, -3, -4, 0, 0, 2);
            ctx.bezierCurveTo(4, 0, 8, -3, 8, -6);
            ctx.bezierCurveTo(8, -10, 4, -12, 0, -8);
            ctx.closePath();
            ctx.fill();
            
            // Petal outline
            ctx.strokeStyle = 'rgba(255, 182, 193, 0.8)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            
            ctx.restore();
        }
        
        // Center
        ctx.fillStyle = '#FFE4E1';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

class Snowflake {
    constructor() {
        this.reset();
        this.y = Math.random() * flowerCanvas.height;
    }

    reset() {
        this.x = Math.random() * flowerCanvas.width;
        this.y = -10;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.drift = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.y += this.speed;
        this.x += this.drift;
        
        if (this.y > flowerCanvas.height) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Branch {
    constructor(startX, startY, endX, endY, thickness) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.thickness = thickness;
        this.time = Math.random() * Math.PI * 2;
    }

    draw(ctx) {
        ctx.save();
        
        // Gentle swaying animation
        this.time += 0.01;
        const sway = Math.sin(this.time) * 2;
        
        ctx.strokeStyle = '#4A3728';
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX + sway, this.endY);
        ctx.stroke();
        
        ctx.restore();
    }
}

class Tree {
    constructor() {
        this.x = 200;
        this.baseY = 350;
        this.time = 0;
        this.branches = this.createBranches();
    }

    createBranches() {
        const branches = [];
        
        // Main trunk - thicker and taller
        branches.push(new Branch(this.x, this.baseY, this.x, 180, 20));
        
        // Major branches - closer together
        branches.push(new Branch(this.x, 180, this.x - 50, 140, 12));
        branches.push(new Branch(this.x, 180, this.x + 50, 140, 12));
        branches.push(new Branch(this.x, 200, this.x - 45, 160, 10));
        branches.push(new Branch(this.x, 200, this.x + 45, 160, 10));
        branches.push(new Branch(this.x, 220, this.x - 35, 190, 9));
        branches.push(new Branch(this.x, 220, this.x + 35, 190, 9));
        
        // Secondary branches
        branches.push(new Branch(this.x - 50, 140, this.x - 80, 110, 8));
        branches.push(new Branch(this.x - 50, 140, this.x - 70, 120, 7));
        branches.push(new Branch(this.x + 50, 140, this.x + 80, 110, 8));
        branches.push(new Branch(this.x + 50, 140, this.x + 70, 120, 7));
        
        branches.push(new Branch(this.x - 45, 160, this.x - 75, 135, 7));
        branches.push(new Branch(this.x + 45, 160, this.x + 75, 135, 7));
        
        // Small branches for fullness
        branches.push(new Branch(this.x - 80, 110, this.x - 100, 90, 5));
        branches.push(new Branch(this.x - 80, 110, this.x - 95, 100, 5));
        branches.push(new Branch(this.x + 80, 110, this.x + 100, 90, 5));
        branches.push(new Branch(this.x + 80, 110, this.x + 95, 100, 5));
        
        return branches;
    }

    draw(ctx) {
        this.branches.forEach(branch => branch.draw(ctx));
    }
}

class FallingPetal {
    constructor() {
        this.reset();
        this.y = Math.random() * flowerCanvas.height;
    }

    reset() {
        this.x = Math.random() * flowerCanvas.width;
        this.y = -20;
        this.size = Math.random() * 0.5 + 0.3;
        this.speed = Math.random() * 1 + 0.5;
        this.drift = Math.random() * 2 - 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.05 - 0.025;
    }

    update() {
        this.y += this.speed;
        this.x += this.drift;
        this.rotation += this.rotationSpeed;
        
        if (this.y > flowerCanvas.height) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.size, this.size);
        
        // Draw simple petal
        ctx.fillStyle = 'rgba(255, 183, 197, 0.7)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Create cherry blossom tree
const tree = new Tree();

// Create cherry blossoms - scattered naturally along branches
const blossoms = [];

// Function to add cluster of blossoms
function addCluster(centerX, centerY, count, spread) {
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * spread;
        blossoms.push(new CherryBlossom(
            centerX + Math.cos(angle) * distance,
            centerY + Math.sin(angle) * distance,
            Math.random() * 0.3 + 0.8
        ));
    }
}

// Top left branch clusters
addCluster(100, 90, 12, 20);
addCluster(110, 100, 10, 18);
addCluster(90, 105, 8, 15);

// Top right branch clusters
addCluster(300, 90, 12, 20);
addCluster(290, 100, 10, 18);
addCluster(310, 105, 8, 15);

// Left side clusters
addCluster(120, 115, 14, 22);
addCluster(130, 125, 12, 20);
addCluster(140, 140, 15, 24);
addCluster(150, 155, 13, 22);
addCluster(160, 170, 11, 20);

// Right side clusters
addCluster(280, 115, 14, 22);
addCluster(270, 125, 12, 20);
addCluster(260, 140, 15, 24);
addCluster(250, 155, 13, 22);
addCluster(240, 170, 11, 20);

// Center top clusters
addCluster(190, 175, 14, 22);
addCluster(200, 170, 16, 25);
addCluster(210, 175, 14, 22);

// Lower middle clusters
addCluster(170, 185, 12, 20);
addCluster(180, 190, 10, 18);
addCluster(220, 190, 10, 18);
addCluster(230, 185, 12, 20);

// Create falling petals
const fallingPetals = [];
for (let i = 0; i < 15; i++) {
    fallingPetals.push(new FallingPetal());
}

// Create snowflakes
const snowflakes = [];
for (let i = 0; i < 50; i++) {
    snowflakes.push(new Snowflake());
}

    // Animation loop
    function animate() {
        // Create gradient background (winter sky)
        const gradient = ctx.createLinearGradient(0, 0, 0, flowerCanvas.height);
        gradient.addColorStop(0, '#E8F4F8');
        gradient.addColorStop(1, '#D4E9F7');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, flowerCanvas.width, flowerCanvas.height);
        
        // Update and draw snowflakes (behind tree)
        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw(ctx);
        });
        
        // Draw tree
        tree.draw(ctx);
        
        // Draw cherry blossoms on tree
        blossoms.forEach(blossom => blossom.draw(ctx));
        
        // Update and draw falling petals (in front)
        fallingPetals.forEach(petal => {
            petal.update();
            petal.draw(ctx);
        });
        
        requestAnimationFrame(animate);
    }

    animate();
}
