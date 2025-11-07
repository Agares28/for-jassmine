// Confetti effect when modal opens
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff85c1'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = Math.random() * 0.7 + 0.3;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            document.body.appendChild(confetti);
            
            const duration = Math.random() * 3000 + 2000;
            const drift = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { 
                    transform: `translateY(0) translateX(0) rotate(0deg)`,
                    opacity: confetti.style.opacity
                },
                { 
                    transform: `translateY(${window.innerHeight + 20}px) translateX(${drift}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => confetti.remove(), duration);
        }, i * 30);
    }
}

// Trigger confetti when modal opens
const originalRevealClick = revealBtn.onclick;
revealBtn.addEventListener('click', () => {
    createConfetti();
});
