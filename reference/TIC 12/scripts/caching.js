/**
 * Caching Module
 * 
 * File: scripts/caching.js
 * 
 * Advanced caching strategies for performance optimization
 * 
 * Core Features:
 * - Local storage caching
 * - Session storage caching
 * - Image caching
 * - Lazy loading optimization
 * - Conditional loading based on device capabilities
 * - Performance monitoring
 */

// Caching Module
const Caching = (function() {
    'use strict';
    
    // Configuration
    const config = {
        CACHE_DURATION: {
            SHORT: 300000, // 5 minutes
            MEDIUM: 3600000, // 1 hour
            LONG: 86400000 // 24 hours
        },
        
        BREAKPOINTS: {
            MOBILE: 480,
            TABLET: 768,
            DESKTOP: 1024
        }
    };
    
    // Private functions
    function getCacheKey(key, deviceType = 'all') {
        return `cache_${key}_${deviceType}`;
    }
    
    function getFromCache(key, cacheType = 'localStorage') {
        const storage = cacheType === 'sessionStorage' ? sessionStorage : localStorage;
        const cacheKey = getCacheKey(key);
        const cached = storage.getItem(cacheKey);
        
        if (!cached) return null;
        
        try {
            const parsed = JSON.parse(cached);
            const now = Date.now();
            
            // Check if cache is expired
            if (now - parsed.timestamp > config.CACHE_DURATION.MEDIUM) {
                storage.removeItem(cacheKey);
                return null;
            }
            
            return parsed.data;
        } catch (e) {
            storage.removeItem(cacheKey);
            return null;
        }
    }
    
    function setCache(key, data, duration = 'MEDIUM', cacheType = 'localStorage') {
        const storage = cacheType === 'sessionStorage' ? sessionStorage : localStorage;
        const cacheData = {
            data: data,
            timestamp: Date.now(),
            duration: duration
        };
        
        try {
            storage.setItem(getCacheKey(key), JSON.stringify(cacheData));
        } catch (e) {
            // If localStorage is full, clear old cache entries
            if (e.name === 'QuotaExceededError') {
                // Clear all cache entries
                for (let i = 0; i < storage.length; i++) {
                    const key = storage.key(i);
                    if (key && key.startsWith('cache_')) {
                        storage.removeItem(key);
                    }
                }
                // Try to set cache again
                storage.setItem(getCacheKey(key), JSON.stringify(cacheData));
            }
        }
    }
    
    function clearCache(key, cacheType = 'localStorage') {
        const storage = cacheType === 'sessionStorage' ? sessionStorage : localStorage;
        const cacheKey = getCacheKey(key);
        storage.removeItem(cacheKey);
    }
    
    function clearAllCache(cacheType = 'localStorage') {
        const storage = cacheType === 'sessionStorage' ? sessionStorage : localStorage;
        
        for (let i = 0; i < storage.length; i++) {
            const key = storage.key(i);
            if (key && key.startsWith('cache_')) {
                storage.removeItem(key);
            }
        }
    }
    
    function lazyLoadResources(resources, callback) {
        // Lazy load based on device capabilities
        const deviceType = window.innerWidth <= config.BREAKPOINTS.TABLET ? 'mobile' : 'desktop';
        
        // Load resources based on device type
        if (deviceType === 'mobile') {
            // Load essential resources first
            const essentialResources = resources.filter(r => r.priority === 'high');
            
            // Load non-essential resources after page load
            const nonEssentialResources = resources.filter(r => r.priority !== 'high');
            
            // Load essential resources
            essentialResources.forEach(resource => {
                if (resource.type === 'script') {
                    const script = document.createElement('script');
                    script.src = resource.url;
                    script.async = true;
                    document.head.appendChild(script);
                } else if (resource.type === 'style') {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = resource.url;
                    document.head.appendChild(link);
                }
            });
            
            // Load non-essential resources after page load
            if (nonEssentialResources.length > 0) {
                window.addEventListener('load', function() {
                    nonEssentialResources.forEach(resource => {
                        if (resource.type === 'script') {
                            const script = document.createElement('script');
                            script.src = resource.url;
                            script.async = true;
                            document.head.appendChild(script);
                        } else if (resource.type === 'style') {
                            const link = document.createElement('link');
                            link.rel = 'stylesheet';
                            link.href = resource.url;
                            document.head.appendChild(link);
                        }
                    });
                });
            }
        }
        
        // Execute callback
        if (callback) {
            callback();
        }
    }
    
    function conditionalLoad(resources, conditions, callback) {
        // Check conditions
        const deviceType = window.innerWidth <= config.BREAKPOINTS.TABLET ? 'mobile' : 'desktop';
        
        // Filter resources based on conditions
        const filteredResources = resources.filter(resource => {
            // Check device requirements
            if (resource.conditions) {
                // Check device type
                if (resource.conditions.device && deviceType !== resource.conditions.device) {
                    return false;
                }
                
                // Check screen size
                if (resource.conditions.minWidth && window.innerWidth < resource.conditions.minWidth) {
                    return false;
                }
                
                // Check touch capability
                if (resource.conditions.touchOnly && !('ontouchstart' in window)) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Load filtered resources
        filteredResources.forEach(resource => {
            if (resource.type === 'script') {
                const script = document.createElement('script');
                script.src = resource.url;
                script.onload = function() {
                    // Set cache for successful load
                    setCache(resource.url, true, 'LONG', 'localStorage');
                };
                script.onerror = function() {
                    // Clear cache on error
                    clearCache(resource.url, 'localStorage');
                };
                script.async = true;
                document.head.appendChild(script);
            } else if (resource.type === 'style') {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = resource.url;
                link.onload = function() {
                    // Set cache for successful load
                    setCache(resource.url, true, 'LONG', 'localStorage');
                };
                link.onerror = function() {
                    // Clear cache on error
                    clearCache(resource.url, 'localStorage');
                };
                document.head.appendChild(link);
            }
        });
        
        // Execute callback
        if (callback) {
            callback();
        }
    }
    
    // Performance monitoring
    function measurePerformance() {
        if (!window.performance) return null;
        
        const perfData = {
            loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
            domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart,
            firstContentfulPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
        };
        
        return perfData;
    }
    
    // Public API
    return {
        // Cache management
        get: function(key, callback, cacheType = 'localStorage') {
            const cachedData = getFromCache(key, cacheType);
            if (callback) {
                callback(cachedData);
            }
            return cachedData;
        },
        
        set: function(key, data, duration = 'MEDIUM', cacheType = 'localStorage') {
            setCache(key, data, duration, cacheType);
        },
        
        clear: function(key, cacheType = 'localStorage') {
            clearCache(key, cacheType);
        },
        
        clearAll: function(cacheType = 'localStorage') {
            clearAllCache(cacheType);
        },
        
        // Lazy loading
        lazyLoad: function(resources, callback) {
            lazyLoadResources(resources, callback);
        },
        
        // Conditional loading
        conditionalLoad: function(resources, conditions, callback) {
            conditionalLoad(resources, conditions, callback);
        },
        
        // Performance monitoring
        measurePerformance: function() {
            if (!window.performance) return null;
            
            const perfData = {
                loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
                domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart,
                firstContentfulPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
            };
            
            return perfData;
        },
        
        // Get configuration
        getConfig: function() {
            return config;
        }
    };
})(); // Fixed: Added proper closing parenthesis and semicolon

    // Export for browser usage
if (typeof window !== 'undefined') {
    window.Caching = Caching;
}

// Export for Node.js module.exports
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Caching;
}