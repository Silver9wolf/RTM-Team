// تهيئة الموقع وإعدادات اللغة
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من اللغة المحفوظة أو استخدام العربية كافتراضية
    const savedLang = localStorage.getItem('ftc-team-lang') || 'EN';
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث أزرار اللغة
    updateLanguageButtons(savedLang);
    
    // إعداد جميع المكونات
    initNavbar();
    initBackToTop();
    initSmoothScroll();
    initFormSubmission();
    initAnimations();
    initGalleryHover();
    lazyLoadImages();
    
    console.log('موقع فريق FTC جاهز للعمل! فريق #32670');
});

// تهيئة شريط التنقل للموبايل
function initNavbar() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const langToggleMobile = document.getElementById('language-toggle-mobile');
    const langToggleDesktop = document.getElementById('language-toggle');
    
    // إدارة قائمة التنقل
    if (navToggle && navMenu) {
        let isMenuOpen = false;
        
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isMenuOpen);
            
            // تبديل الأيقونة
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
        
        // إغلاق القائمة عند النقر على رابط
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
        
        // إغلاق القائمة عند النقر خارجها
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
    
    // إدارة زر اللغة على الجوال
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', (e) => {
            e.stopPropagation();
            // الانتقال إلى النسخة الإنجليزية
            window.location.href = '../index.html';
            localStorage.setItem('ftc-team-lang', 'en');
        });
    }
    
    // إدارة زر اللغة على الديسكتوب
    if (langToggleDesktop) {
        langToggleDesktop.addEventListener('click', () => {
            window.location.href = '../index.html';
            localStorage.setItem('ftc-team-lang', 'en');
        });
    }
    
    // إضافة تأثير عند التمرير
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
    
    // إغلاق القائمة عند تغيير حجم النافذة
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

// تحديث أزرار اللغة
function updateLanguageButtons(lang) {
    const langTexts = document.querySelectorAll('.lang-text');
    if (langTexts.length > 0) {
        langTexts.forEach(text => {
            text.textContent = lang === 'ar' ? 'EN' : 'AR';
        });
    }
}

// تهيئة زر الرجوع للأعلى
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

// تهيئة التمرير السلس
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

// تهيئة إرسال النموذج
function initFormSubmission() {
    const contactForm = document.getElementById('message-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع البيانات من النموذج
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // التحقق من صحة البيانات
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showFormMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // التحقق من صحة البريد الإلكتروني
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // عرض رسالة نجاح
            showFormMessage('شكراً على رسالتك! سنتواصل معك قريباً.', 'success');
            
            // إعادة تعيين النموذج
            contactForm.reset();
            document.getElementById('subject').selectedIndex = 0;
            
            console.log('تم إرسال النموذج بنجاح:', formData);
        });
    }
}

// عرض رسالة في النموذج
function showFormMessage(message, type) {
    // إزالة الرسائل السابقة
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // إنشاء عنصر الرسالة
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
    
    // إضافة الرسالة إلى النموذج
    const contactForm = document.getElementById('message-form');
    if (contactForm) {
        contactForm.appendChild(messageDiv);
        
        // إزالة الرسالة بعد 5 ثوان
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

// تهيئة تأثيرات الظهور عند التمرير
function initAnimations() {
    // إنشاء الـ Observer
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
    
    // مراقبة العناصر
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.value-card, .skill-item, .team-card, .gallery-item, .sponsor-logo');
    
    sections.forEach(section => observer.observe(section));
    cards.forEach(card => observer.observe(card));
    
    // تفعيل شريط التقدم
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        setTimeout(() => {
            progressFill.style.width = '65%';
        }, 1000);
    }
}

// تهيئة تأثيرات التمرير على المعرض
function initGalleryHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // تأثير عند التمرير
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px)';
            item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
        
        // تأثير عند النقر
        item.addEventListener('click', function() {
            const caption = this.querySelector('.gallery-caption').textContent;
            console.log(`النقر على صورة: ${caption}`);
            
            // إضافة تأثير النقر
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// تحميل الصور بسلاسة
function lazyLoadImages() {
    const images = document.querySelectorAll('.member-real-image, .team-real-image');
    
    images.forEach(img => {
        // إذا كانت الصورة قد تحملت بالفعل
        if (img.complete) {
            img.style.opacity = '1';
            img.style.animation = 'fadeInImage 0.8s ease forwards';
        } else {
            // إضافة تأثير عند تحميل الصورة
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                this.style.animation = 'fadeInImage 0.8s ease forwards';
            });
            
            // إذا فشل تحميل الصورة
            img.addEventListener('error', function() {
                if (this.classList.contains('member-real-image')) {
                    this.src = 'pic/logo.jpg';
                    console.log('تم استبدال الصورة بصورة الفريق');
                }
                this.style.opacity = '1';
                this.style.animation = 'fadeInImage 0.8s ease forwards';
            });
        }
    });
    
    // صورة الروبوت الافتراضية
    const robotPlaceholder = document.getElementById('robot-placeholder');
    if (robotPlaceholder) {
        robotPlaceholder.addEventListener('click', function() {
            console.log('سيتم إضافة صورة الروبوت قريباً!');
            
            // تأثير عند النقر
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }
}

// إضافة تأثيرات تفاعلية إضافية
function addInteractiveFeatures() {
    // تفاعل بطاقات أعضاء الفريق
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        // إضافة إمكانية الوصول بلوحة المفاتيح
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        // تأثير عند النقر
        card.addEventListener('click', function() {
            const memberName = this.querySelector('.member-name').textContent;
            const memberRole = this.querySelector('.member-role').textContent;
            
            console.log(`النقر على: ${memberName} - ${memberRole}`);
            
            // تأثير النقر
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // الدعم بلوحة المفاتيح
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // تأثير عند التركيز
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-purple)';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // تأثير الأزرار
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
    
    // تأثير الكروت
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

// إدارة حالة الروبوت
function initRobotStatus() {
    const robotStatus = document.querySelector('.robot-status');
    if (robotStatus) {
        // تحديث حالة الروبوت بشكل دوري (محاكاة)
        setInterval(() => {
            const statusValue = robotStatus.querySelector('.status-value');
            if (statusValue) {
                const progress = Math.floor(Math.random() * 10) + 60; // بين 60-70%
                statusValue.textContent = `${progress}% مكتمل`;
                
                const progressFill = document.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.width = `${progress}%`;
                }
            }
        }, 30000); // كل 30 ثانية
    }
}

// تحسين الأداء للجوال
function optimizeForMobile() {
    // تقليل عدد الرسائل في الكونسول على الجوال
    if (window.innerWidth <= 768) {
        console.log = function() {};
        console.warn = function() {};
        console.error = function() {};
    }
    
    // إدارة الصور على الجوال
    if (window.innerWidth <= 576) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // إضافة lazy loading للصور
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
}

// تهيئة الصفحة بالكامل
window.addEventListener('load', function() {
    // إضافة الميزات التفاعلية
    addInteractiveFeatures();
    
    // إدارة حالة الروبوت
    initRobotStatus();
    
    // تحسين الأداء للجوال
    optimizeForMobile();
    
    // تأثير تحميل الصفحة
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // التحقق من الاتصال
    if (!navigator.onLine) {
        showOfflineMessage();
    }
    
    // إضافة مستمع لاتصال الإنترنت
    window.addEventListener('online', () => {
        console.log('الاتصال عاد للعمل');
    });
    
    window.addEventListener('offline', () => {
        showOfflineMessage();
    });
});

// عرض رسالة عند فقدان الاتصال
function showOfflineMessage() {
    const existingMessage = document.querySelector('.offline-message');
    if (existingMessage) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'offline-message';
    messageDiv.textContent = '⚠️ أنت غير متصل بالإنترنت. بعض الميزات قد لا تعمل.';
    messageDiv.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        background: linear-gradient(135deg, #ff9800, #f57c00);
        color: white;
        padding: 1rem;
        text-align: center;
        font-weight: 500;
        z-index: 9999;
        animation: slideDown 0.5s ease;
    `;
    
    document.body.prepend(messageDiv);
    
    // إزالة الرسالة بعد 5 ثوان
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.transform = 'translateY(-100%)';
            messageDiv.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 500);
        }
    }, 5000);
}

// إضافة CSS للرسوم المتحركة
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
    
    /* تأثيرات للبطاقات */
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
    
    /* توقيتات التأثيرات */
    .team-card:nth-child(1) { animation-delay: 0.1s; }
    .team-card:nth-child(2) { animation-delay: 0.2s; }
    .team-card:nth-child(3) { animation-delay: 0.3s; }
    .team-card:nth-child(4) { animation-delay: 0.4s; }
    .team-card:nth-child(5) { animation-delay: 0.5s; }
    .team-card:nth-child(6) { animation-delay: 0.6s; }
    .team-card:nth-child(7) { animation-delay: 0.7s; }
    .team-card:nth-child(8) { animation-delay: 0.8s; }
    
    /* تحسين الأداء للرسوم المتحركة */
    .team-card,
    .value-card,
    .skill-item,
    .gallery-item {
        will-change: transform, opacity;
    }
    
    /* تأثير للصور */
    .member-real-image,
    .team-real-image {
        will-change: transform;
    }
</style>
`);

// إعدادات إضافية
(function() {
    // منع النقر الأيمن لحماية المحتوى (اختياري)
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });
    
    // منع سحب الصور (اختياري)
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });
    
    // إضافة معلومات للمطورين
    console.log(`
    ====================================
    موقع فريق RAVEN TECH MASTERS (RTM)
    فريق FTC #32670
    الإصدار: 1.0.0
    التاريخ: ${new Date().toLocaleDateString('ar-SA')}
    ====================================
    `);
})();


// إدارة صورة الروبوت
function initRobotImage() {
    const robotImage = document.querySelector('.robot-real-image');
    const robotPlaceholder = document.getElementById('robot-placeholder');
    
    if (robotImage && robotPlaceholder) {
        // تحقق إذا كانت الصورة قد تحملت
        if (robotImage.complete) {
            // إذا كانت الصورة محملة بالفعل
            if (robotImage.naturalHeight !== 0) {
                // الصورة موجودة وتحمّلت
                robotPlaceholder.classList.add('hidden');
            } else {
                // الصورة لم تتحمل (خطأ)
                robotPlaceholder.classList.remove('hidden');
                console.log('خطأ في تحميل صورة الروبوت');
            }
        }
    }
}

// إخفاء الـ Placeholder عند تحميل الصورة
function hideRobotPlaceholder() {
    const robotPlaceholder = document.getElementById('robot-placeholder');
    if (robotPlaceholder) {
        robotPlaceholder.classList.add('hidden');
        console.log('تم تحميل صورة الروبوت بنجاح');
    }
}

// التعامل مع خطأ تحميل صورة الروبوت
function handleRobotImageError() {
    const robotPlaceholder = document.getElementById('robot-placeholder');
    const robotImage = document.querySelector('.robot-real-image');
    
    if (robotPlaceholder) {
        robotPlaceholder.classList.remove('hidden');
        robotPlaceholder.innerHTML = `
            <div class="robot-placeholder-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>تعذر تحميل صورة الروبوت</span>
                <p class="placeholder-note">سيتم تحديث الصورة قريباً</p>
            </div>
        `;
    }
    
    if (robotImage) {
        // حاول استخدام صورة بديلة
        robotImage.src = 'pic/team-logo.jpg'; // صورة بديلة
        console.log('حاول استخدام صورة بديلة للروبوت');
    }
}

// تهيئة صورة الروبوت عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // ... الكود الحالي ...
    
    // تهيئة صورة الروبوت
    setTimeout(() => {
        initRobotImage();
    }, 1000); // بعد ثانية للتأكد من تحميل الصفحة
});

// تحديث تأثير التقدم للروبوت
function updateRobotProgress() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        // محاكاة تحميل
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressFill.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                // تحديث النص بعد اكتمال التحميل
                const statusValue = document.querySelector('.status-value');
                if (statusValue) {
                    statusValue.textContent = 'مكتمل وجاهز للمنافسة';
                }
            }
        }, 20); // كل 20ms يزيد 1%
    }
}

// تفعيل عند تحميل الصفحة بالكامل
window.addEventListener('load', function() {
    // ... الكود الحالي ...
    
    // تحديث شريط تقدم الروبوت
    updateRobotProgress();
});

// إدارة معرض الصور
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryImages = document.querySelectorAll('.gallery-real-image');
    
    // تأثير التمرير على العناصر
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('zoomed')) {
                item.style.transform = 'translateY(0)';
            }
        });
        
        // زووم على الصور عند النقر
        item.addEventListener('click', function() {
            if (!this.classList.contains('zoomed')) {
                // إزالة الزووم من أي عنصر آخر
                galleryItems.forEach(el => el.classList.remove('zoomed'));
                
                // تطبيق الزووم على العنصر الحالي
                this.classList.add('zoomed');
                document.body.style.overflow = 'hidden';
                
                // إضافة زر للإغلاق
                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                closeBtn.className = 'gallery-close-btn';
                closeBtn.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    width: 50px;
                    height: 50px;
                    background: rgba(93, 31, 86, 0.9);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    font-size: 1.5rem;
                    cursor: pointer;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                `;
                closeBtn.addEventListener('mouseenter', () => {
                    closeBtn.style.transform = 'scale(1.1)';
                    closeBtn.style.background = 'rgba(93, 31, 86, 1)';
                });
                closeBtn.addEventListener('mouseleave', () => {
                    closeBtn.style.transform = 'scale(1)';
                    closeBtn.style.background = 'rgba(93, 31, 86, 0.9)';
                });
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeGalleryZoom();
                });
                document.body.appendChild(closeBtn);
                
                // إغلاق عند النقر خارج الصورة
                this.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeGalleryZoom();
                    }
                });
                
                // إغلاق بمفتاح ESC
                document.addEventListener('keydown', function closeOnEsc(e) {
                    if (e.key === 'Escape') {
                        closeGalleryZoom();
                        document.removeEventListener('keydown', closeOnEsc);
                    }
                });
                
                console.log('تم تكبير الصورة');
            }
        });
    });
    
    // تأثير تحميل الصور
    galleryImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.animation = 'fadeInImage 0.8s ease forwards';
        });
        
        img.addEventListener('error', function() {
            console.log(`خطأ في تحميل صورة: ${this.alt}`);
            // الأيقونة ستظهر تلقائياً بسبب CSS
        });
    });
}

// إغلاق وضع الزووم
function closeGalleryZoom() {
    const zoomedItem = document.querySelector('.gallery-item.zoomed');
    if (zoomedItem) {
        zoomedItem.classList.remove('zoomed');
        document.body.style.overflow = '';
        
        const closeBtn = document.querySelector('.gallery-close-btn');
        if (closeBtn) {
            closeBtn.remove();
        }
    }
}

// تحميل الصور عند ظهورها
function lazyLoadGalleryImages() {
    const galleryImages = document.querySelectorAll('.gallery-real-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            }
        });
    });
    
    galleryImages.forEach(img => {
        if (img.dataset.src) {
            observer.observe(img);
        }
    });
}

// تحديث تهيئة DOM
document.addEventListener('DOMContentLoaded', function() {
    // ... الكود الحالي ...
    
    // تهيئة المعرض
    initGallery();
    lazyLoadGalleryImages();
});