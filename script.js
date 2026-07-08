// --- Clean, Friendly Interactive Logic ---

// 1. Particles.js (Connecting lines interactive background) //
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 60,
      "density": { "enable": true, "value_area": 800 }
    },
    "color": { "value": "#FF7E5F" }, // Sunset Coral accent
    "shape": { "type": "circle" },
    "opacity": {
      "value": 0.3,
      "random": false
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#FF7E5F",
      "opacity": 0.3,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1.5,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab" // The critical connecting lines effect
      },
      "onclick": {
        "enable": true,
        "mode": ["push", "remove"]
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 180,
        "line_linked": {
          "opacity": 0.6
        }
      },
      "push": {
        "particles_nb": 3
      }
      ,
      "remove": {
        "particles_nb": 3
      }
    }
  },
  "retina_detect": true
});

// 2. Simple, Friendly Intersection Observer for gentle fade-ins
const fadeElements = document.querySelectorAll('.fade-in, .section-title, .project-card, .btn');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

fadeElements.forEach(el => observer.observe(el));


// 3. Keep Navbar Scroll logic
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 4. Update active nav link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 5. Interactive Spotlight Effect for Project Cards
const cards = document.querySelectorAll('.project-card, .featured-project-card');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// 6. Mobile Menu Toggle logic
const createMobileMenu = () => {
    const navContent = document.querySelector('.nav-content');
    const menuBtn = document.createElement('div');
    menuBtn.className = 'menu-btn';
    menuBtn.innerHTML = '<div class="menu-btn__burger"></div>';
    navContent.appendChild(menuBtn);

    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if(!menuOpen) {
            menuBtn.classList.add('open');
            navLinks.classList.add('open');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('open');
            menuOpen = false;
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('open');
            menuOpen = false;
        });
    });
};

createMobileMenu();

// --- Interactive Project Filtering & Glassmorphism Detail Modals ---

// 1. Projects Content Database
const projectsData = {
    "ai-emergency": {
        title: "AI-Powered Medical Emergency Detection",
        category: "AI & Machine Learning",
        image: "assets/emergency-action.jpg",
        description: "An automated visual surveillance system designed to detect medical crises in real-time. By utilizing deep learning architectures instead of wearables, it monitors environments to detect falls, chest distress, and severe vomiting incidents instantly, facilitating rapid first-responder contact.",
        features: [
            "Advanced real-time human pose estimation using YOLOv11 framework",
            "Spatio-temporal sequence classification using custom CNN-LSTM model",
            "Automatic Levine's sign (chest grabbing posture) detector",
            "Direct emergency notifications generated via an SMPP gateway connection"
        ],
        tech: ["Python", "YOLOv11", "CNN-LSTM", "OpenCV", "SMPP Gateway", "PyTorch"],
        github: "https://github.com/jamesbacas",
        liveLink: "#"
    },
    "barbershop": {
        title: "Trim Barbershop Booking",
        category: "Web Apps",
        image: "assets/barbershop-preview.png",
        description: "A sleek, responsive client booking web app developed for modern barbershops. Features dynamic staff scheduling workflows, custom service lists, calendar logic, and an intuitive client panel that simplifies barber selection and styling catalog discovery.",
        features: [
            "Timeline booking interface for a frictionless checkout flow",
            "Adaptive scheduling algorithms validating barber shift calendars",
            "Complete service catalog showcasing custom prices and cuts",
            "Fully mobile-responsive glassmorphism front-end UI"
        ],
        tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Local Storage", "Responsive UI"],
        github: "https://github.com/jamesbacas",
        liveLink: "https://jamesbacas.github.io/Trim-Barbershop-Booking"
    },
    "clinic-inventory": {
        title: "Clinic Inventory System",
        category: "AI & Machine Learning",
        image: "assets/yolo-preview.png",
        description: "A data-driven medical database system developed to sort student health records and analyze clinic supply usage patterns. Uses predictive algorithms to forecast and filter which medical supplies will be most critical each school year based on historical cohort logs.",
        features: [
            "Intelligent data categorization and health metric filtering algorithms",
            "Visual analytics mapping medication usage levels and supply timelines",
            "Automated alert warnings triggered by custom inventory depletion metrics",
            "Comprehensive reporting interface for medical staff planning"
        ],
        tech: ["Python", "Pandas", "Matplotlib", "SQLite", "Data Science"],
        github: "https://github.com/jamesbacas",
        liveLink: "#"
    },
    "react-dashboard": {
        title: "React Native Dashboard",
        category: "Mobile Apps",
        image: "assets/yolo-preview.png",
        description: "A modular, high-performance cross-platform dashboard application currently in development. Employs advanced state management, interactive visualization widgets, native API endpoints, and robust JWT session validation.",
        features: [
            "Native cross-platform core supporting iOS and Android runtimes",
            "Custom dynamic charts mapping analytics data widgets",
            "Secure keychain storage handling sensitive user token credentials",
            "Polished light and dark design tokens for enhanced readability"
        ],
        tech: ["React Native", "TypeScript", "Expo", "Redux Toolkit", "React Navigation"],
        github: "https://github.com/jamesbacas",
        liveLink: "#"
    }
};

// 2. Project Category Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.featured-project, .project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Toggle active button class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedFilter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                card.classList.remove('filtered-out');
                // Allow CSS transition to play, then ensure element is visible
                card.style.display = '';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                // Add class that sets display: none after transition completes
                card.classList.add('filtered-out');
            }
        });
    });
});

// 3. Project Modal Details Logic
const modalOverlay = document.getElementById('project-modal');
const modalBody = modalOverlay.querySelector('.modal-body');
const modalCloseBtn = modalOverlay.querySelector('.modal-close');
const projectDetailTriggers = document.querySelectorAll('.open-project-details');

const openModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    // Construct modal content HTML
    let featuresHTML = '';
    data.features.forEach(feat => {
        featuresHTML += `<li>${feat}</li>`;
    });

    let techHTML = '';
    data.tech.forEach(t => {
        techHTML += `<li>${t}</li>`;
    });

    let actionsHTML = '';
    if (data.liveLink && data.liveLink !== '#') {
        actionsHTML += `<a href="${data.liveLink}" target="_blank" class="btn btn-primary"><span class="btn-text">Launch Live Site</span></a>`;
    }
    if (data.github) {
        actionsHTML += `<a href="${data.github}" target="_blank" class="social-link" style="align-self: center; margin-left: 15px; font-weight: 500;">View GitHub Code</a>`;
    }

    modalBody.innerHTML = `
        <div class="modal-project-header">
            <span class="modal-project-tag">${data.category}</span>
            <h3 class="modal-project-title">${data.title}</h3>
        </div>
        <div class="modal-project-grid">
            <div class="modal-left">
                <img src="${data.image}" alt="${data.title}">
                <p class="modal-description">${data.description}</p>
            </div>
            <div class="modal-right">
                <h4 class="modal-features-title">Core Features & Contributions</h4>
                <ul class="modal-features-list">
                    ${featuresHTML}
                </ul>
                
                <h4 class="modal-features-title">Technologies Used</h4>
                <ul class="modal-tech-tags">
                    ${techHTML}
                </ul>
                
                <div class="modal-actions">
                    ${actionsHTML}
                </div>
            </div>
        </div>
    `;

    // Open modal with animations and prevent body scroll
    modalOverlay.classList.add('active');
    document.body.classList.add('modal-open');
};

const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
};

// Bind open click listeners
projectDetailTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = trigger.getAttribute('data-project');
        openModal(projectId);
    });
});

// Bind close listeners
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

