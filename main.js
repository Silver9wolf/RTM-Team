// Site initialization and language settings
document.addEventListener('DOMContentLoaded', function() {
    // Check saved language or use English as default
    const savedLang = localStorage.getItem('ftc-team-lang') || 'en';
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update language buttons
    updateLanguageButtons(savedLang);
    
    // Initialize all components
    initNavbar();
    initBackToTop();
    initSmoothScroll();
    initFormSubmission();
    initAnimations();
    initGalleryHover();
    lazyLoadImages();
    
    console.log('FTC Team website ready! Team #32670');
});

// Initialize mobile navigation
function initNavbar() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const langToggleMobile = document.getElementById('language-toggle-mobile');
    const langToggleDesktop = document.getElementById('language-toggle');
    
    // Manage navigation menu
    if (navToggle && navMenu) {
        let isMenuOpen = false;
        
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isMenuOpen);
            
            // Toggle icon
            const icon = navToggle.querySelector('i');
            if (isMenuOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                    isMenuOpen = false;
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
                isMenuOpen = false;
            }
        });
    }
    
    // Manage mobile language button
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', (e) => {
            e.stopPropagation();
            // Switch to Arabic version
            window.location.href = 'ar/index.html';
            localStorage.setItem('ftc-team-lang', 'ar');
        });
    }
    
    // Manage desktop language button
    if (langToggleDesktop) {
        langToggleDesktop.addEventListener('click', () => {
            window.location.href = 'ar/index.html';
            localStorage.setItem('ftc-team-lang', 'ar');
        });
    }
    
    // Add scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        }
    });
}

// Update language buttons
function updateLanguageButtons(lang) {
    const langTexts = document.querySelectorAll('.lang-text');
    if (langTexts.length > 0) {
        langTexts.forEach(text => {
            text.textContent = lang === 'ar' ? 'EN' : 'AR';
        });
    }
}

// Initialize back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize smooth scrolling
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize form submission
function initFormSubmission() {
    const contactForm = document.getElementById('message-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validate data
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showFormMessage('Please fill in all required fields', 'error');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show success message
            showFormMessage('Thank you for your message! We will contact you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            document.getElementById('subject').selectedIndex = 0;
            
            console.log('Form submitted successfully:', formData);
        });
    }
}

// Show form message
function showFormMessage(message, type) {
    // Remove previous messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #f44336, #d32f2f)'};
        color: white;
        padding: 1.2rem;
        border-radius: 8px;
        margin-top: 1.5rem;
        text-align: center;
        font-weight: 500;
        animation: fadeIn 0.5s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;
    
    // Add message to form
    const contactForm = document.getElementById('message-form');
    if (contactForm) {
        contactForm.appendChild(messageDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.opacity = '0';
                messageDiv.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 500);
            }
        }, 5000);
    }
}

// Initialize scroll animations
function initAnimations() {
    // Create Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.value-card, .skill-item, .team-card, .gallery-item, .sponsor-logo');
    
    sections.forEach(section => observer.observe(section));
    cards.forEach(card => observer.observe(card));
    
    // Activate progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        setTimeout(() => {
            progressFill.style.width = '65%';
        }, 1000);
    }
}

// Initialize gallery hover effects
function initGalleryHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Hover effect
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px)';
            item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
        
        // Click effect
        item.addEventListener('click', function() {
            const caption = this.querySelector('.gallery-caption').textContent;
            console.log(`Clicked on image: ${caption}`);
            
            // Click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// Load images smoothly
function lazyLoadImages() {
    const images = document.querySelectorAll('.member-real-image, .team-real-image');
    
    images.forEach(img => {
        // If image already loaded
        if (img.complete) {
            img.style.opacity = '1';
            img.style.animation = 'fadeInImage 0.8s ease forwards';
        } else {
            // Add effect when image loads
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                this.style.animation = 'fadeInImage 0.8s ease forwards';
            });
            
            // If image fails to load
            img.addEventListener('error', function() {
                if (this.classList.contains('member-real-image')) {
                    this.src = 'pic/logo.jpg';
                    console.log('Image replaced with team logo');
                }
                this.style.opacity = '1';
                this.style.animation = 'fadeInImage 0.8s ease forwards';
            });
        }
    });
    
    // Robot image placeholder
    const robotPlaceholder = document.getElementById('robot-placeholder');
    if (robotPlaceholder) {
        robotPlaceholder.addEventListener('click', function() {
            console.log('Robot image will be added soon!');
            
            // Click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }
}

// Manage robot image
function initRobotImage() {
    const robotImage = document.querySelector('.robot-real-image');
    const robotPlaceholder = document.getElementById('robot-placeholder');
    
    if (robotImage && robotPlaceholder) {
        // Check if image loaded
        if (robotImage.complete) {
            // If image already loaded
            if (robotImage.naturalHeight !== 0) {
                // Image exists and loaded
                robotPlaceholder.classList.add('hidden');
            } else {
                // Image failed to load
                robotPlaceholder.classList.remove('hidden');
                console.log('Error loading robot image');
            }
        }
    }
}

// Hide placeholder when image loads
function hideRobotPlaceholder() {
    const robotPlaceholder = document.getElementById('robot-placeholder');
    if (robotPlaceholder) {
        robotPlaceholder.classList.add('hidden');
        console.log('Robot image loaded successfully');
    }
}

// Handle robot image error
function handleRobotImageError() {
    const robotPlaceholder = document.getElementById('robot-placeholder');
    const robotImage = document.querySelector('.robot-real-image');
    
    if (robotPlaceholder) {
        robotPlaceholder.classList.remove('hidden');
        robotPlaceholder.innerHTML = `
            <div class="robot-placeholder-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Failed to load robot image</span>
                <p class="placeholder-note">Image will be updated soon</p>
            </div>
        `;
    }
    
    if (robotImage) {
        // Try to use alternative image
        robotImage.src = 'pic/team-logo.jpg'; // Alternative image
        console.log('Tried to use alternative robot image');
    }
}

// Initialize robot image on page load
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize robot image
    setTimeout(() => {
        initRobotImage();
    }, 1000); // After 1 second to ensure page loaded
});

// Add interactive features
function addInteractiveFeatures() {
    // Team cards interaction
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        // Click effect
        card.addEventListener('click', function() {
            const memberName = this.querySelector('.member-name').textContent;
            const memberRole = this.querySelector('.member-role').textContent;
            
            console.log(`Clicked on: ${memberName} - ${memberRole}`);
            
            // Click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Keyboard support
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Focus effect
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-purple)';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Button effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
    
    // Card effects
    const valueCards = document.querySelectorAll('.value-card, .skill-item');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Add CSS animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInImage {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    /* Card effects */
    .team-card, .value-card, .skill-item {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .team-card.animate-in, 
    .value-card.animate-in, 
    .skill-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .gallery-item {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .gallery-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Animation timings */
    .team-card:nth-child(1) { animation-delay: 0.1s; }
    .team-card:nth-child(2) { animation-delay: 0.2s; }
    .team-card:nth-child(3) { animation-delay: 0.3s; }
    .team-card:nth-child(4) { animation-delay: 0.4s; }
    .team-card:nth-child(5) { animation-delay: 0.5s; }
    .team-card:nth-child(6) { animation-delay: 0.6s; }
    .team-card:nth-child(7) { animation-delay: 0.7s; }
    .team-card:nth-child(8) { animation-delay: 0.8s; }
</style>
`);

// Initialize page
window.addEventListener('load', function() {
    // Add interactive features
    addInteractiveFeatures();
    
    // Page load effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize gallery
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryImages = document.querySelectorAll('.gallery-real-image');
    
    // Hover effect on items
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('zoomed')) {
                item.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Image loading effects
    galleryImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.animation = 'fadeInImage 0.8s ease forwards';
        });
        
        img.addEventListener('error', function() {
            console.log(`Error loading image: ${this.alt}`);
            // Icon will appear automatically due to CSS
        });
    });
}

// Update DOM initialization
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize gallery
    initGallery();
});