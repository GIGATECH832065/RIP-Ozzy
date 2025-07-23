// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Auto-advance slideshow
function nextSlide() {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % totalSlides;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Start slideshow
let slideInterval = setInterval(nextSlide, 4000);

// Manual slide navigation
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        // Clear auto-advance temporarily
        clearInterval(slideInterval);
        
        // Update slides
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        // Restart auto-advance
        slideInterval = setInterval(nextSlide, 4000);
    });
});

// Audio functionality
const audioToggle = document.getElementById('audioToggle');
const ozzyAudio = document.getElementById('ozzyAudio');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const audioText = document.getElementById('audioText');

let isPlaying = false;

audioToggle.addEventListener('click', () => {
    if (isPlaying) {
        ozzyAudio.pause();
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        audioText.textContent = 'OZZY LIVE - OFF';
        audioToggle.classList.remove('playing');
        isPlaying = false;
    } else {
        ozzyAudio.play().catch(error => {
            console.log('Audio play failed:', error);
            // Handle autoplay restrictions
            alert('Please click the button again to play audio. Some browsers require user interaction first.');
        });
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        audioText.textContent = 'OZZY LIVE - ON';
        audioToggle.classList.add('playing');
        isPlaying = true;
    }
});

// Handle audio events
ozzyAudio.addEventListener('ended', () => {
    // This shouldn't fire since we have loop attribute, but just in case
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
    audioText.textContent = 'OZZY LIVE - OFF';
    audioToggle.classList.remove('playing');
    isPlaying = false;
});

ozzyAudio.addEventListener('error', (e) => {
    console.log('Audio error:', e);
    audioText.textContent = 'AUDIO UNAVAILABLE';
    audioToggle.disabled = true;
});

// Smooth scrolling for any internal links (if added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to bio cards
    const bioCards = document.querySelectorAll('.bio-card');
    bioCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add a brief animation
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);
        });
    });
});

// Pause slideshow when page is not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(slideInterval);
    } else {
        slideInterval = setInterval(nextSlide, 4000);
    }
});