// portfolio.js

// ==================== TAILWIND CONFIGURATION ====================
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            animation: {
                'spin-slow': 'spin 10s linear infinite',
                'spin-reverse': 'spin-reverse 1s linear infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'gradient-x': 'gradientX 3s ease infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float-1': 'float1 6s ease-in-out infinite',
                'float-2': 'float2 8s ease-in-out infinite',
                'float-3': 'float3 7s ease-in-out infinite',
            },
            keyframes: {
                'spin-reverse': {
                    'from': { transform: 'rotate(360deg)' },
                    'to': { transform: 'rotate(0deg)' }
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                gradientX: {
                    '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
                    '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
                },
                float1: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(5deg)' }
                },
                float2: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-15px) rotate(-5deg)' }
                },
                float3: {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-10px) scale(1.05)' }
                }
            }
        }
    }
};

// ==================== MAIN INTERACTION LOGIC ====================

window.addEventListener('load', () => {
    // 1. Initialize Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Intro Sequence
    const runIntro = () => {
        const overlay = document.getElementById('intro-overlay');
        const textContainer = document.getElementById('intro-text-container');
        const progressBar = document.getElementById('intro-progress');
        
        if (!overlay || !textContainer || !progressBar) return;
        
        // Steps sequence
        setTimeout(() => {
            textContainer.innerHTML = '<div class="text-slate-500 text-sm">✓ SYSTEM_INIT</div><div class="text-cyan-400 text-xl font-bold">> LOADING AI MODELS...</div>';
            progressBar.style.width = '33%';
        }, 1000);

        setTimeout(() => {
            textContainer.innerHTML = '<div class="text-slate-500 text-sm">✓ MODULES_LOADED</div><div class="text-green-400 text-2xl font-bold animate-bounce mt-2 tracking-widest">ACCESS GRANTED</div>';
            progressBar.style.width = '66%';
        }, 2500);

        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 3000);

        setTimeout(() => {
            // Fade out
            overlay.style.transform = 'translateY(-100%)';
            // Clean up DOM after transition
            setTimeout(() => {
               overlay.style.display = 'none'; 
            }, 700);
        }, 3500);
    };

    runIntro();

    // 3. 3D Tilt Card Logic (Vanilla JS)
    const tiltCards = document.querySelectorAll('.js-tilt-card');
    
    tiltCards.forEach(card => {
        const inner = card.querySelector('.js-tilt-inner');
        if (!inner) return;
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max rotation 10 deg
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });


    // 4. Parallax Background
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        
        const orb1 = document.getElementById('orb-1');
        const orb2 = document.getElementById('orb-2');
        
        if (orb1) orb1.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        if (orb2) orb2.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
    });


    // 5. Navbar Logic & Scroll Spy
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn && mobileMenu) {
        // Toggle Mobile Menu
        mobileBtn.addEventListener('click', () => {
            if (mobileMenu.classList.contains('max-h-0')) {
                mobileMenu.classList.remove('max-h-0', 'opacity-0');
                mobileMenu.classList.add('max-h-96', 'opacity-100');
                mobileBtn.innerHTML = '<i data-lucide="x"></i>';
            } else {
                mobileMenu.classList.add('max-h-0', 'opacity-0');
                mobileMenu.classList.remove('max-h-96', 'opacity-100');
                mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
            }
            if (window.lucide) {
                lucide.createIcons();
            }
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('max-h-0', 'opacity-0');
                mobileMenu.classList.remove('max-h-96', 'opacity-100');
                mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
                if (window.lucide) {
                    lucide.createIcons();
                }
            });
        });
    }

    // Scroll Event
    window.addEventListener('scroll', () => {
        // Navbar Background
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'shadow-lg');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'shadow-lg');
                navbar.classList.add('bg-transparent');
            }
        }

        // Scroll Spy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const span = link.querySelector('span');
            if (!span) return;
            if (link.getAttribute('data-section') === current) {
                link.classList.add('text-cyan-400');
                link.classList.remove('text-slate-300');
                span.classList.remove('scale-x-0', 'group-hover:scale-x-100');
                span.classList.add('scale-x-100');
            } else {
                link.classList.remove('text-cyan-400');
                link.classList.add('text-slate-300');
                span.classList.remove('scale-x-100');
                span.classList.add('scale-x-0', 'group-hover:scale-x-100');
            }
        });
    });
});
