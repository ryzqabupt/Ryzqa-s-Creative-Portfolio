// ============== PORTFOLIO DATA ==============
const portfolioItems = [
    {
        id: 1,
        title: "E-Commerce Website",
        description: "Beautiful and responsive e-commerce platform",
        category: "web",
        icon: "🛒"
    },
    {
        id: 2,
        title: "Mobile App Design",
        description: "Sleek UI/UX design for fitness tracking app",
        category: "design",
        icon: "📱"
    },
    {
        id: 3,
        title: "Dashboard Analytics",
        description: "Interactive analytics dashboard with real-time data",
        category: "app",
        icon: "📊"
    },
    {
        id: 4,
        title: "Travel Blog",
        description: "Dynamic travel blog with stunning visuals",
        category: "web",
        icon: "✈️"
    },
    {
        id: 5,
        title: "SaaS Platform",
        description: "Complete SaaS solution with user management",
        category: "app",
        icon: "☁️"
    },
    {
        id: 6,
        title: "Brand Identity",
        description: "Complete branding package with logo design",
        category: "design",
        icon: "🎨"
    }
];

// ============== PRICING DATA ==============
const pricingPlans = [
    {
        name: "Starter",
        price: "499",
        duration: "per project",
        features: [
            "Landing Page",
            "Mobile Responsive",
            "Basic SEO",
            "Email Support",
            "Revisions: 3"
        ],
        featured: false
    },
    {
        name: "Professional",
        price: "999",
        duration: "per project",
        features: [
            "Multi-page Website",
            "Advanced Features",
            "SEO Optimization",
            "Phone Support",
            "Unlimited Revisions",
            "Analytics Setup"
        ],
        featured: true
    },
    {
        name: "Enterprise",
        price: "2499",
        duration: "per project",
        features: [
            "Complex Web Application",
            "Custom Features",
            "Full SEO Package",
            "Priority Support",
            "Unlimited Revisions",
            "Monthly Maintenance",
            "Hosting Setup"
        ],
        featured: false
    }
];

// ============== DOM ELEMENTS ==============
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const themeToggle = document.getElementById('themeToggle');
const portfolioGrid = document.getElementById('portfolioGrid');
const priceGrid = document.getElementById('priceGrid');
const contactForm = document.getElementById('contactForm');

// ============== THEME TOGGLE ==============
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateThemeIcon();
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Load theme from localStorage
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon();
    }
});

// ============== MOBILE MENU TOGGLE ==============
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============== RENDER PORTFOLIO ==============
function renderPortfolio(filter = 'all') {
    portfolioGrid.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === filter);

    filtered.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="portfolio-image">${item.icon}</div>
            <div class="portfolio-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="portfolio-tags">
                    <span class="tag">${item.category}</span>
                </div>
            </div>
        `;

        // Add click effect
        card.addEventListener('click', () => {
            createRipple(event, card);
            card.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                card.style.animation = 'none';
            }, 500);
            showClickEffect(card);
        });

        portfolioGrid.appendChild(card);
    });
}

// ============== PORTFOLIO FILTER ==============
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPortfolio(btn.dataset.filter);
    });
});

// ============== RENDER PRICING ==============
function renderPricing() {
    priceGrid.innerHTML = '';
    
    pricingPlans.forEach((plan, index) => {
        const card = document.createElement('div');
        card.className = `price-card ${plan.featured ? 'featured' : ''}`;
        card.style.animationDelay = `${index * 0.1}s`;
        
        const featuresHTML = plan.features
            .map(feature => `<div class="feature-item"><i class="fas fa-check"><\/i>${feature}<\/div>`)
            .join('');
        
        card.innerHTML = `
            <h3>${plan.name}<\/h3>
            <div class="price">
                <span class="price-currency">Rp<\/span>${plan.price}
                <span style="font-size: 1rem;">K<\/span>
            <\/div>
            <div class="duration">${plan.duration}<\/div>
            <div class="features">
                ${featuresHTML}
            <\/div>
            <button class="btn btn-primary">Choose Plan<\/button>
        `;

        // Add button effects
        const btn = card.querySelector('.btn');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            createRipple(e, btn);
            showSuccessMessage(`${plan.name} plan selected! 🎉`);
            setTimeout(() => {
                btn.innerHTML = '✓ Selected';
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerHTML = 'Choose Plan';
                    btn.disabled = false;
                }, 2000);
            }, 500);
        });

        priceGrid.appendChild(card);
    });
}

// ============== FORM SUBMISSION ==============
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    // Button effect
    button.textContent = '✉️ Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '✓ Message Sent Successfully!';
        showSuccessMessage('Thank you! I\'ll get back to you soon 😊');
        contactForm.reset();
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 3000);
    }, 1500);
});

// ============== SCROLL TO FUNCTION ==============
function scrollTo(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// ============== RIPPLE EFFECT ==============
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// ============== CLICK EFFECT ==============
function showClickEffect(element) {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: fixed;
        pointer-events: none;
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary-color);
        z-index: 10000;
        animation: floatUp 1s ease-out forwards;
    `;
    effect.innerHTML = '✨';
    effect.style.left = event.clientX + 'px';
    effect.style.top = event.clientY + 'px';
    effect.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
}

// ============== SUCCESS MESSAGE ==============
function showSuccessMessage(message) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6c5ce7, #00b894);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 10001;
        box-shadow: 0 5px 20px rgba(108, 92, 231, 0.4);
        animation: slideInRight 0.5s ease-out;
        font-weight: 600;
    `;
    popup.textContent = message;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

// Add animations CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.95); }
    }

    @keyframes floatUp {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -150px);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ============== SCROLL ANIMATIONS ==============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ============== INITIALIZE ==============
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    renderPricing();
    
    // Observe elements for animations
    document.querySelectorAll('.profile-card, .portfolio-card, .price-card, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    // Add click effects to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mousedown', function(e) {
            if (e.button === 0) { // Left click only
                createRipple(e, this);
            }
        });
    });
});

// ============== SMOOTH SCROLL EFFECT ==============
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============== KEYBOARD NAVIGATION ==============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// ============== PARALLAX EFFECT ==============
window.addEventListener('scroll', () => {
    const floatingBox = document.querySelector('.floating-box');
    const floatingCircle = document.querySelector('.floating-circle');
    
    if (floatingBox && floatingCircle) {
        const scrollY = window.scrollY;
        floatingBox.style.transform = `translateY(${scrollY * 0.5}px)`;
        floatingCircle.style.transform = `translateY(${scrollY * 0.7}px)`;
    }
});

// ============== ADD ACTIVE LINK ANIMATION ==============
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});