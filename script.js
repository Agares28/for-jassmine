// Notify when someone visits the page
function notifyPageVisit() {
    const timestamp = new Date().toLocaleString();
    const message = `Someone opened your page at ${timestamp}`;
    
    console.log('PAGE VISIT:', message);
    
    // Send to ntfy.sh
    fetch('https://ntfy.sh/mywebsite-notifications', {
        method: 'POST',
        body: message,
        headers: {
            'Title': 'Page Visited!',
            'Priority': 'default',
            'Tags': 'eyes,cherry_blossom'
        }
    })
    .then(response => {
        console.log('Notification sent successfully:', response.status);
    })
    .catch(err => {
        console.error('Notification failed:', err);
    });
}

// Blooming intro animation
window.addEventListener('load', () => {
    const bloomIntro = document.getElementById('bloomIntro');
    const mainContent = document.getElementById('mainContent');
    
    // Notify that someone visited
    notifyPageVisit();
    
    // After 3 seconds, hide bloom intro and show content
    setTimeout(() => {
        bloomIntro.classList.add('hidden');
        mainContent.classList.add('visible');
        
        // Start falling sakura after intro
        createSakura();
    }, 3000);
});

// Create falling sakura petals
function createSakura() {
    const container = document.getElementById('sakuraContainer');
    const sakuraCount = 50; // More petals for snow-like effect
    
    for (let i = 0; i < sakuraCount; i++) {
        const sakura = document.createElement('div');
        sakura.classList.add('sakura');
        
        // Random horizontal position
        sakura.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (8-20 seconds)
        const duration = Math.random() * 12 + 8;
        sakura.style.animationDuration = duration + 's';
        
        // Random delay
        sakura.style.animationDelay = Math.random() * 5 + 's';
        
        // Random size
        const size = Math.random() * 15 + 15;
        sakura.style.fontSize = size + 'px';
        
        container.appendChild(sakura);
    }
}

// Add parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Add interactive card effect
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('message-card')) {
            this.style.background = 'rgba(255, 255, 255, 0.98)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('message-card')) {
            this.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
});

// Function to send notification
function sendNotification(response) {
    const timestamp = new Date().toLocaleString();
    
    let message, title, tags;
    if (response === 'yes') {
        message = `She clicked "Okay, let's talk" at ${timestamp}`;
        title = 'She wants to talk!';
        tags = 'heart,tada,cherry_blossom';
    } else {
        message = `She clicked "I need more time" at ${timestamp}`;
        title = 'She needs time';
        tags = 'clock,cherry_blossom';
    }
    
    console.log('NOTIFICATION:', message);
    
    // Send to ntfy.sh
    fetch('https://ntfy.sh/mywebsite-notifications', {
        method: 'POST',
        body: message,
        headers: {
            'Title': title,
            'Priority': 'high',
            'Tags': tags
        }
    })
    .then(response => {
        console.log('Notification sent successfully:', response.status);
        alert('Notification sent! Check your ntfy page.');
    })
    .catch(err => {
        console.error('Notification failed:', err);
        alert('Failed to send notification: ' + err.message);
    });
}

// Handle response buttons
const yesBtn = document.getElementById('yesBtn');
const needTimeBtn = document.getElementById('needTimeBtn');
const yesMessage = document.getElementById('yesMessage');
const timeMessage = document.getElementById('timeMessage');
const responseSection = document.querySelector('.response-section');

yesBtn.addEventListener('click', () => {
    responseSection.style.display = 'none';
    yesMessage.classList.add('show');
    yesMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Send notification
    sendNotification('yes');
});

needTimeBtn.addEventListener('click', () => {
    responseSection.style.display = 'none';
    timeMessage.classList.add('show');
    timeMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Send notification
    sendNotification('no');
});
