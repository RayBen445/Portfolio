// Shared JavaScript functions for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === 'index.html' && href === '/') ||
            (currentPage === '' && href === '/')) {
            link.classList.add('active');
        }
    });

    // Real-time date and time (for pages that have it)
    if (document.getElementById('current-date')) {
        function getOrdinal(n) {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        }

        function updateDateTime() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long' 
            };
            const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
            const month = now.toLocaleDateString('en-US', { month: 'long' });
            const day = now.getDate();
            const year = now.getFullYear();
            
            const formattedDate = `${dayName}, ${getOrdinal(day)} ${month} ${year}`;
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

        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    // Daily quote functionality (for pages that have it)
    if (document.getElementById('daily-quote-text')) {
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Innovation distinguishes between a leader and a follower. - Steve Jobs",
            "Code is like humor. When you have to explain it, it's bad. - Cory House",
            "First, solve the problem. Then, write the code. - John Johnson",
            "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
            "In order to be irreplaceable, one must always be different. - Coco Chanel",
            "Java is to JavaScript what car is to Carpet. - Chris Heilmann",
            "Knowledge is power. - Francis Bacon",
            "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code. - Dan Salomon",
            "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away. - Antoine de Saint-Exupery"
        ];

        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const quoteIndex = dayOfYear % quotes.length;
        
        document.getElementById('daily-quote-text').textContent = quotes[quoteIndex];
    }

    // Smooth scrolling for anchor links
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

    // Add scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #00cfff, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 8px 25px rgba(0, 207, 255, 0.4);
        transition: all 0.3s ease;
        font-size: 20px;
        font-weight: bold;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect for scroll-to-top button
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'scale(1.1)';
        scrollToTopBtn.style.boxShadow = '0 12px 35px rgba(0, 207, 255, 0.6)';
    });

    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'scale(1)';
        scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(0, 207, 255, 0.4)';
    });
});

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    `;

    // Set background color based on type
    const colors = {
        success: '#00ff99',
        error: '#ff4757',
        warning: '#ffa500',
        info: '#00cfff'
    };
    notification.style.background = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}