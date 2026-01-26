/**
 * Mobile UI Enhancements
 * 
 * File: scripts/mobile-ui.js
 * 
 * Mobile-specific UI enhancements and collapsible content management
 * 
 * Core Features:
 * - Mobile collapsible card system
 * - Toggle functionality for expand/collapse
 * - Mobile-specific UI enhancements
 * - Accessibility features
 * - Keyboard navigation support
 */

// Mobile UI Module
const MobileUI = (function() {
    'use strict';
    
    // Configuration
    const config = {
        BREAKPOINTS: {
        MOBILE: 480,
        TABLET: 768,
        DESKTOP: 1024
    },
        
        ANIMATION_DURATION: 300, // Animation duration in milliseconds
        TOUCH_ENABLED: 'ontouchstart' in window,
        KEYBOARD_NAVIGATION: 'tabIndex' in document.documentElement
    };
    
    // Private functions
    function isMobile() {
        return window.innerWidth <= config.BREAKPOINTS.TABLET;
    }
    
    function toggleCollapsibleContent(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;
        
        // Get the parent card
        const card = target.closest('.card.collapsible');
        if (!card) return;
        
        // Get the expand button
        const expandBtn = card.querySelector('.expand-btn');
        if (!expandBtn) return;
        
        // Toggle expanded state
        const isExpanded = target.classList.contains('expanded');
        
        if (isMobile() || !isExpanded) {
            // Calculate content height
            target.style.display = 'block';
            const contentHeight = target.scrollHeight;
            target.style.display = '';
            
            if (isExpanded) {
                // Collapse animation
                target.style.maxHeight = `${contentHeight}px`;
                expandBtn.setAttribute('aria-expanded', 'false');
                expandBtn.querySelector('.expand-icon').textContent = '+';
                
                setTimeout(() => {
                    target.classList.remove('expanded');
                    target.style.maxHeight = '';
                }, config.ANIMATION_DURATION);
            } else {
                // Expand animation
                target.classList.add('expanded');
                target.style.maxHeight = `${contentHeight}px`;
                expandBtn.setAttribute('aria-expanded', 'true');
                expandBtn.querySelector('.expand-icon').textContent = '×';
            }
        } else {
            // On desktop, just toggle without animation
            target.classList.toggle('expanded');
            expandBtn.setAttribute('aria-expanded', target.classList.contains('expanded'));
            expandBtn.querySelector('.expand-icon').textContent = target.classList.contains('expanded') ? '×' : '+';
        }
    }
    
    function setupCollapsibleCards() {
        // Find all collapsible cards
        const collapsibleCards = document.querySelectorAll('.card.collapsible');
        collapsibleCards.forEach(card => {
            const expandBtn = card.querySelector('.expand-btn');
            const collapsibleContent = card.querySelector('.card-content.collapsible');
            
            if (!expandBtn || !collapsibleContent) return;
            
            // Set initial state
            if (isMobile()) {
                // On mobile, start collapsed
                collapsibleContent.classList.remove('expanded');
                expandBtn.setAttribute('aria-expanded', 'false');
                expandBtn.querySelector('.expand-icon').textContent = '+';
            } else {
                // On desktop, start expanded
                collapsibleContent.classList.add('expanded');
                expandBtn.setAttribute('aria-expanded', 'true');
                expandBtn.querySelector('.expand-icon').textContent = '×';
            }
            
            // Add click event for expand button
            expandBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.closest('.card.collapsible').querySelector('.card-content.collapsible').id;
                toggleCollapsibleContent(targetId);
            });
            
            // Add keyboard navigation support
            expandBtn.addEventListener('keydown', function(e) {
                // Space or Enter key
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    const targetId = this.closest('.card.collapsible').querySelector('.card-content.collapsible').id;
                    toggleCollapsibleContent(targetId);
                }
            });
            
            // Set ARIA attributes
            expandBtn.setAttribute('role', 'button');
            expandBtn.setAttribute('aria-label', 'Toggle content');
            expandBtn.setAttribute('tabindex', '0');
        });
    }
    
    function enhanceMobileNavigation() {
        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', function() {
                const expanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !expanded);
                navLinks.classList.toggle('open');
            });
            
            // Close mobile menu when link is clicked
            const navLinksItems = document.querySelectorAll('.nav-links a');
            navLinksItems.forEach(link => {
                link.addEventListener('click', function() {
                    // Close mobile navigation
                    if (isMobile()) {
                        navToggle.setAttribute('aria-expanded', 'false');
                        navLinks.classList.remove('open');
                    }
                });
            });
        }
    }
    
    function setupBackToTopButton() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
            // Show/hide back to top button
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.style.display = 'block';
                    setTimeout(() => {
                        backToTopBtn.style.opacity = '1';
                    }, 10);
                } else {
                    backToTopBtn.style.opacity = '0';
                    setTimeout(() => {
                        backToTopBtn.style.display = 'none';
                    }, 300);
                }
            });
            
            // Smooth scroll to top
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    function setupAccessibility() {
        // Add ARIA attributes for accessibility
        // Add role="main" to main content
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.setAttribute('role', 'main');
        }
        
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-to-main';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary);
            color: white;
            padding: 8px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        document.body.appendChild(skipLink);
        
        // Show skip link on focus
        skipLink.addEventListener('focus', function() {
            this.style.top = '8px';
        });
        
        // Hide skip link on blur
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
    }
    
    function setupTouchOptimizations() {
        // Add touch-specific classes
        if (config.TOUCH_ENABLED) {
            document.body.classList.add('touch-enabled');
            
            // Prevent double-tap zoom
            let lastTap = 0;
            document.addEventListener('click', function(e) {
                const now = Date.now();
                // Prevent double-tap zoom on mobile
                if (now - lastTap < 300) {
                    e.preventDefault();
                }
                lastTap = now;
            });
        }
    }
    
    // Public API
    return {
        // Initialize Mobile UI
        init: function() {
            setupCollapsibleCards();
            enhanceMobileNavigation();
            setupBackToTopButton();
            setupAccessibility();
            setupTouchOptimizations();
            
            // Add window resize handler
            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    // Re-initialize collapsible cards on resize
                    setupCollapsibleCards();
                }, 250);
            });
            
            // Handle reduced motion preference
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                // Disable animations
                document.body.classList.add('reduced-motion');
            }
        },
        
        // Toggle collapsible content
        toggleCollapsible: function(targetId) {
            toggleCollapsibleContent(targetId);
        },
        
        // Check if mobile
        isMobile: function() {
            return isMobile();
        },
        
        // Get configuration
        getConfig: function() {
            return config;
        }
    };
})();

// Export for browser usage
if (typeof window !== 'undefined') {
    window.MobileUI = MobileUI;
}

// Export for Node.js module.exports
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileUI;
}