/**
 * ScrollFlow.js
 * A lightweight, dependency-free library for modern scroll interactions.
 * 
 * Features:
 * - Reveal on Scroll (Fade Up, Fade In, Zoom In)
 * - Parallax Effects
 * - Scroll Progress Bar
 * - Smooth Scrolling for Anchor Links
 * 
 * @author Antigravity
 * @version 1.0.0
 */

class ScrollFlow {
    constructor(options = {}) {
        this.options = Object.assign({
            revealThreshold: 0.1,
            parallaxSpeed: 0.5,
            smoothScroll: true,
            progressBar: true
        }, options);

        this.init();
    }

    init() {
        if (this.options.progressBar) {
            this.createProgressBar();
        }

        this.initReveal();
        this.initParallax();
        
        if (this.options.smoothScroll) {
            this.initSmoothScroll();
        }

        // Bind scroll event for continuous updates
        window.addEventListener('scroll', () => {
            this.onScroll();
        }, { passive: true });
    }

    /**
     * Creates a reading progress bar at the top of the viewport
     */
    createProgressBar() {
        const bar = document.createElement('div');
        bar.className = 'sf-progress-bar';
        bar.innerHTML = '<div class="sf-progress-indicator"></div>';
        document.body.prepend(bar);
        this.progressBar = bar.querySelector('.sf-progress-indicator');
    }

    /**
     * Initializes the Intersection Observer for reveal animations
     */
    initReveal() {
        const revealElements = document.querySelectorAll('[data-sf-reveal]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('sf-visible');
                    // Optional: Stop observing once revealed
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: this.options.revealThreshold,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => observer.observe(el));
    }

    /**
     * Initializes Parallax elements
     */
    initParallax() {
        this.parallaxElements = document.querySelectorAll('[data-sf-parallax]');
    }

    /**
     * Initializes Smooth Scrolling for anchor links
     */
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Main scroll handler
     */
    onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Update Progress Bar
        if (this.progressBar) {
            const progress = (scrollTop / scrollHeight) * 100;
            this.progressBar.style.width = `${progress}%`;
        }

        // Update Parallax
        this.parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-sf-parallax') || this.options.parallaxSpeed;
            const yPos = -(scrollTop * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Auto-initialize if configured
if (document.currentScript && document.currentScript.hasAttribute('data-auto-init')) {
    document.addEventListener('DOMContentLoaded', () => {
        window.scrollFlow = new ScrollFlow();
    });
}
