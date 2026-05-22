// ============================================
// KINGFETSON PORTFOLIO — Frontend Developer Script
// WhatsApp Contact Form Integration
// Animated Logo, Navigation, Scroll Effects & Interactions
// ============================================

(function() {
    'use strict';

    // ---------- CONFIGURATION ----------
    // IMPORTANT: Replace this with your actual WhatsApp phone number
    // Format: country code + phone number (no spaces, no plus sign)
    // Example for Kenya: 254700000000
    const WHATSAPP_PHONE_NUMBER = '254700000000'; // ← UPDATE THIS WITH YOUR NUMBER
    
    // Default welcome message
    const DEFAULT_WELCOME_MESSAGE = "Hello Kingfetson, I'm interested in your frontend development services!";
    
    // ---------- DOM Elements ----------
    const nav = document.getElementById('navbar');
    const logo = document.querySelector('.logo');
    const revealElements = document.querySelectorAll('.reveal');
    const cards = document.querySelectorAll('.card');
    const pills = document.querySelectorAll('.tech-pill');
    const orb1 = document.querySelector('.gradient-orb');
    const orb2 = document.querySelector('.gradient-orb-2');
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    const whatsappForm = document.getElementById('whatsappForm');
    
    // ---------- Helper: Format WhatsApp Message ----------
    function formatWhatsAppMessage(formData) {
        const name = formData.get('name') || 'Client';
        const email = formData.get('email') || 'Not provided';
        const projectType = formData.get('project') || 'Not specified';
        const message = formData.get('message') || 'No details provided';
        
        // Create a professional formatted message
        const formattedMessage = `*NEW FRONTEND PROJECT INQUIRY*%0A%0A` +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A` +
            `*Project Type:* ${encodeURIComponent(projectType)}%0A` +
            `*Message:*%0A${encodeURIComponent(message)}%0A%0A` +
            `*Sent from:* KINGFETSON Portfolio Website`;
        
        return formattedMessage;
    }
    
    // ---------- WhatsApp Form Submission Handler ----------
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(whatsappForm);
            const name = formData.get('name');
            const project = formData.get('project');
            const message = formData.get('message');
            
            // Validation
            if (!name || !project || !message) {
                showFormNotification('Please fill in all required fields (*)', 'error');
                return;
            }
            
            // Format message
            const formattedMsg = formatWhatsAppMessage(formData);
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${formattedMsg}`;
            
            // Show success notification before redirect
            showFormNotification('Redirecting to WhatsApp...', 'success');
            
            // Open WhatsApp in new tab after short delay
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                
                // Optional: Reset form after redirect
                // whatsappForm.reset();
            }, 500);
        });
    }
    
    // ---------- Form Notification Helper ----------
    function showFormNotification(message, type) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.form-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            background: ${type === 'success' ? 'rgba(37, 211, 102, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
            color: white;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            font-family: 'Inter', sans-serif;
        `;
        
        // Add animation keyframes if not exist
        if (!document.querySelector('#notification-animation-style')) {
            const style = document.createElement('style');
            style.id = 'notification-animation-style';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideOutRight {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ---------- 1. Navbar Scroll Effect ----------
    function handleNavbarScroll() {
        if (!nav) return;
        
        if (window.scrollY > 35) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    handleNavbarScroll();
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            handleNavbarScroll();
        });
    });
    
    // ---------- 2. Intersection Observer for Reveal Animations ----------
    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -20px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, idx * 50);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // ---------- 3. Parallax Mouse Movement for Gradient Orbs ----------
    if (orb1 && orb2) {
        let mouseX = 0, mouseY = 0;
        let orb1X = 0, orb1Y = 0;
        let orb2X = 0, orb2Y = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            const targetOrb1X = (mouseX - 0.5) * 25;
            const targetOrb1Y = (mouseY - 0.5) * 25;
            const targetOrb2X = (mouseX - 0.5) * -20;
            const targetOrb2Y = (mouseY - 0.5) * -20;
            
            orb1X += (targetOrb1X - orb1X) * 0.08;
            orb1Y += (targetOrb1Y - orb1Y) * 0.08;
            orb2X += (targetOrb2X - orb2X) * 0.08;
            orb2Y += (targetOrb2Y - orb2Y) * 0.08;
            
            orb1.style.transform = `translate(${orb1X}px, ${orb1Y}px) scale(1.05)`;
            orb2.style.transform = `translate(${orb2X}px, ${orb2Y}px) scale(1.03)`;
        });
    }
    
    // ---------- 4. Smooth Scroll for Anchor Links ----------
    function smoothScroll(targetElement, offset = 85) {
        if (!targetElement) return;
        
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    allAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (!targetId || targetId === '#') return;
            
            if (targetId === '#work' || targetId === '#expertise' || targetId === '#contact') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    smoothScroll(target, 85);
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // ---------- 5. Card Hover Micro-Interactions ----------
    cards.forEach(card => {
        const icon = card.querySelector('.card-icon i');
        
        card.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // ---------- 6. Tech Pill Hover Effects ----------
    pills.forEach(pill => {
        const icon = pill.querySelector('i');
        
        pill.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.15)';
                icon.style.transition = 'transform 0.2s ease';
            }
        });
        
        pill.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // ---------- 7. Animated Logo Interactive Enhancement ----------
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.stopPropagation();
            
            this.style.animation = 'none';
            this.offsetHeight;
            this.style.animation = 'shimmerFlow 5s linear infinite, subtleGlow 3s ease-in-out infinite';
            
            console.log('⚡ KINGFETSON — Frontend Developer Portfolio');
        });
        
        logo.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    }
    
    // ---------- 8. Dynamic Gradient Text Effect on Scroll ----------
    const heroTitle = document.querySelector('.hero h1 .accent-word');
    if (heroTitle) {
        let gradientPos = 0;
        let gradientDirection = 1;
        
        window.addEventListener('scroll', function() {
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            gradientPos += gradientDirection * 0.005;
            
            if (gradientPos >= 1) gradientDirection = -1;
            if (gradientPos <= 0) gradientDirection = 1;
            
            if (Math.abs(scrollPercent - 0.5) < 0.3) {
                const dynamicGradient = `linear-gradient(135deg, #6366f1 ${gradientPos * 50}%, #a855f7 ${50 + gradientPos * 20}%, #ec4899 ${100 - gradientPos * 30}%)`;
                heroTitle.style.background = dynamicGradient;
                heroTitle.style.webkitBackgroundClip = 'text';
                heroTitle.style.backgroundClip = 'text';
            }
        });
    }
    
    // ---------- 9. Initial Hero Animation ----------
    function initialHeroAnimation() {
        const heroElements = document.querySelectorAll('.hero .badge, .hero h1, .hero p, .hero-actions, .tech-stack');
        heroElements.forEach((el, idx) => {
            if (el && !el.style.animation) {
                el.style.animation = `fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${idx * 0.1}s forwards`;
                el.style.opacity = '0';
            }
        });
    }
    
    // Ensure fadeInUp keyframe exists
    if (!document.querySelector('#dynamic-animation-style')) {
        const style = document.createElement('style');
        style.id = 'dynamic-animation-style';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        const heroBadge = document.querySelector('.hero .badge');
        const heroH1 = document.querySelector('.hero h1');
        const heroP = document.querySelector('.hero p');
        const heroActions = document.querySelector('.hero-actions');
        const techStack = document.querySelector('.tech-stack');
        
        if (heroBadge) heroBadge.style.opacity = '1';
        if (heroH1) heroH1.style.opacity = '1';
        if (heroP) heroP.style.opacity = '1';
        if (heroActions) heroActions.style.opacity = '1';
        if (techStack) techStack.style.opacity = '1';
    }, 50);
    
    // ---------- 10. Window Resize Handler ----------
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (orb1 && orb2) {
                orb1.style.transform = '';
                orb2.style.transform = '';
            }
            
            const allReveal = document.querySelectorAll('.reveal:not(.active)');
            allReveal.forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                    el.classList.add('active');
                }
            });
        }, 150);
    });
    
    // ---------- 11. Console Signature (Brand Identity) ----------
    console.log('%c⚡ KINGFETSON • Frontend Developer & UI Engineer', 'color: #a855f7; font-size: 14px; font-weight: bold; font-family: monospace');
    console.log('%cReact • Next.js • TypeScript • Tailwind • WhatsApp Integration', 'color: #6366f1; font-size: 12px');
    console.log('%cBuilding high-performance frontend experiences.', 'color: #94a3b8; font-size: 11px; font-style: italic');
    console.log('%c📱 WhatsApp contact form active — Ready for inquiries!', 'color: #25D366; font-size: 11px');
    
    // ---------- 12. Load Complete Handler ----------
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        
        const hiddenReveal = document.querySelectorAll('.reveal:not(.active)');
        hiddenReveal.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('active');
            }
        });
        
        // Add floating label effect for form inputs (optional enhancement)
        const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    });
    
    // ---------- 13. Touch Device Optimization ----------
    if ('ontouchstart' in window) {
        if (orb1 && orb2) {
            window.removeEventListener('mousemove', () => {});
            orb1.style.transform = 'translate(0, 0)';
            orb2.style.transform = 'translate(0, 0)';
        }
        document.body.classList.add('touch-device');
    }
    
    // ---------- 14. Prefetch / Preconnect for Performance ----------
    const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdnjs.cloudflare.com'
    ];
    
    preconnectLinks.forEach(link => {
        const linkTag = document.createElement('link');
        linkTag.rel = 'preconnect';
        linkTag.href = link;
        linkTag.crossOrigin = 'anonymous';
        document.head.appendChild(linkTag);
    });
    
    // ---------- 15. WhatsApp Direct Links Enhancement ----------
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add tracking or analytics if needed
            console.log('WhatsApp contact initiated from:', this.classList.contains('nav-cta') ? 'navigation' : 'contact section');
        });
    });
    
    // ---------- 16. Dynamic Year Update in Footer ----------
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        if (footerYear.innerHTML.includes('2026')) {
            footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
        }
    }
    
    // ---------- 17. Form Input Character Counter (Optional) ----------
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = 'text-align: right; font-size: 0.7rem; color: var(--text-muted); margin-top: 0.3rem;';
        charCounter.textContent = '0 / 500 characters';
        messageTextarea.parentElement.appendChild(charCounter);
        
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length} / 500 characters`;
            if (length > 500) {
                charCounter.style.color = '#ef4444';
                this.value = this.value.substring(0, 500);
                charCounter.textContent = '500 / 500 characters';
            } else {
                charCounter.style.color = 'var(--text-muted)';
            }
        });
    }
    
    // ---------- 18. Exit Intent (Optional Analytics) ----------
    let exitIntentTriggered = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentTriggered && window.scrollY < 100) {
            exitIntentTriggered = true;
            console.log('✨ Thanks for visiting KINGFETSON frontend portfolio');
            setTimeout(() => { exitIntentTriggered = false; }, 5000);
        }
    });
    
})();
