// Portfolio JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeMobileMenu();
    initializeScrollProgress();
    initializeTypingEffect();
    initializeGitHubStats();
    
    // Initialize particles with a small delay to ensure everything is loaded
    setTimeout(initializeParticles, 500);
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation item on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });
}

// Animation functionality
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Add staggered animation delay to skill cards
    const skillCards = document.querySelectorAll('#skills .fade-in');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation delay to project cards
    const projectCards = document.querySelectorAll('#projects .fade-in');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Utility function for email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set notification style based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Scroll progress indicator
function initializeScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const scrolled = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    });
}

// Typing effect for hero section
function initializeTypingEffect() {
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        const text = 'Jastine Maderable Gatdula';
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Smooth reveal animations for cards
function animateCards() {
    const cards = document.querySelectorAll('.hover-lift');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize card animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateCards);

// Skills animation
function animateSkills() {
    const skillCards = document.querySelectorAll('#skills .bg-white');
    
    skillCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle bounce effect
            this.style.animation = 'bounce 0.6s ease-in-out';
        });
        
        card.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
}

// Add bounce keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
        }
        40%, 43% {
            transform: translate3d(0,-8px,0);
        }
        70% {
            transform: translate3d(0,-4px,0);
        }
        90% {
            transform: translate3d(0,-2px,0);
        }
    }
`;
document.head.appendChild(style);

// Initialize skills animation
document.addEventListener('DOMContentLoaded', animateSkills);

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based animations or calculations
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Enable keyboard navigation for mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// GitHub Statistics Integration
function initializeGitHubStats() {
    const githubUsername = 'jasgie'; // Replace with actual GitHub username
    
    // Fetch GitHub user data
    fetchGitHubUserStats(githubUsername);
}

// Fetch GitHub user statistics
async function fetchGitHubUserStats(username) {
    try {
        // GitHub API endpoint for user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        
        if (!userResponse.ok) {
            throw new Error('GitHub API request failed');
        }
        
        const userData = await userResponse.json();
        
        // Fetch repositories data
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();
        
        // Calculate total stars across all repositories
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        // Update the DOM with real data
        updateGitHubStatsDisplay({
            publicRepos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            totalStars: totalStars
        });
        
    } catch (error) {
        console.log('GitHub stats loading...', error);
        // Show placeholder data if API fails
        updateGitHubStatsDisplay({
            publicRepos: '10+',
            followers: '25+',
            following: '50+',
            totalStars: '15+'
        });
    }
}

// Update GitHub stats in the DOM
function updateGitHubStatsDisplay(stats) {
    const repoCountElement = document.getElementById('repo-count');
    const followersCountElement = document.getElementById('followers-count');
    const followingCountElement = document.getElementById('following-count');
    const starsCountElement = document.getElementById('stars-count');
    
    if (repoCountElement) {
        animateNumber(repoCountElement, stats.publicRepos);
    }
    if (followersCountElement) {
        animateNumber(followersCountElement, stats.followers);
    }
    if (followingCountElement) {
        animateNumber(followingCountElement, stats.following);
    }
    if (starsCountElement) {
        animateNumber(starsCountElement, stats.totalStars);
    }
}

// Animate number counting up
function animateNumber(element, finalValue) {
    const startValue = 0;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    // Handle string values (like "10+")
    if (typeof finalValue === 'string') {
        element.textContent = finalValue;
        return;
    }
    
    function updateNumber() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (finalValue - startValue) * easeOutCubic);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = finalValue;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// GitHub repository showcase (optional enhancement)
async function fetchFeaturedRepos(username, count = 3) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${count}`);
        const repos = await response.json();
        
        return repos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            url: repo.html_url,
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updated: new Date(repo.updated_at).toLocaleDateString()
        }));
    } catch (error) {
        console.log('Featured repos loading...', error);
        return [];
    }
}

// Enhanced GitHub profile link tracking
function trackGitHubProfileClick() {
    // Add analytics tracking if needed
    console.log('GitHub profile visited');
}

// Add click tracking to GitHub profile link
document.addEventListener('DOMContentLoaded', function() {
    const githubProfileLink = document.querySelector('a[href*="github.com/jasgie"]');
    if (githubProfileLink) {
        githubProfileLink.addEventListener('click', trackGitHubProfileClick);
    }
});

// Refresh GitHub stats periodically (optional)
function startGitHubStatsRefresh() {
    // Refresh every 5 minutes
    setInterval(() => {
        initializeGitHubStats();
    }, 5 * 60 * 1000);
}

// Error handling for GitHub API rate limiting
function handleGitHubAPIError(error) {
    console.log('GitHub API Error:', error);
    
    // Show user-friendly message
    const errorElements = document.querySelectorAll('[id$="-count"]');
    errorElements.forEach(element => {
        if (element.textContent === '-') {
            element.textContent = '🔄';
            element.title = 'Loading GitHub stats...';
        }
    });
}

// Certificate toggle functionality
function toggleCertificates() {
    const additionalCerts = document.getElementById('additional-certificates');
    const buttonText = document.getElementById('cert-button-text');
    const arrowDown = document.getElementById('cert-arrow-down');
    const arrowUp = document.getElementById('cert-arrow-up');
    const certCount = document.getElementById('cert-count');
    
    if (additionalCerts.classList.contains('hidden')) {
        // Show additional certificates
        additionalCerts.classList.remove('hidden');
        buttonText.textContent = 'Show Less';
        arrowDown.classList.add('hidden');
        arrowUp.classList.remove('hidden');
        certCount.textContent = 'Showing all 11 professional certifications';
        
        // Smooth scroll animation
        additionalCerts.style.opacity = '0';
        additionalCerts.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            additionalCerts.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            additionalCerts.style.opacity = '1';
            additionalCerts.style.transform = 'translateY(0)';
        }, 10);
    } else {
        // Hide additional certificates
        additionalCerts.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        additionalCerts.style.opacity = '0';
        additionalCerts.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            additionalCerts.classList.add('hidden');
            buttonText.textContent = 'Show All Certificates';
            arrowDown.classList.remove('hidden');
            arrowUp.classList.add('hidden');
            certCount.textContent = 'Showing 6 of 11 professional certifications';
            
            // Reset styles
            additionalCerts.style.opacity = '';
            additionalCerts.style.transform = '';
            additionalCerts.style.transition = '';
        }, 300);
    }
}

// Private Projects toggle functionality
function togglePrivateProjects() {
    const additionalProjects = document.getElementById('additional-private-projects');
    const buttonText = document.getElementById('private-button-text');
    const arrowDown = document.getElementById('private-arrow-down');
    const arrowUp = document.getElementById('private-arrow-up');
    const projectCount = document.getElementById('private-count');
    
    if (additionalProjects.classList.contains('hidden')) {
        // Show additional private projects
        additionalProjects.classList.remove('hidden');
        buttonText.textContent = 'Show Less';
        arrowDown.classList.add('hidden');
        arrowUp.classList.remove('hidden');
        projectCount.textContent = 'Showing all 10 private development projects';
        
        // Smooth scroll animation
        additionalProjects.style.opacity = '0';
        additionalProjects.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            additionalProjects.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            additionalProjects.style.opacity = '1';
            additionalProjects.style.transform = 'translateY(0)';
        }, 10);
    } else {
        // Hide additional private projects
        additionalProjects.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        additionalProjects.style.opacity = '0';
        additionalProjects.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            additionalProjects.classList.add('hidden');
            buttonText.textContent = 'Show All Private Projects';
            arrowDown.classList.remove('hidden');
            arrowUp.classList.add('hidden');
            projectCount.textContent = 'Showing 3 of 10 private development projects';
            
            // Reset styles
            additionalProjects.style.opacity = '';
            additionalProjects.style.transform = '';
            additionalProjects.style.transition = '';
        }, 400);
    }
}

// Particles.js Configuration
function initializeParticles() {
    console.log('Initializing particles...');
    
    // Check if particles.js is loaded
    if (typeof particlesJS === 'undefined') {
        console.error('particles.js library not loaded');
        return;
    }
    
    // Check if container exists
    const container = document.getElementById('particles-js');
    if (!container) {
        console.error('particles-js container not found');
        return;
    }
    
    console.log('particles.js container found, initializing...');
    
    // Add a temporary visual indicator
    container.style.border = '2px solid red';
    setTimeout(() => {
        container.style.border = 'none';
    }, 3000);

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#3B82F6'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#3B82F6',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    }, function() {
        console.log('Particles.js initialized successfully!');
    });
}

// Initialize everything when the page is fully loaded
window.addEventListener('load', function() {
    initializeLazyLoading();
    
    // Hide loading spinner if present
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
    
    // Initialize GitHub stats with a delay
    setTimeout(initializeGitHubStats, 1000);
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder if image fails to load
            if (!this.src.includes('placeholder')) {
                this.src = 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Image+Not+Found';
            }
        });
    });
});
