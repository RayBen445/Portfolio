// Enhanced Portfolio Script with Interactive Features
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeNavigation();
    initializeDateTime();
    initializeDailyQuote();
    initializeAnimations();
    initializeScrollEffects();
    initializeInteractiveFeatures();
    initializeEasterEggs();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Only apply smooth scroll for on-page links (hashes)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // For other links, the default browser action (navigation) will occur.
        });
    });
}

// Real-time Date & Time functionality
function initializeDateTime() {
    function getOrdinal(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    function updateDateTime() {
        const now = new Date();
        
        // Format date with ordinal
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dayName = days[now.getDay()];
        const day = now.getDate();
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        
        const formattedDate = `${dayName}, ${day}${getOrdinal(day)} ${month} ${year}`;
        
        // Format time with seconds
        const time = now.toLocaleTimeString('en-US', { 
            hour12: true, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        
        const dateElement = document.getElementById('current-date');
        const timeElement = document.getElementById('current-time');
        
        if (dateElement) dateElement.textContent = formattedDate;
        if (timeElement) timeElement.textContent = time;
    }
    
    // Update immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// Daily Quote functionality
function initializeDailyQuote() {
    const quotes = [
        {
            text: "The best way to predict the future is to create it.",
            author: "Peter Drucker"
        },
        {
            text: "Code is like humor. When you have to explain it, it's bad.",
            author: "Cory House"
        },
        {
            text: "First, solve the problem. Then, write the code.",
            author: "John Johnson"
        },
        {
            text: "Experience is the name everyone gives to their mistakes.",
            author: "Oscar Wilde"
        },
        {
            text: "In order to be irreplaceable, one must always be different.",
            author: "Coco Chanel"
        },
        {
            text: "Java is to JavaScript what car is to Carpet.",
            author: "Chris Heilmann"
        },
        {
            text: "Knowledge is power.",
            author: "Francis Bacon"
        },
        {
            text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
            author: "Dan Salomon"
        },
        {
            text: "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.",
            author: "Antoine de Saint-Exupery"
        },
        {
            text: "Innovation distinguishes between a leader and a follower.",
            author: "Steve Jobs"
        }
    ];

    function updateDailyQuote() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const todaysQuote = quotes[dayOfYear % quotes.length];
        
        const quoteElement = document.getElementById('daily-quote-text');
        if (quoteElement) {
            quoteElement.innerHTML = `"${todaysQuote.text}" <br><span style="font-size: 12px; opacity: 0.8;">- ${todaysQuote.author}</span>`;
        }
    }
    
    updateDailyQuote();
}

// Interactive Code Playground
function runInteractiveCode() {
    function greetDeveloper(name) {
        const greeting = `Hello ${name}! 🚀`;
        return greeting;
    }
    
    const result = greetDeveloper('Fellow Developer');
    const outputElement = document.getElementById('code-output');
    if (outputElement) {
        outputElement.innerHTML = `<strong>Output:</strong> ${result}`;
        
        // Add animation to output
        outputElement.style.opacity = '0';
        outputElement.style.transform = 'translateY(10px)';
        setTimeout(() => {
            outputElement.style.transition = 'all 0.3s ease';
            outputElement.style.opacity = '1';
            outputElement.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Make runInteractiveCode globally available
window.runInteractiveCode = runInteractiveCode;

// Animation and interaction effects
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.project-card, .goal-item, .collab-item, .stat-card, .contact-section, .gallery-item, .featured-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    // Gallery item animations
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                const img = this.querySelector('img');
                if (img) {
                    img.style.opacity = '0';
                    img.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        img.style.transition = 'all 0.5s ease';
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    }, 100);
                }
            }
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const rate = scrolled * -0.3;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.pageYOffset;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercentage + '%';
        });
    };

    createScrollProgress();
}

// Interactive features
function initializeInteractiveFeatures() {
    // Dynamic tech stack highlighting
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 207, 255, 0.4)';
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 207, 255, 0.2)';
            this.style.transform = 'scale(1)';
        });
    });

    // Contact form animation
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 207, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = e.clientX - this.offsetLeft - 10 + 'px';
            ripple.style.top = e.clientY - this.offsetTop - 10 + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Skills badge animation on scroll
    const skillBadges = document.querySelectorAll('.skill-badges img, .tech-badges img');
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const badges = entry.target.querySelectorAll('img');
                badges.forEach((badge, index) => {
                    setTimeout(() => {
                        badge.style.opacity = '1';
                        badge.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });

    const skillsSections = document.querySelectorAll('.skills-content, .tech-badges');
    skillsSections.forEach(section => {
        if (section) {
            // Initially hide badges
            const badges = section.querySelectorAll('img');
            badges.forEach(badge => {
                badge.style.opacity = '0';
                badge.style.transform = 'translateY(20px)';
                badge.style.transition = 'all 0.5s ease';
            });
            
            skillsObserver.observe(section);
        }
    });

    // GitHub stats reload functionality
    const statCards = document.querySelectorAll('.stat-card img');
    statCards.forEach(img => {
        img.addEventListener('error', function() {
            setTimeout(() => {
                this.src = this.src + '&t=' + Date.now();
            }, 2000);
        });
    });

    // Add loading states for images
    const images = document.querySelectorAll('img[src*="github"], img[src*="spotify"]');
    images.forEach(img => {
        const loader = document.createElement('div');
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--primary-color);
            font-size: 14px;
        `;
        loader.textContent = 'Loading...';
        
        if (img.parentNode) {
            img.parentNode.style.position = 'relative';
            img.parentNode.appendChild(loader);
            
            img.addEventListener('load', function() {
                loader.remove();
            });
        }
    });
}

// Easter eggs and fun features
function initializeEasterEggs() {
    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            // Activate easter egg
            document.body.style.animation = 'rainbow 2s linear infinite';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 5000);
            
            konamiCode = [];
        }
    });

    // Console message
    console.log(`
    🚀 Welcome to RayBen445's Enhanced Portfolio!
    
    👨‍💻 Built with HTML, CSS, and JavaScript
    🎨 Enhanced with interactive features
    ⏰ Real-time date/time display
    💭 Daily rotating quotes
    🎮 Interactive code playground
    🎵 Spotify integration
    📸 Photo gallery
    🌟 Ready for deployment on Vercel
    
    Try the Konami code: ↑↑↓↓←→←→BA
    
    Feel free to explore the code!
    GitHub: https://github.com/RayBen445
    `);
}

// Add CSS for animations
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .contact-link {
            position: relative;
            overflow: hidden;
        }

        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        /* Initially hide elements that will fade in */
        .project-card, .goal-item, .collab-item, .stat-card, .contact-section, .gallery-item, .featured-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(style);
};

// Initialize animation styles
addAnimationStyles();

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Get random color from theme palette
    getRandomThemeColor: function() {
        const colors = ['#00cfff', '#00ff99', '#ffffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};

// Export utils for potential use in other scripts
window.portfolioUtils = utils;