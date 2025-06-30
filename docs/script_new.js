// iOS-Inspired Portfolio JavaScript with Alpine.js

// Main Portfolio App
function portfolioApp() {
    return {
        // State Management
        darkMode: false,
        mobileMenuOpen: false,
        contactModalOpen: false,
        
        // Contact Form
        contactForm: {
            name: '',
            email: '',
            message: '',
            sending: false
        },
        
        // Initialize
        init() {
            // Check for saved dark mode preference
            this.darkMode = localStorage.getItem('darkMode') === 'true' || 
                           (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
            
            // Apply dark mode
            this.applyDarkMode();
            
            // Smooth scrolling for navigation links
            this.initSmoothScrolling();
            
            // Initialize intersection observer for animations
            this.initScrollAnimations();
        },
        
        // Dark Mode Toggle
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            this.applyDarkMode();
            localStorage.setItem('darkMode', this.darkMode);
        },
        
        applyDarkMode() {
            if (this.darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        
        // Contact Modal
        openContactModal() {
            this.contactModalOpen = true;
            document.body.style.overflow = 'hidden';
        },
        
        closeContactModal() {
            this.contactModalOpen = false;
            document.body.style.overflow = 'auto';
            this.resetContactForm();
        },
        
        resetContactForm() {
            this.contactForm = {
                name: '',
                email: '',
                message: '',
                sending: false
            };
        },
        
        // Contact Form Submission
        async submitContactForm() {
            if (this.contactForm.sending) return;
            
            // Basic validation
            if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
                this.showNotification('Please fill in all fields', 'error');
                return;
            }
            
            this.contactForm.sending = true;
            
            try {
                // Simulate API call - replace with actual endpoint
                await this.sendEmail({
                    name: this.contactForm.name,
                    email: this.contactForm.email,
                    message: this.contactForm.message
                });
                
                this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.closeContactModal();
            } catch (error) {
                console.error('Error sending message:', error);
                this.showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                this.contactForm.sending = false;
            }
        },
        
        // Email sending function
        async sendEmail(formData) {
            // Try to use the existing PHP endpoint first
            try {
                const response = await fetch('send_email.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                if (!response.ok) throw new Error('Server error');
                
                return await response.json();
            } catch (error) {
                // Fallback to mailto link
                const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
                const body = encodeURIComponent(
                    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
                );
                window.open(`mailto:gatdulajastine@gmail.com?subject=${subject}&body=${body}`);
                
                // Simulate successful send for UI feedback
                return Promise.resolve({ success: true });
            }
        },
        
        // Smooth Scrolling
        initSmoothScrolling() {
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[href^="#"]');
                if (!link) return;
                
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.glass-nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    this.mobileMenuOpen = false;
                }
            });
        },
        
        // Scroll Animations
        initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Observe elements that should animate on scroll
            document.querySelectorAll('.glass-panel').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                observer.observe(el);
            });
        },
        
        // Notification System
        showNotification(message, type = 'info') {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-xl glass-panel transform translate-x-full transition-transform duration-300 ${
                type === 'success' ? 'bg-green-500 text-white' : 
                type === 'error' ? 'bg-red-500 text-white' : 
                'bg-blue-500 text-white'
            }`;
            notification.innerHTML = `
                <div class="flex items-center space-x-3">
                    <i class="fas ${
                        type === 'success' ? 'fa-check-circle' : 
                        type === 'error' ? 'fa-exclamation-circle' : 
                        'fa-info-circle'
                    }"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Auto remove
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 5000);
        }
    };
}

// GitHub Stats Component
function githubStats() {
    const username = 'jastinegatdula'; // Update with correct username if needed
    
    return {
        stats: {
            public_repos: 0,
            followers: 0,
            following: 0
        },
        totalStars: 0,
        
        async init() {
            try {
                await this.fetchGitHubStats();
            } catch (error) {
                console.error('Error fetching GitHub stats:', error);
                // Set placeholder values
                this.stats = {
                    public_repos: '5+',
                    followers: '10+',
                    following: '15+'
                };
                this.totalStars = '25+';
            }
        },
        
        async fetchGitHubStats() {
            try {
                // Fetch user stats
                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                if (!userResponse.ok) throw new Error('User not found');
                
                const userData = await userResponse.json();
                this.stats = {
                    public_repos: userData.public_repos,
                    followers: userData.followers,
                    following: userData.following
                };
                
                // Fetch repositories to calculate total stars
                const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                if (reposResponse.ok) {
                    const repos = await reposResponse.json();
                    this.totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
                }
                
            } catch (error) {
                throw error;
            }
        }
    };
}

// GitHub Repositories Component
function githubRepos() {
    const username = 'jastinegatdula'; // Update with correct username if needed
    
    return {
        repos: [],
        loading: true,
        
        async init() {
            try {
                await this.fetchRepositories();
            } catch (error) {
                console.error('Error fetching repositories:', error);
                // Set placeholder repositories
                this.repos = [
                    {
                        id: 1,
                        name: 'portfolio-website',
                        description: 'Personal portfolio website built with modern web technologies',
                        html_url: 'https://github.com/jastinegatdula',
                        language: 'JavaScript',
                        stargazers_count: 5,
                        updated_at: new Date().toISOString()
                    },
                    {
                        id: 2,
                        name: 'student-management-system',
                        description: 'Java-based student management system for educational institutions',
                        html_url: 'https://github.com/jastinegatdula',
                        language: 'Java',
                        stargazers_count: 3,
                        updated_at: new Date().toISOString()
                    },
                    {
                        id: 3,
                        name: 'python-automation-scripts',
                        description: 'Collection of Python scripts for task automation and data processing',
                        html_url: 'https://github.com/jastinegatdula',
                        language: 'Python',
                        stargazers_count: 8,
                        updated_at: new Date().toISOString()
                    }
                ];
            } finally {
                this.loading = false;
            }
        },
        
        async fetchRepositories() {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
                if (!response.ok) throw new Error('Repositories not found');
                
                const repos = await response.json();
                this.repos = repos.filter(repo => !repo.fork); // Filter out forked repos
                
            } catch (error) {
                throw error;
            }
        },
        
        formatDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) return '1 day ago';
            if (diffDays < 30) return `${diffDays} days ago`;
            if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
            return `${Math.floor(diffDays / 365)} years ago`;
        }
    };
}

// Utility Functions
const utils = {
    // Debounce function for performance
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format numbers with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to GitHub cards
    const githubCards = document.querySelectorAll('.github-card');
    githubCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add parallax effect to floating shapes
    const shapes = document.querySelectorAll('.shape');
    window.addEventListener('scroll', utils.throttle(() => {
        const scrolled = window.pageYOffset;
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }, 10));
    
    // Add hover effect to skill sliders
    const skillSliders = document.querySelectorAll('.ios-slider');
    skillSliders.forEach(slider => {
        slider.addEventListener('mouseenter', () => {
            const fill = slider.querySelector('.slider-fill');
            fill.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.5)';
        });
        
        slider.addEventListener('mouseleave', () => {
            const fill = slider.querySelector('.slider-fill');
            fill.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
        });
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Close modal on Escape key
        if (e.key === 'Escape') {
            const app = Alpine.raw(document.querySelector('[x-data="portfolioApp()"]').__x.$data);
            if (app.contactModalOpen) {
                app.closeContactModal();
            }
            if (app.mobileMenuOpen) {
                app.mobileMenuOpen = false;
            }
        }
    });
    
    console.log('🚀 Portfolio initialized successfully!');
});
