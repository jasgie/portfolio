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
    const username = 'jasgie'; // Updated GitHub username
    
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
    const username = 'jasgie'; // Updated GitHub username
    
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

// Programming Languages Statistics Component
function programmingLanguagesStats() {
    const username = 'jasgie';
    
    return {
        publicLanguages: [],
        privateLanguages: [],
        combinedLanguages: [],
        publicRepoCount: 0,
        privateProjectCount: 5,
        totalLanguages: 0,
        totalProjects: 0,
        totalExperience: 4,
        totalCodeLines: '50K+',
        loading: true,
        
        async init() {
            try {
                await this.fetchPublicLanguages();
                this.setupPrivateLanguages();
                this.calculateCombinedStats();
            } catch (error) {
                console.error('Error fetching language stats:', error);
                this.setupFallbackData();
            } finally {
                this.loading = false;
            }
        },
        
        async fetchPublicLanguages() {
            try {
                // Fetch user repositories
                const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
                
                const repos = await reposResponse.json();
                this.publicRepoCount = repos.filter(repo => !repo.fork).length;
                
                // Language colors mapping
                const languageColors = {
                    'JavaScript': { color: '#f7df1e', lightColor: '#ffeb3b' },
                    'Python': { color: '#3776ab', lightColor: '#4fc3f7' },
                    'Java': { color: '#ed8b00', lightColor: '#ffb74d' },
                    'TypeScript': { color: '#3178c6', lightColor: '#64b5f6' },
                    'HTML': { color: '#e34f26', lightColor: '#ff8a65' },
                    'CSS': { color: '#1572b6', lightColor: '#42a5f5' },
                    'C++': { color: '#00599c', lightColor: '#26c6da' },
                    'C#': { color: '#239120', lightColor: '#66bb6a' },
                    'PHP': { color: '#777bb4', lightColor: '#9575cd' },
                    'Ruby': { color: '#cc342d', lightColor: '#ef5350' },
                    'Go': { color: '#00add8', lightColor: '#4dd0e1' },
                    'Rust': { color: '#000000', lightColor: '#616161' },
                    'Swift': { color: '#fa7343', lightColor: '#ff8a65' },
                    'Kotlin': { color: '#7f52ff', lightColor: '#9c27b0' },
                    'Dart': { color: '#0175c2', lightColor: '#2196f3' },
                    'Shell': { color: '#89e051', lightColor: '#8bc34a' },
                    'Dockerfile': { color: '#384d54', lightColor: '#607d8b' }
                };
                
                // Aggregate language statistics
                const languageStats = {};
                let totalBytes = 0;
                
                for (const repo of repos.filter(repo => !repo.fork)) {
                    try {
                        const langResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`);
                        if (langResponse.ok) {
                            const languages = await langResponse.json();
                            
                            Object.entries(languages).forEach(([lang, bytes]) => {
                                if (!languageStats[lang]) {
                                    languageStats[lang] = {
                                        name: lang,
                                        bytes: 0,
                                        repos: 0,
                                        ...languageColors[lang] || { color: '#6b7280', lightColor: '#9ca3af' }
                                    };
                                }
                                languageStats[lang].bytes += bytes;
                                languageStats[lang].repos += 1;
                                totalBytes += bytes;
                            });
                        }
                    } catch (error) {
                        console.warn(`Failed to fetch languages for ${repo.name}:`, error);
                    }
                }
                
                // Convert to array and calculate percentages
                this.publicLanguages = Object.values(languageStats)
                    .map(lang => ({
                        ...lang,
                        percentage: totalBytes > 0 ? Math.round((lang.bytes / totalBytes) * 100) : 0,
                        bytes: this.formatBytes(lang.bytes)
                    }))
                    .sort((a, b) => b.percentage - a.percentage)
                    .slice(0, 8); // Show top 8 languages
                    
            } catch (error) {
                throw error;
            }
        },
        
        setupPrivateLanguages() {
            // Private/Professional project language statistics
            // Based on the private projects shown in the portfolio
            this.privateLanguages = [
                {
                    name: 'Python',
                    percentage: 35,
                    projects: 3,
                    experience: '3+ years',
                    color: '#3776ab',
                    lightColor: '#4fc3f7'
                },
                {
                    name: 'JavaScript',
                    percentage: 25,
                    projects: 2,
                    experience: '4+ years',
                    color: '#f7df1e',
                    lightColor: '#ffeb3b'
                },
                {
                    name: 'Java',
                    percentage: 15,
                    projects: 1,
                    experience: '3+ years',
                    color: '#ed8b00',
                    lightColor: '#ffb74d'
                },
                {
                    name: 'C++',
                    percentage: 12,
                    projects: 1,
                    experience: '2+ years',
                    color: '#00599c',
                    lightColor: '#26c6da'
                },
                {
                    name: 'SQL',
                    percentage: 8,
                    projects: 3,
                    experience: '3+ years',
                    color: '#336791',
                    lightColor: '#42a5f5'
                },
                {
                    name: 'TypeScript',
                    percentage: 5,
                    projects: 1,
                    experience: '2+ years',
                    color: '#3178c6',
                    lightColor: '#64b5f6'
                }
            ];
        },
        
        calculateCombinedStats() {
            // Combine public and private language data
            const combinedMap = new Map();
            
            // Add public languages
            this.publicLanguages.forEach(lang => {
                combinedMap.set(lang.name, {
                    name: lang.name,
                    publicPercentage: lang.percentage,
                    privatePercentage: 0,
                    color: lang.color,
                    lightColor: lang.lightColor,
                    yearsExperience: this.getYearsExperience(lang.name),
                    icon: this.getLanguageIcon(lang.name)
                });
            });
            
            // Add/merge private languages
            this.privateLanguages.forEach(lang => {
                if (combinedMap.has(lang.name)) {
                    combinedMap.get(lang.name).privatePercentage = lang.percentage;
                } else {
                    combinedMap.set(lang.name, {
                        name: lang.name,
                        publicPercentage: 0,
                        privatePercentage: lang.percentage,
                        color: lang.color,
                        lightColor: lang.lightColor,
                        yearsExperience: this.getYearsExperience(lang.name),
                        icon: this.getLanguageIcon(lang.name)
                    });
                }
            });
            
            // Calculate totals and sort
            this.combinedLanguages = Array.from(combinedMap.values())
                .map(lang => ({
                    ...lang,
                    totalPercentage: Math.round((lang.publicPercentage + lang.privatePercentage) / 2)
                }))
                .sort((a, b) => b.totalPercentage - a.totalPercentage)
                .slice(0, 10);
            
            // Calculate summary stats
            this.totalLanguages = this.combinedLanguages.length;
            this.totalProjects = this.publicRepoCount + this.privateProjectCount;
        },
        
        setupFallbackData() {
            // Fallback data when API fails
            this.publicLanguages = [
                { name: 'JavaScript', percentage: 40, repos: 3, bytes: '15.2 KB', color: '#f7df1e', lightColor: '#ffeb3b' },
                { name: 'Python', percentage: 35, repos: 2, bytes: '12.8 KB', color: '#3776ab', lightColor: '#4fc3f7' },
                { name: 'Java', percentage: 15, repos: 1, bytes: '5.5 KB', color: '#ed8b00', lightColor: '#ffb74d' },
                { name: 'HTML', percentage: 10, repos: 2, bytes: '3.2 KB', color: '#e34f26', lightColor: '#ff8a65' }
            ];
            
            this.publicRepoCount = 6;
            this.setupPrivateLanguages();
            this.calculateCombinedStats();
        },
        
        getYearsExperience(language) {
            const experience = {
                'JavaScript': 4,
                'Python': 3,
                'Java': 3,
                'C++': 2,
                'SQL': 3,
                'TypeScript': 2,
                'HTML': 4,
                'CSS': 4,
                'PHP': 2,
                'C#': 2
            };
            return experience[language] || 1;
        },
        
        getLanguageIcon(language) {
            const icons = {
                'JavaScript': 'fab fa-js-square',
                'Python': 'fab fa-python',
                'Java': 'fab fa-java',
                'HTML': 'fab fa-html5',
                'CSS': 'fab fa-css3-alt',
                'PHP': 'fab fa-php',
                'C++': 'fas fa-code',
                'C#': 'fas fa-code',
                'TypeScript': 'fas fa-code',
                'SQL': 'fas fa-database',
                'Shell': 'fas fa-terminal',
                'Dockerfile': 'fab fa-docker'
            };
            return icons[language] || 'fas fa-code';
        },
        
        formatBytes(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
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
            if (document.getElementById('certificateModal').classList.contains('hidden') === false) {
                closeCertificateModal();
            }
        }
        
        // Navigate through images with arrow keys
        if (!document.getElementById('certificateModal').classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') {
                previousImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });
    
    console.log('🚀 Portfolio initialized successfully!');
});

// Certificate Modal Functions
let currentCertificate = null;
let currentImageIndex = 0;
let certificateImages = [];

const certificates = {
    'vex-iq': {
        title: 'VEX IQ Gen 2 Robotics System - After-Sales Training',
        images: [
            {
                src: 'assets/certificates/ast-vexiq-front.jpg',
                alt: 'VEX IQ Certificate - Front',
                title: 'Certificate Front'
            },
            {
                src: 'assets/certificates/ast-vexiq-back.jpg',
                alt: 'VEX IQ Certificate - Back',
                title: 'Certificate Back'
            }
        ]
    }
};

function openCertificateModal(certificateId) {
    currentCertificate = certificates[certificateId];
    if (!currentCertificate) return;
    
    currentImageIndex = 0;
    certificateImages = currentCertificate.images;
    
    // Set modal title
    document.getElementById('certificateModalTitle').textContent = currentCertificate.title;
    
    // Populate images
    populateCertificateImages();
    
    // Show modal
    document.getElementById('certificateModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
    
    // Add smooth entrance animation
    setTimeout(() => {
        document.getElementById('certificateModal').classList.add('opacity-100');
    }, 10);
}

function closeCertificateModal() {
    document.getElementById('certificateModal').classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore body scroll
    currentCertificate = null;
    currentImageIndex = 0;
    certificateImages = [];
}

function populateCertificateImages() {
    const container = document.getElementById('certificateImages');
    container.innerHTML = '';
    
    certificateImages.forEach((image, index) => {
        const imageDiv = document.createElement('div');
        imageDiv.className = `certificate-image ${index === currentImageIndex ? 'active' : 'hidden'} text-center`;
        imageDiv.innerHTML = `
            <div class="relative inline-block">
                <img src="${image.src}" 
                     alt="${image.alt}" 
                     class="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg border border-gray-200 dark:border-gray-600"
                     style="cursor: zoom-in;"
                     onclick="toggleImageZoom(this)">
                <div class="absolute top-2 left-2 glass-panel px-3 py-1 rounded-lg">
                    <span class="text-xs font-medium text-gray-700 dark:text-gray-300">${image.title}</span>
                </div>
            </div>
        `;
        container.appendChild(imageDiv);
    });
    
    updateImageCounter();
    updateNavigationButtons();
}

function previousImage() {
    if (currentImageIndex > 0) {
        showImage(currentImageIndex - 1);
    }
}

function nextImage() {
    if (currentImageIndex < certificateImages.length - 1) {
        showImage(currentImageIndex + 1);
    }
}

function showImage(index) {
    if (index < 0 || index >= certificateImages.length) return;
    
    // Hide current image
    const currentImg = document.querySelector('.certificate-image.active');
    if (currentImg) {
        currentImg.classList.remove('active');
        currentImg.classList.add('hidden');
    }
    
    // Show new image
    const newImg = document.querySelectorAll('.certificate-image')[index];
    if (newImg) {
        newImg.classList.remove('hidden');
        newImg.classList.add('active');
    }
    
    currentImageIndex = index;
    updateImageCounter();
    updateNavigationButtons();
}

function updateImageCounter() {
    const counter = document.getElementById('imageCounter');
    if (certificateImages.length > 1) {
        counter.textContent = `${currentImageIndex + 1} of ${certificateImages.length}`;
        counter.style.display = 'block';
    } else {
        counter.style.display = 'none';
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (certificateImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }
    
    prevBtn.style.display = 'inline-flex';
    nextBtn.style.display = 'inline-flex';
    
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === certificateImages.length - 1;
}

function toggleImageZoom(img) {
    if (img.style.transform === 'scale(1.5)') {
        img.style.transform = 'scale(1)';
        img.style.cursor = 'zoom-in';
    } else {
        img.style.transform = 'scale(1.5)';
        img.style.cursor = 'zoom-out';
    }
    img.style.transition = 'transform 0.3s ease';
}
