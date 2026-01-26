// Google Sheets Integration Module
const GoogleSheets = (function() {
    'use strict';
    
    // Configuration
    const config = {
        API_BASE_URL: 'https://sheets.googleapis.com/v4/spreadsheets/',
        CACHE_DURATION: 3600000, // 1 hour in milliseconds
        MAX_RETRIES: 3,
        RETRY_DELAY: 1000 // 1 second delay between retries
    };
    
    // Private functions
    function getCacheKey(sheetId, range) {
        return `google_sheets_${sheetId}_${range}`;
    }
    
    function getFromCache(sheetId, range, cacheType = 'localStorage') {
        const storage = cacheType === 'sessionStorage' ? sessionStorage : localStorage;
        const cacheKey = getCacheKey(sheetId, range);
        const cached = storage.getItem(cacheKey);
        
        if (!cached) return null;
        
        try {
            const parsed = JSON.parse(cached);
            const now = Date.now();
            
            // Check if cache is expired
            if (now - parsed.timestamp > config.CACHE_DURATION) {
                storage.removeItem(cacheKey);
                return null;
            }
            
            return parsed.data;
        } catch (e) {
            storage.removeItem(cacheKey);
            return null;
        }
        
        return parsed.data;
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
    
    // Enhanced error handling with retry logic
    function loadSheetDataWithRetry(sheetId, range, callback, maxRetries = config.MAX_RETRIES) {
        const cacheKey = getCacheKey(sheetId, range);
        
        // Check cache first
        const cachedData = getFromCache(sheetId, range);
        if (cachedData) {
            if (callback) {
                callback(cachedData);
            }
            return;
        }
        
        // If not in cache, fetch from Google Sheets API
        const url = `${config.API_BASE_URL}${sheetId}/${range}?key=${window.SHEETS_CONFIG.API_KEY}`;
        
        // Make API call with retry logic
        let retryCount = 0;
        
        function attemptFetch() {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.values) {
                        // Cache the data
                        setCache(cacheKey, data.values, 'MEDIUM');
                        
                        // Call callback with data
                        if (callback) {
                            callback(data.values);
                        }
                    } else {
                        throw new Error('No data returned from Google Sheets');
                    }
                })
                .catch(error => {
                    retryCount++;
                    
                    if (retryCount < maxRetries) {
                        console.warn(`Retry ${retryCount}/${maxRetries} for Google Sheets API call`);
                        setTimeout(attemptFetch, config.RETRY_DELAY * retryCount);
                    } else {
                        // All retries failed - use fallback content
                        console.error('Google Sheets API call failed after max retries:', error);
                        
                        // Use fallback content from config
                        const fallbackKey = range.split('!')[0];
                        if (window.SHEETS_CONFIG && window.SHEETS_CONFIG.FALLBACK && window.SHEETS_CONFIG.FALLBACK[fallbackKey]) {
                            if (callback) {
                                callback(window.SHEETS_CONFIG.FALLBACK[fallbackKey]);
                            }
                        } else {
                            // No fallback available
                            if (callback) {
                                callback([]);
                            }
                        }
                    }
                });
    }
    
    // Public API - Google Sheets integration functions
    return {
        // Load schedule data from Google Sheets
        loadScheduleData: function(callback) {
            if (!window.SHEETS_CONFIG || !window.SHEETS_CONFIG.SHEET_IDS || !window.SHEETS_CONFIG.RANGES) {
                // Use fallback if config is not configured
                if (SHEETS_CONFIG && SHEETS_CONFIG.FALLBACK && SHEETS_CONFIG.FALLBACK.schedule) {
                    if (callback) {
                        callback(SHEETS_CONFIG.FALLBACK.schedule);
                    }
                } else {
                    // No config - use hardcoded fallback
                    const fallbackSchedule = [
                        {
                            program: 'Sabbath School',
                            day_time: 'Saturdays 9:00 – 10:30',
                            location: 'Assembly Hall (1F)',
                            notes: ''
                        },
                        {
                            program: 'Divine Service',
                            day_time: 'Saturdays 10:30 – 12:00',
                            location: 'Assembly Hall (1F)',
                            notes: ''
                        },
                        {
                            program: 'Afternoon Program',
                            day_time: 'Saturdays 14:00 – 16:00',
                            location: 'Assembly Hall (1F)',
                            notes: ''
                        },
                        {
                            program: 'Children\'s Afternoon Program',
                            day_time: 'Saturdays 14:00 – 16:00',
                            location: 'Class Room (B1)',
                            notes: ''
                        },
                        {
                            program: 'Midweek Connection',
                            day_time: 'Wednesdays 19:30 – 20:30',
                            location: 'Zoom 808-212-7314',
                            notes: ''
                        },
                        {
                            program: 'Tagalog Bible Studies',
                            day_time: 'Tuesdays/Thursdays 21:00 – 22:00',
                            location: 'Zoom 381-269-2541',
                            notes: ''
                        },
                        {
                            program: 'Vespers',
                            day_time: 'Fridays 19:30 – 20:30',
                            location: 'Zoom 808-212-7314',
                            notes: ''
                        }
                    ];
                    if (callback) {
                        callback(fallbackSchedule);
                    }
                }
            } else {
                // Config is configured - load from Google Sheets
                loadSheetDataWithRetry(
                    SHEETS_CONFIG.SHEET_IDS.schedule_data,
                    SHEETS_CONFIG.RANGES.schedule_data,
                    callback
                );
            }
        },
        
        // Load pastor data from Google Sheets
        loadPastorData: function(callback) {
            if (!window.SHEETS_CONFIG || !window.SHEETS_CONFIG.SHEET_IDS || !window.SHEETS_CONFIG.RANGES) {
                // Use fallback if config is not configured
                if (SHEETS_CONFIG && SHEETS_CONFIG.FALLBACK && SHEETS_CONFIG.FALLBACK.pastor) {
                    if (callback) {
                        callback(SHEETS_CONFIG.FALLBACK.pastor);
                    }
                } else {
                    // No config - use hardcoded fallback
                    const fallbackPastor = {
                        name: 'Guenji Imayuki',
                        title: 'Senior Pastor',
                        bio: 'Pastor Guenji Imayuki is a second-generation Japanese born in Brazil. He graduated with a degree in aeronautical engineering at ITA (Air Force Institute of Technology) and worked in the financial area for a few years. Despite the comfortable lifestyle, he reached a turning point in his career and understood that it was a call to ministry.',
                        image: 'images/pastor/pastor_profile_pic.webp'
                    };
                    if (callback) {
                        callback(fallbackPastor);
                    }
                }
            } else {
                // Config is configured - load from Google Sheets
                loadSheetDataWithRetry(
                    SHEETS_CONFIG.SHEET_IDS.pastor_data,
                    SHEETS_CONFIG.RANGES.pastor_data,
                    function(data) {
                        if (data && data.length > 0) {
                            const row = data[0];
                            const pastorData = {
                                name: row[0] || 'Guenji Imayuki',
                                title: row[1] || 'Senior Pastor',
                                bio: row[2] || 'Pastor Guenji Imayuki is a second-generation Japanese born in Brazil. He graduated with a degree in aeronautical engineering at ITA (Air Force Institute of Technology) and worked in the financial area for a few years. Despite the comfortable lifestyle, he reached a turning point in his career and understood that it was a call to ministry.',
                                image: row[3] || 'images/pastor/pastor_profile_pic.webp',
                                spouse_name: row[4] || 'Eliane Hosokawa Imayuki',
                                spouse_bio: row[5] || 'Eliane Hosokawa Imayuki comes from a pastoral family and all her 3 siblings also serve the church. She graduated college of Letters at the most prestigious university in Brazil, USP, and besides teaching career at all levels of Seventh-day Adventist schools she authored Portuguese textbooks adopted nationwide by our denominational school network.',
                                favorite_verse: row[6] || 'Isaiah 55:10-11'
                            };
                            if (callback) {
                                callback(pastorData);
                            }
                        } else {
                            // No data returned - use fallback
                    const fallbackPastor = {
                        name: 'Guenji Imayuki',
                        title: 'Senior Pastor',
                        bio: 'Pastor Guenji Imayuki is a second-generation Japanese born in Brazil. He graduated with a degree in aeronautical engineering at ITA (Air Force Institute of Technology) and worked in the financial area for a few years. Despite the comfortable lifestyle, he reached a turning point in his career and understood that it was a call to ministry.',
                        image: 'images/pastor/pastor_profile_pic.webp'
                    };
                    if (callback) {
                        callback(fallbackPastor);
                    }
                }
            }
        },
        
        // Load ministries data from Google Sheets
        loadMinistriesData: function(callback) {
            if (!window.SHEETS_CONFIG || !window.SHEETS_CONFIG.SHEET_IDS || !window.SHEETS_CONFIG.RANGES) {
                // Use fallback if config is not configured
                const fallbackMinistries = [
                    {
                        ministry_name: 'Media Ministry',
                        ministry_description: 'Transforming pixels into pulpits. Our media team brings the gospel into the digital age, live-streaming services to reach global audiences and creating content that inspires faith beyond our walls. Join us in harnessing technology for God\'s glory.',
                        ministry_details: '**Media Ministry Schedule:**\n\n**Media Ministry Schedule:**\n- Weekly: Live streaming setup (Saturdays 8:00-12:00\n- Weekly: Content creation (Wednesdays 19:00-21:00\n- Monthly: Video editing (Sundays 14:00-16:00\n\n**Contact:** media@tokyoadventist.org',
                        ministry_image: 'media-ministry.jpg',
                        sub_ministries: [
                            {
                                name: 'Youth Media',
                                description: 'Media training for teens',
                                schedule: 'Fridays 16:00-18:00',
                                contact: 'youthmedia@tokyoadventist.org'
                        ],
                        is_active: true
                    },
                    {
                        ministry_name: 'Youth Ministry',
                        ministry_description: 'More than a program—a revolution. We\'re empowering teens to own their faith through dynamic worship, authentic community, and mission experiences that turn belief into action. This is where faith gets real.',
                        ministry_details: '**Youth Ministry Schedule:**\n\n**Youth Ministry Schedule:**\n- Weekly: Youth worship (Fridays 19:00-21:00\n- Monthly: Mission trips (varies)\n- Weekly: Bible studies (Wednesdays 18:00-19:00\n\n**Programs:**\n- Pathfinders (ages 10-14)\n- Adventurers (ages 6-9)\n- Children\'s Ministry (ages 3-5)\n\n**Contact:** youth@tokyoadventist.org',
                        ministry_image: 'youth-ministry.jpg',
                        sub_ministries: [
                            {
                                name: 'Pathfinders',
                                description: 'Adventure meets discipleship! Through camping, honors, and community service, we're building the next generation of Christian leaders.',
                                schedule: 'Saturdays 14:00-16:00',
                                contact: 'pathfinders@tokyoadventist.org'
                        ],
                        is_active: true
                    },
                    {
                        ministry_name: 'Music Ministry',
                        ministry_description: 'Your instrument, God\'s voice. Whether you sing or play, join a community where melodies become worship and talents become offerings. Help us create moments where heaven feels just a little closer.',
                        ministry_details: '**Music Ministry Schedule:**\n\n**Music Ministry Schedule:**\n- Weekly: Choir rehearsal (Thursdays 19:00-21:00\n- Weekly: Band practice (Tuesdays 18:00-20:00\n- Weekly: Worship team (Fridays 17:00-19:00\n\n**Opportunities:**\n- Choir singers\n- Instrumentalists\n- Worship leaders\n- Sound technicians\n- Music arrangers\n\n**Contact:** music@tokyoadventist.org',
                        ministry_image: 'music-ministry.jpg',
                        sub_ministries: [
                            {
                                name: 'Choir',
                                description: 'Vocal worship team',
                                schedule: 'Thursdays 19:00-21:00',
                                contact: 'choir@tokyoadventist.org'
                        ],
                        is_active: true
                    },
                    {
                        ministry_name: 'Health Ministry',
                        ministry_description: 'Honoring God\'s temple—your body. We believe whole-person health is worship. Through cooking classes, fitness groups, and wellness seminars, we're building a healthier congregation from the inside out.',
                        ministry_details: '**Health Ministry Schedule:**\n\n**Health Ministry Schedule:**\n- Monthly: Cooking classes (1st Saturdays 13:00-15:00\n- Weekly: Fitness groups (Mondays 18:00-19:00\n- Monthly: Wellness seminars (3rd Wednesdays 19:00-21:00\n\n**Programs:**\n- Nutrition workshops\n- Exercise groups\n- Mental health seminars\n- Health screenings\n\n**Contact:** health@tokyoadventist.org',
                        ministry_image: 'health-ministry.jpg',
                        sub_ministries: [
                            {
                                name: 'Cooking Classes',
                                description: 'Healthy cooking workshops',
                                schedule: '1st Saturdays 13:00-15:00',
                                contact: 'cooking@tokyoadventist.org'
                        ],
                        is_active: true
                    }
                ];
                if (callback) {
                    callback(fallbackMinistries);
                }
            } else {
                // Config is configured - load from Google Sheets
                loadSheetDataWithRetry(
                    SHEETS_CONFIG.SHEET_IDS.ministries_data,
                    SHEETS_CONFIG.RANGES.ministries_data,
                    function(data) {
                        if (data && data.length > 0) {
                            const ministries = data.map(row => {
                                return {
                                    ministry_name: row[0] || '',
                                    ministry_description: row[1] || '',
                                    ministry_details: row[2] || '',
                                    ministry_image: row[3] || '',
                                    sub_ministries: row[4] ? JSON.parse(row[4]) : [],
                                    is_active: row[5] === 'TRUE'
                                };
                            });
                            if (callback) {
                                callback(ministries);
                            }
                        } else {
                            // No data returned - use fallback
                            // Use hardcoded fallback ministries from above
                            const fallbackMinistries = [
                                {
                                    ministry_name: 'Media Ministry',
                                    ministry_description: 'Transforming pixels into pulpits. Our media team brings the gospel into the digital age, live-streaming services to reach global audiences and creating content that inspires faith beyond our walls. Join us in harnessing technology for God\'s glory.',
                                    ministry_details: '**Media Ministry Schedule:**\n\n**Media Ministry Schedule:**\n- Weekly: Live streaming setup (Saturdays 8:00-12:00\n- Weekly: Content creation (Wednesdays 19:00-21:00\n- Monthly: Video editing (Sundays 14:00-16:00\n\n**Contact:** media@tokyoadventist.org',
                                    ministry_image: 'media-ministry.jpg',
                                    sub_ministries: [
                                        {
                                            name: 'Youth Media',
                                            description: 'Media training for teens',
                                            schedule: 'Fridays 16:00-18:00',
                                            contact: 'youthmedia@tokyoadventist.org'
                ],
                is_active: true
            }
        });
        }
    },
        
        // Load bulletin data from Google Sheets
        loadBulletinData: function(callback) {
            if (!window.SHEETS_CONFIG || !window.SHEETS_CONFIG.SHEET_IDS || !window.SHEETS_CONFIG.RANGES) {
                // Use fallback if config is not configured
                const fallbackBulletin = [
                    {
                        bulletin_date: '2024-01-06',
                        bulletin_title: 'Weekly Bulletin - Jan 6',
                        bulletin_pdf_url: 'https://drive.google.com/file/d/1aBcD.../view?usp=sharing',
                        bulletin_summary: 'This week\'s announcements include the new year\'s service schedule, upcoming events, and special prayer requests.'
                    },
                    {
                        bulletin_date: '2024-01-13',
                        bulletin_title: 'Weekly Bulletin - Jan 13',
                        bulletin_pdf_url: 'https://drive.google.com/file/d/2eFgH.../view?usp=sharing',
                        bulletin_summary: 'Weekly announcements, upcoming events calendar, and community updates.'
                    },
                    {
                        bulletin_date: '2024-01-20',
                        bulletin_title: 'Weekly Bulletin - Jan 20',
                        bulletin_pdf_url: 'https://drive.google.com/file/d/3iJkL.../view?usp=sharing',
                        bulletin_summary: 'Special announcements for the monthly fellowship event and volunteer opportunities.'
                    }
                ];
                if (callback) {
                    callback(fallbackBulletin);
                }
            } else {
                // Config is configured - load from Google Sheets
                loadSheetDataWithRetry(
                    SHEETS_CONFIG.SHEET_IDS.bulletin_data,
                    SHEETS_CONFIG.RANGES.bulletin_data,
                    function(data) {
                        if (data && data.length > 0) {
                            const bulletins = data.map(row => {
                                return {
                                    bulletin_date: row[0] || '',
                                    bulletin_title: row[1] || '',
                                    bulletin_pdf_url: row[2] || '',
                                    bulletin_summary: row[3] || ''
                                };
                            });
                            if (callback) {
                                callback(bulletins);
                            }
                        } else {
                            // No data returned - use fallback
                            // Use hardcoded fallback bulletins from above
                            const fallbackBulletin = [
                                {
                                    bulletin_date: '2024-01-06',
                                    bulletin_title: 'Weekly Bulletin - Jan 6',
                                    bulletin_pdf_url: 'https://drive.google.com/file/d/1aBcD.../view?usp=sharing',
                                    bulletin_summary: 'This week\'s announcements include the new year\'s service schedule, upcoming events, and special prayer requests.'
                    }
                ];
                if (callback) {
                    callback(fallbackBulletin);
                }
            }
        }
    };
    
    // Export for browser usage
    if (typeof window !== 'undefined') {
        window.GoogleSheets = GoogleSheets;
    }
    
    // Export for Node.js module.exports
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = GoogleSheets;
    }
})();