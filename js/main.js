// HSTAI 777 × V MASTER - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('HSTAI 777 × V MASTER - System Sealed 🔐');
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Highlight
    function setActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);
    
    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Form Validation Helper
    window.validateEmail = function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    window.validatePhone = function(phone) {
        const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        return re.test(phone);
    };
    
    // System Status Display
    function displaySystemStatus() {
        const statusElement = document.querySelector('.system-status');
        if (statusElement) {
            const status = {
                inner: '🔒 KHÓA',
                middle: '🔒 KHÓA', 
                outer: '🔒 KHÓA',
                system: 'ỔN ĐỊNH – MỞ RỘNG – ĐỊNH GIÁ CAO'
            };
            
            statusElement.innerHTML = `Trạng thái: Vòng trong ${status.inner} | Vòng giữa ${status.middle} | Vòng ngoài ${status.outer}`;
        }
    }
    
    displaySystemStatus();
    
    // Performance Monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            if (loadTime < 2000) {
                console.log(`✅ Page loaded in ${loadTime}ms - PWA Mobile-first compliant`);
            } else {
                console.warn(`⚠️ Page load time ${loadTime}ms - Consider optimization`);
            }
        });
    }
    
    // PWA Support Detection
    if ('serviceWorker' in navigator) {
        console.log('✅ PWA Service Worker support detected');
    }
    
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('✅ Running in PWA standalone mode');
    }
    
    // Touch Device Detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        console.log('✅ Touch device detected - Mobile-first optimized');
    }
    
    // GDPR Consent Check
    function checkGDPRConsent() {
        const consent = localStorage.getItem('hstai777_gdpr_consent');
        if (!consent && window.location.hostname !== 'localhost') {
            // Show GDPR banner (implementation depends on design)
            console.log('GDPR consent required for non-localhost');
        }
    }
    
    checkGDPRConsent();
    
    // Add current year to footer
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }
    
    // Network Status Monitor
    window.addEventListener('online', () => {
        console.log('✅ Network connection restored');
        showNotification('Kết nối mạng đã được khôi phục', 'success');
    });
    
    window.addEventListener('offline', () => {
        console.log('⚠️ Network connection lost');
        showNotification('Mất kết nối mạng. Làm việc ở chế độ ngoại tuyến.', 'warning');
    });
    
    function showNotification(message, type = 'info') {
        // Implementation depends on UI design
        console.log(`${type.toUpperCase()}: ${message}`);
    }
    
    // Export for global use
    window.HSTAI777 = {
        version: '1.0.0',
        system: 'SEALED',
        riskLevel: 0,
        utils: {
            validateEmail,
            validatePhone
        }
    };
});