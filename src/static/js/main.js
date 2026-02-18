// Fonction de défilement fluide vers une section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Gestion du mode sombre / clair
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const isDarkMode = !document.body.classList.contains('light-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    const themeIcon = document.querySelector('.theme-toggle');
    if (themeIcon) {
        themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du mode sombre/clair
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'false') {
        document.body.classList.add('light-mode');
    }
    
    // ===== COMPTEUR DE VISITES =====
    initVisitCounter();
    
    // ===== FILTRAGE DES PROJETS =====
    initProjectFilters();
    
    // ===== VALIDATION FORMULAIRE EN TEMPS RÉEL =====
    initFormValidation();
    
    // ===== NAVIGATION MOBILE =====
    initMobileMenu();
    
    // Gestion du formulaire de contact avec mailto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Validation finale
            if (!validateName(nameInput.value) || !validateEmail(emailInput.value) || !validateMessage(messageInput.value)) {
                showNotification('Veuillez corriger les erreurs avant d\'envoyer.', 'error');
                return;
            }
            
            // Préparation du contenu de l'email
            const subject = encodeURIComponent(`Message de ${nameInput.value.trim()} via Portfolio`);
            const body = encodeURIComponent(
                `Nom: ${nameInput.value.trim()}\n` +
                `Email: ${emailInput.value.trim()}\n\n` +
                `Message:\n${messageInput.value.trim()}`
            );
            
            // Ouvrir le client email
            window.location.href = `mailto:theodore.najman@gmail.com?subject=${subject}&body=${body}`;
            
            // Confirmation
            showNotification('Votre client email va s\'ouvrir avec le message pré-rempli', 'success');
            
            // Réinitialiser le formulaire après 2 secondes
            setTimeout(() => {
                contactForm.reset();
                clearFormErrors();
            }, 2000);
        });
    }
    
    // Animation au scroll pour les liens de navigation (seulement pour les ancres #)
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Ne bloquer que les liens avec ancre (#) sur la même page
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
            // Laisser les autres liens fonctionner normalement (navigation entre pages)
        });
    });
    
    // Mise en évidence du lien actif dans la navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section, .hero');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Animations d'entrée au scroll
        animateOnScroll();
    });
    
    // Animation d'entrée des éléments
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .education-item, .apropos-text');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate-in');
            }
        });
    }
    
    // Animation initiale au chargement
    animateOnScroll();
});

// Système de notifications
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== COMPTEUR DE VISITES =====
function initVisitCounter() {
    let visitCount = localStorage.getItem('visitCount');
    
    if (!visitCount) {
        visitCount = 35;
    }
    
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('visitCount', visitCount);
    
    const counterElement = document.getElementById('visitCount');
    if (counterElement) {
        counterElement.textContent = visitCount;
    }
}

// ===== FILTRAGE DES PROJETS =====
let currentProjectIndex = 0;
let visibleProjects = [];

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectLinks = document.querySelectorAll('.project-link');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    
    // Initialiser les projets visibles
    updateVisibleProjects('all');
    
    // Gestion des filtres
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Mise à jour des boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Réinitialiser l'index
            currentProjectIndex = 0;
            
            // Filtrage des projets
            updateVisibleProjects(category);
        });
    });
    
    // Navigation carousel
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateProjects(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateProjects(1));
    }
}

function updateVisibleProjects(category) {
    const projectLinks = document.querySelectorAll('.project-link');
    visibleProjects = [];
    
    projectLinks.forEach(link => {
        const projectCategories = link.getAttribute('data-category').split(' ');
        
        // Afficher si "Tous" ou si la catégorie correspond
        if (category === 'all' || projectCategories.includes(category)) {
            visibleProjects.push(link);
            link.style.display = 'block';
            link.classList.add('animate-in');
        } else {
            link.style.display = 'none';
        }
    });
    
    updateCarouselButtons();
}

function navigateProjects(direction) {
    if (visibleProjects.length === 0) return;
    
    const projectsGrid = document.getElementById('projectsGrid');
    const gridWidth = projectsGrid.offsetWidth;
    const scrollAmount = gridWidth + 32; // width + gap
    
    currentProjectIndex += direction;
    
    // Limiter l'index
    if (currentProjectIndex < 0) {
        currentProjectIndex = 0;
    } else if (currentProjectIndex >= visibleProjects.length) {
        currentProjectIndex = visibleProjects.length - 1;
    }
    
    // Scroll fluide
    const targetProject = visibleProjects[currentProjectIndex];
    if (targetProject) {
        targetProject.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
    }
    
    updateCarouselButtons();
}

function updateCarouselButtons() {
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    
    if (!prevBtn || !nextBtn) return;
    
    // Désactiver/activer les boutons selon la position
    if (currentProjectIndex === 0) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';
    } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
    }
    
    if (currentProjectIndex >= visibleProjects.length - 1) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }
}

// ===== VALIDATION FORMULAIRE EN TEMPS RÉEL =====
function initFormValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            validateNameField(this);
        });
        nameInput.addEventListener('blur', function() {
            validateNameField(this);
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmailField(this);
        });
        emailInput.addEventListener('blur', function() {
            validateEmailField(this);
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            validateMessageField(this);
        });
        messageInput.addEventListener('blur', function() {
            validateMessageField(this);
        });
    }
}

function validateNameField(input) {
    const error = document.getElementById('name-error');
    const value = input.value.trim();
    
    if (value.length === 0) {
        showError(input, error, 'Le nom est requis');
        return false;
    } else if (value.length < 2) {
        showError(input, error, 'Le nom doit contenir au moins 2 caractères');
        return false;
    } else {
        clearError(input, error);
        return true;
    }
}

function validateEmailField(input) {
    const error = document.getElementById('email-error');
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value.length === 0) {
        showError(input, error, 'L\'email est requis');
        return false;
    } else if (!emailRegex.test(value)) {
        showError(input, error, 'Veuillez entrer un email valide');
        return false;
    } else {
        clearError(input, error);
        return true;
    }
}

function validateMessageField(input) {
    const error = document.getElementById('message-error');
    const value = input.value.trim();
    
    if (value.length === 0) {
        showError(input, error, 'Le message est requis');
        return false;
    } else if (value.length < 10) {
        showError(input, error, 'Le message doit contenir au moins 10 caractères');
        return false;
    } else {
        clearError(input, error);
        return true;
    }
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function validateName(value) {
    return value.trim().length >= 2;
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
}

function validateMessage(value) {
    return value.trim().length >= 10;
}

function clearFormErrors() {
    const errors = document.querySelectorAll('.form-error');
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// ===== NAVIGATION MOBILE =====
function initMobileMenu() {
    // Le menu hamburger sera ajouté dans le CSS responsive
    const navList = document.querySelector('.nav-list');
    
    // Fermer le menu au clic sur un lien (mobile)
    if (navList && window.innerWidth <= 768) {
        const navLinks = navList.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });
    }
}