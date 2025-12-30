// ========================================
// PORTAFOLIO MEJORADO - JAVASCRIPT
// ========================================

// ========================================
// 1. INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initializeAOS();
  initializeThemeToggle();
  initializeMobileMenu();
  initializeNavigation();
  initializeProjectFilters();
  initializeProjectModal();
  initializeScrollTop();
  initializeCounters();
  initializeLazyLoading();
  initializeFormValidation();
});

// ========================================
// 2. ANIMACIONES AOS
// ========================================
function initializeAOS() {
  AOS.init({
    duration: 800,
    offset: 100,
    once: true,
    easing: 'ease-out-cubic'
  });
}

// ========================================
// 3. TEMA OSCURO/CLARO
// ========================================
function initializeThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  
  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Animación del botón
    themeToggle.classList.add('theme-toggle--active');
    setTimeout(() => {
      themeToggle.classList.remove('theme-toggle--active');
    }, 300);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// ========================================
// 4. MENÚ MÓVIL
// ========================================
function initializeMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('nav__toggle--active');
    navMenu.classList.toggle('nav--active');
    document.body.classList.toggle('no-scroll');
  });

  // Cerrar menú al hacer click en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('nav__toggle--active');
      navMenu.classList.remove('nav--active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('nav__toggle--active');
      navMenu.classList.remove('nav--active');
      document.body.classList.remove('no-scroll');
    }
  });
}

// ========================================
// 5. NAVEGACIÓN ACTIVA
// ========================================
function initializeNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  const header = document.getElementById('header');

  // Scroll spy
  window.addEventListener('scroll', () => {
    // Header scroll effect
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    // Active section
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('nav__link--active');
      }
    });
  });

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// 6. FILTROS DE PROYECTOS
// ========================================
function initializeProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Actualizar botón activo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filtrar proyectos
      projects.forEach(project => {
        const category = project.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          project.style.display = 'block';
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'scale(1)';
          }, 10);
        } else {
          project.style.opacity = '0';
          project.style.transform = 'scale(0.8)';
          setTimeout(() => {
            project.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ========================================
// 7. MODAL DE PROYECTOS
// ========================================
function initializeProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalOverlay = modal.querySelector('.modal__overlay');
  const modalClose = modal.querySelector('.modal__close');
  const modalBody = modal.querySelector('.modal__body');
  const viewBtns = document.querySelectorAll('.project__view-btn');

  // Datos de los proyectos
  const projectsData = {
    'portafolio': {
      title: 'Portafolio',
      description: 'Portafolio personal diseñado para presentar mis proyectos, experiencia e información de contacto de manera profesional.',
      fullDescription: `
        <p>Este proyecto representa mi primer portafolio completo, desarrollado con tecnologías modernas y siguiendo las mejores prácticas de desarrollo web.</p>
        <h4>Características principales:</h4>
        <ul>
          <li>Diseño responsive que se adapta a todos los dispositivos</li>
          <li>Estructura semántica HTML5 para mejor SEO</li>
          <li>Arquitectura CSS con metodología BEM</li>
          <li>Optimización de rendimiento y accesibilidad</li>
          <li>Animaciones suaves y transiciones fluidas</li>
        </ul>
      `,
      images: [
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop'
      ],
      technologies: ['HTML5', 'CSS3', 'BEM', 'Responsive Design'],
      links: {
        demo: 'https://dinoivan1120.github.io/Portafolio/',
        github: 'https://github.com/DinoIvan1120/Portafolio'
      }
    },
    'tienda': {
      title: 'Tienda Online de Libros',
      description: 'Aplicación Full Stack completa para la gestión de compras de libros.',
      fullDescription: `
        <p>Plataforma e-commerce completa que permite a los usuarios navegar, buscar y comprar libros de manera intuitiva y segura.</p>
        <h4>Características principales:</h4>
        <ul>
          <li>Sistema de autenticación y autorización JWT</li>
          <li>Carrito de compras con persistencia</li>
          <li>Panel de administración completo</li>
          <li>Gestión de inventario en tiempo real</li>
          <li>Integración con pasarela de pagos</li>
          <li>Sistema de búsqueda y filtros avanzados</li>
        </ul>
      `,
      images: [
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop'
      ],
      technologies: ['Angular 17', 'Spring Boot', 'Java 17', 'MySQL', 'JWT'],
      links: {
        demo: '#',
        github: '#'
      }
    },
    'gifs': {
      title: 'Buscador de Gifs',
      description: 'Aplicación interactiva para buscar y visualizar GIFs usando la API de Giphy.',
      fullDescription: `
        <p>Aplicación moderna desarrollada con React y TypeScript que ofrece una experiencia fluida para buscar GIFs.</p>
        <h4>Características principales:</h4>
        <ul>
          <li>Búsqueda en tiempo real con debounce</li>
          <li>Sistema de caché inteligente para optimizar peticiones</li>
          <li>Historial de búsquedas persistente</li>
          <li>Diseño responsive y adaptable</li>
          <li>Carga lazy de imágenes para mejor rendimiento</li>
          <li>Despliegue en producción con Netlify</li>
        </ul>
      `,
      images: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop'
      ],
      technologies: ['React', 'TypeScript', 'Vite', 'Giphy API'],
      links: {
        demo: 'https://project-gifs.netlify.app/',
        github: 'https://github.com/Dinoivan/Buscador-de-gifs'
      }
    },
    'projectflow': {
      title: 'ProjectFlow',
      description: 'Sistema completo de gestión de proyectos y tareas.',
      fullDescription: `
        <p>Plataforma colaborativa para administrar proyectos, asignar tareas y monitorear el progreso del equipo.</p>
        <h4>Características principales:</h4>
        <ul>
          <li>Gestión completa de proyectos y tareas</li>
          <li>Sistema de roles y permisos</li>
          <li>Dashboard con métricas en tiempo real</li>
          <li>Notificaciones y alertas automáticas</li>
          <li>Calendario de actividades</li>
          <li>Colaboración en tiempo real</li>
        </ul>
      `,
      images: [
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop'
      ],
      technologies: ['React', 'Java 17', 'Spring Boot', 'PostgreSQL', 'JWT'],
      links: {
        demo: 'https://projectflow.duckdns.org/api/v1/swagger-ui/index.html#/',
        github: 'https://github.com/DinoIvan1120/ProjectFlow'
      }
    },
    'Mobile-First': {
      title: 'Mobile First',
      description: 'Landing Page desarrollada con enfoque Mobile First, priorizando usabilidad, rendimiento y accesibilidad en dispositivos móviles.',
      fullDescription: `
        <p>Landing Page informativa diseñada para presentar una plataforma de intercambio de criptomonedas, desarrollada con enfoque Mobile First para evidenciar buenas prácticas de maquetación, usabilidad, accesibilidad y rendimiento en dispositivos móvile.</p>
         <h4>Características principales:</h4>
        <ul>
          <li>Diseño Mobile First con escalabilidad progresiva a desktop</li>
          <li>Interfaz limpia, intuitiva y enfocada en experiencia de usuario (UX)</li>
          <li>Estructura semántica HTML optimizada para SEO</li>
          <li>Maquetación responsive utilizando metodología BEM</li>
          <li>Optimización de carga y recursos para dispositivos móviles</li>
          <li>Accesibilidad básica aplicada (contraste, navegación clara, etiquetas semánticas)</li>
          <li>Landing orientada a conversión y presentación de contenido</li>
        </ul>
      `,
      images: [
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop'
      ],
      technologies: ['HTML5', 'CSS3', 'BEM', 'SEO'],
      links: {
        demo: 'https://dinoivan1120.github.io/Landing-Page-patr-n-Mobile-First/',
        github: 'https://github.com/DinoIvan1120/Landing-Page-patr-n-Mobile-First'
      }
    },

    'mybloc': {
     title: 'MyBloc',
     description: 'Blog personal desarrollado con enfoque Mobile First, priorizando usabilidad, rendimiento y accesibilidad en dispositivos móviles.',
     fullDescription: `
    <p>
      <strong>MyBloc</strong> es un blog personal diseñado para compartir artículos, ideas y experiencias
      relacionadas con el desarrollo de software, creado con el objetivo de evidenciar la aplicación de
      buenas prácticas de maquetación, diseño Mobile First y optimización frontend.
    </p>

    <h4>Características principales:</h4>
    <ul>
      <li>Diseño Mobile First con adaptación progresiva a pantallas de mayor tamaño</li>
      <li>Interfaz clara e intuitiva enfocada en la experiencia de usuario (UX)</li>
      <li>Estructura semántica HTML optimizada para SEO</li>
      <li>Maquetación responsive aplicando la metodología BEM</li>
      <li>Optimización de carga y recursos para dispositivos móviles</li>
      <li>Buenas prácticas de accesibilidad (contraste, navegación clara, etiquetas semánticas)</li>
      <li>Espacio orientado a la presentación y difusión de contenido personal</li>
    </ul>
  `,
  images: [
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop'
  ],
  technologies: ['HTML5', 'CSS3', 'BEM', 'SEO', 'Mobile First'],
  links: {
    demo: 'https://dinoivan1120.github.io/Landing-Page-patr-n-Mobile-First/',
    github: 'https://github.com/DinoIvan1120/Landing-Page-patr-n-Mobile-First'
  }
}
  };

  // Abrir modal
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const projectData = projectsData[projectId];
      
      if (projectData) {
        openModal(projectData);
      }
    });
  });

  // Cerrar modal
  function closeModal() {
    modal.classList.remove('modal--active');
    document.body.classList.remove('no-scroll');
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
      closeModal();
    }
  });

  function openModal(data) {
    // Crear galería de imágenes
    const imagesHTML = data.images.map((img, index) => `
      <div class="modal__image-container">
        <img src="${img}" alt="${data.title} - Imagen ${index + 1}" class="modal__image" loading="lazy">
      </div>
    `).join('');

    // Crear lista de tecnologías
    const techHTML = data.technologies.map(tech => `
      <span class="tag">${tech}</span>
    `).join('');

    // Construir contenido del modal
    modalBody.innerHTML = `
      <h2 class="modal__title">${data.title}</h2>
      <p class="modal__subtitle">${data.description}</p>
      
      <div class="modal__gallery">
        ${imagesHTML}
      </div>
      
      ${data.fullDescription}
      
      <div class="modal__technologies">
        <h4>Tecnologías utilizadas:</h4>
        <div class="modal__tech-list">
          ${techHTML}
        </div>
      </div>
      
      <div class="modal__actions">
        ${data.links.demo ? `<a href="${data.links.demo}" target="_blank" class="button button--primary"><i class="fas fa-external-link-alt"></i> Ver Demo</a>` : ''}
        ${data.links.github ? `<a href="${data.links.github}" target="_blank" class="button button--secondary"><i class="fab fa-github"></i> Ver Código</a>` : ''}
      </div>
    `;

    modal.classList.add('modal--active');
    document.body.classList.add('no-scroll');
  }
}

// ========================================
// 8. SCROLL TO TOP
// ========================================
function initializeScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('scroll-top--visible');
    } else {
      scrollTopBtn.classList.remove('scroll-top--visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// 9. CONTADORES ANIMADOS
// ========================================
function initializeCounters() {
  const counters = document.querySelectorAll('.stat__number');
  let hasAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      };

      updateCounter();
    });
  };

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  }, observerOptions);

  const heroStats = document.querySelector('.hero__stats');
  if (heroStats) {
    observer.observe(heroStats);
  }
}

// ========================================
// 10. LAZY LOADING DE IMÁGENES
// ========================================
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// ========================================
// 11. VALIDACIÓN DE FORMULARIOS
// ========================================
function initializeFormValidation() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const inputs = form.querySelectorAll('input, textarea');
      let isValid = true;

      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.classList.add('input--error');
        } else {
          input.classList.remove('input--error');
        }
      });

      if (isValid) {
        // Aquí puedes agregar la lógica para enviar el formulario
        console.log('Formulario válido');
        showNotification('¡Mensaje enviado correctamente!', 'success');
        form.reset();
      } else {
        showNotification('Por favor completa todos los campos requeridos', 'error');
      }
    });
  });
}

// ========================================
// 12. NOTIFICACIONES
// ========================================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('notification--visible');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('notification--visible');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// ========================================
// 13. PERFORMANCE MONITORING
// ========================================
if ('PerformanceObserver' in window) {
  // Monitorear métricas de rendimiento
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('Performance:', entry.name, entry.startTime);
    }
  });
  
  observer.observe({ entryTypes: ['measure', 'navigation'] });
}

// ========================================
// 14. SERVICE WORKER (opcional)
// ========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('Service Worker registrado'))
    //   .catch(err => console.log('Error al registrar SW:', err));
  });
}

// ========================================
// 15. UTILIDADES
// ========================================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// 16. EASTER EGGS (opcional)
// ========================================
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  showNotification('¡Código Konami activado! 🎮', 'success');
  document.body.style.animation = 'rainbow 2s infinite';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 10000);
}

console.log('🚀 Portfolio cargado correctamente');
console.log('💻 Desarrollado por Dino Iván Pérez Vásquez');