document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Background Particles ---
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        // Random horizontal position, delay, and duration
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        particlesContainer.appendChild(particle);
    }


    // --- 3. Unboxing Animation Logic ---
    const sealBtn = document.getElementById('seal-btn');
    const envelope = document.getElementById('envelope');
    const unboxingContainer = document.getElementById('unboxing-container');
    const mainContent = document.getElementById('main-content');
    
    // Music Elements
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    let isPlaying = false;
    bgMusic.volume = 0.15;

    sealBtn.addEventListener('click', () => {
        // Play music
        bgMusic.play().then(() => {
            musicBtn.classList.add('playing');
            isPlaying = true;
        }).catch(err => console.log("Audio not ready:", err));

        // Open Envelope
        envelope.classList.add('open');
        
        setTimeout(() => {
            unboxingContainer.classList.add('hidden');
            setTimeout(() => {
                unboxingContainer.style.display = 'none';
                mainContent.classList.add('visible');
                window.scrollTo(0, 0);
            }, 1000); 
        }, 1000);
    });

    // --- 4. RSVP WhatsApp Link Generation ---
    const rsvpBtn = document.getElementById('rsvp-btn');
    const phoneNumber = '558899014270'; 
    const message = encodeURIComponent('Olá Irene! Confirmo com muita alegria minha presença na sua celebração de 50 anos!');
    rsvpBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;

    // --- 5. Music Player Toggle ---
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play().then(() => {
                musicBtn.classList.add('playing');
            }).catch(error => {
                alert("Para tocar a música, certifique-se de que o arquivo 'musica.mp3' está na mesma pasta do convite.");
            });
        }
        isPlaying = !isPlaying;
    });

    // --- 6. Modals Logic (Janelinhas) ---
    const modalButtons = document.querySelectorAll('[data-target]');
    const closeButtons = document.querySelectorAll('[data-close]');

    modalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('active');
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-close');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.remove('active');
            }
        });
    });

    // Close modal when clicking outside the content
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
});
