// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileToggle) {
    mobileToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active")
      this.classList.toggle("active")

      // Animate hamburger menu
      const spans = this.querySelectorAll("span")
      if (this.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          mobileToggle.classList.remove("active")
        }
      }
    })
  })

  // Form submission
  const talkForm = document.getElementById("talkForm")

  if (talkForm) {
    talkForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      // Show loading state
      const submitBtn = this.querySelector(".send-btn")
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        showNotification("Thank you for your message! We will contact you shortly.", "success")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Notification function
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === "success" ? "✓" : "ℹ"}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "linear-gradient(45deg, #10b981, #34d399)" : "linear-gradient(45deg, #8B5CF6, #EC4899)"};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
        font-weight: 500;
        max-width: 350px;
    `

    // Add notification styles
    const style = document.createElement("style")
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-icon {
            font-size: 1.2rem;
            font-weight: bold;
        }
        .notification-message {
            flex: 1;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `
    document.head.appendChild(style)

    document.body.appendChild(notification)

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      removeNotification()
    })

    function removeNotification() {
      notification.style.animation = "slideOut 0.3s ease-out"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
        if (document.head.contains(style)) {
          document.head.removeChild(style)
        }
      }, 300)
    }

    // Auto remove after 5 seconds
    setTimeout(removeNotification, 5000)
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe sections for animation
  const sections = document.querySelectorAll("section:not(.hero)")
  sections.forEach((section) => {
    section.classList.add("fade-in")
    observer.observe(section)
  })

  // Pricing card hover effects with enhanced animations
  const pricingCards = document.querySelectorAll(".pricing-card")
  pricingCards.forEach((card, index) => {
    // Stagger animation delays
    card.style.animationDelay = `${index * 0.1}s`

    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)"
      this.style.boxShadow = "0 25px 50px rgba(139, 92, 246, 0.4)"

      // Animate the icon
      const icon = this.querySelector(".package-icon")
      if (icon) {
        icon.style.animation = "pulse 0.6s ease-in-out"
      }
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "none"

      // Reset icon animation
      const icon = this.querySelector(".package-icon")
      if (icon) {
        icon.style.animation = "float 3s ease-in-out infinite"
      }
    })
  })

  // Enhanced button click effects
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `

      const rippleStyle = document.createElement("style")
      rippleStyle.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `
      document.head.appendChild(rippleStyle)

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        if (this.contains(ripple)) {
          this.removeChild(ripple)
        }
        if (document.head.contains(rippleStyle)) {
          document.head.removeChild(rippleStyle)
        }
      }, 600)
    })
  })

  // Header scroll effect
  const header = document.querySelector(".header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(25, 26, 28, 0.95)"
      header.style.backdropFilter = "blur(10px)"
      header.style.borderBottom = "1px solid rgba(139, 92, 246, 0.3)"
    } else {
      header.style.background = "#191A1C"
      header.style.backdropFilter = "none"
      header.style.borderBottom = "1px solid #333"
    }
  })

  // Choose Plan button clicks
  const choosePlanBtns = document.querySelectorAll(".choose-plan-btn")
  choosePlanBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const packageName = this.closest(".pricing-card").querySelector("h3").textContent
      const price = this.closest(".pricing-card").querySelector(".price").textContent

      showNotification(`Great choice! You selected ${packageName} for ${price}. We'll contact you soon!`, "success")

      // Scroll to contact form
      setTimeout(() => {
        document.querySelector("#contact").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 1500)
    })
  })

  // Send Message button click
  const sendMessageBtn = document.querySelector(".send-message-btn")
  if (sendMessageBtn) {
    sendMessageBtn.addEventListener("click", () => {
      showNotification("Redirecting to contact form...", "info")
      setTimeout(() => {
        document.querySelector("#contact").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 1000)
    })
  }

  // Parallax effect for backgrounds
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-background")
    const speed = 0.5

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * speed}px)`
    }
  })

  // Badge hover effects
  const badges = document.querySelectorAll(".badge")
  badges.forEach((badge) => {
    badge.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.05)"
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.3)"
    })

    badge.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
    })
  })

  // Add floating animation to package icons with staggered delays
  const packageIcons = document.querySelectorAll(".package-icon")
  packageIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`
  })

  // Form validation
  const inputs = document.querySelectorAll("input, select, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#ef4444"
        this.style.boxShadow = "0 0 5px rgba(239, 68, 68, 0.3)"
      } else {
        this.style.borderColor = "rgba(255, 255, 255, 0.3)"
        this.style.boxShadow = "none"
      }
    })

    input.addEventListener("focus", function () {
      this.style.borderColor = "rgba(255, 255, 255, 0.6)"
      this.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.2)"
    })
  })

  // Typing effect for hero title
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.textContent = ""
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    setTimeout(typeWriter, 1000)
  }
})

// Loading Screen
window.addEventListener("load", () => {
  const loading = document.querySelector(".loading")
  if (loading) {
    setTimeout(() => {
      loading.classList.add("hidden")
      setTimeout(() => {
        loading.remove()
      }, 500)
    }, 1000)
  }
})

// Create dynamic background particles
function createBackgroundParticle() {
  const sections = [".hero", ".lets-talk", ".footer"]
  const randomSection = sections[Math.floor(Math.random() * sections.length)]
  const section = document.querySelector(randomSection)

  if (!section) return

  const particle = document.createElement("div")
  particle.style.cssText = `
      position: absolute;
      width: 3px;
      height: 3px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      pointer-events: none;
      animation: particleFloat 12s linear infinite;
      z-index: 0;
  `

  particle.style.left = Math.random() * 100 + "%"
  particle.style.animationDelay = Math.random() * 12 + "s"

  section.appendChild(particle)

  setTimeout(() => {
    if (section.contains(particle)) {
      section.removeChild(particle)
    }
  }, 12000)
}

// Add particle animation styles
const particleStyle = document.createElement("style")
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(particleStyle)

// Create particles periodically
setInterval(createBackgroundParticle, 3000)

// Add loading screen HTML
document.addEventListener("DOMContentLoaded", () => {
  const loadingHTML = `
      <div class="loading">
          <div class="spinner"></div>
      </div>
  `
  document.body.insertAdjacentHTML("afterbegin", loadingHTML)
})

// Performance optimization
window.addEventListener("load", () => {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth"

// Add custom cursor effect
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor")
  if (!cursor) {
    const cursorEl = document.createElement("div")
    cursorEl.className = "custom-cursor"
    cursorEl.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: linear-gradient(45deg, #8b5cf6, #ec4899);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.7;
      transition: transform 0.1s ease;
    `
    document.body.appendChild(cursorEl)
  }

  const cursorElement = document.querySelector(".custom-cursor")
  cursorElement.style.left = e.clientX - 10 + "px"
  cursorElement.style.top = e.clientY - 10 + "px"
})

// Add hover effects for interactive elements
document.addEventListener(
  "mouseenter",
  (e) => {
    if (e.target.matches("button, a, .pricing-card")) {
      const cursor = document.querySelector(".custom-cursor")
      if (cursor) {
        cursor.style.transform = "scale(1.5)"
      }
    }
  },
  true,
)

document.addEventListener(
  "mouseleave",
  (e) => {
    if (e.target.matches("button, a, .pricing-card")) {
      const cursor = document.querySelector(".custom-cursor")
      if (cursor) {
        cursor.style.transform = "scale(1)"
      }
    }
  },
  true,
)

// Animate stats on scroll
        function animateStats() {
            const stats = document.querySelectorAll('.stat-item h3');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.textContent);
                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                entry.target.textContent = target + '+';
                                clearInterval(timer);
                            } else {
                                entry.target.textContent = Math.floor(current) + '+';
                            }
                        }, 30);
                    }
                });
            });

            stats.forEach(stat => observer.observe(stat));
        }

        // Initialize animations when page loads
        document.addEventListener('DOMContentLoaded', function() {
            animateStats();
        });



/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "polygon",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);

// socail media marketing javacvript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeAnimations();
    addScrollAnimations();
    addInteractiveEffects();
    addParallaxEffect();
    addSaveButtonFunctionality();
    
});

// Initialize loading animations
function initializeAnimations() {
    const sections = document.querySelectorAll('.marketing-content, .services-content, .platforms-content');
    
    sections.forEach((section, index) => {
        section.classList.add('loading');
        section.style.animationDelay = `${index * 0.2}s`;
    });
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const marketingContent = document.querySelector('.marketing-content');
    const servicesContent = document.querySelector('.services-content');
    const platformItems = document.querySelectorAll('.platform-item');
    
    if (marketingContent) {
        marketingContent.classList.add('slide-in-left');
        observer.observe(marketingContent);
    }
    
    if (servicesContent) {
        servicesContent.classList.add('slide-in-right');
        observer.observe(servicesContent);
    }
    
    // Animate platform items with stagger
    platformItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

// Add interactive effects
function addInteractiveEffects() {
    const platformItems = document.querySelectorAll('.platform-item');
    const images = document.querySelectorAll('.workspace-img, .mobile-img');
    
    // Platform items hover effects
    platformItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click effect
        item.addEventListener('click', function() {
            const platformName = this.querySelector('.platform-heading').textContent;
            showPlatformDetails(platformName);
        });
        
        // Add keyboard support
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Image hover effects
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Show platform details
function showPlatformDetails(platformName) {
    const platformInfo = {
        'Facebook': {
            icon: 'fab fa-facebook-f',
            color: '#1877f2',
            stats: ['2.9B+ Monthly Users', 'Best for B2C Marketing', 'High Engagement Rates'],
            features: ['Targeted Advertising', 'Business Pages', 'Analytics Dashboard', 'Messenger Integration']
        },
        'Twitter': {
            icon: 'fab fa-twitter',
            color: '#1da1f2',
            stats: ['450M+ Monthly Users', 'Real-time Engagement', 'Trending Topics'],
            features: ['Tweet Scheduling', 'Hashtag Campaigns', 'Twitter Ads', 'Analytics']
        },
        'Instagram': {
            icon: 'fab fa-instagram',
            color: '#e4405f',
            stats: ['2B+ Monthly Users', 'Visual Content Focus', 'High Engagement'],
            features: ['Stories & Reels', 'Shopping Tags', 'IGTV', 'Influencer Marketing']
        },
        'YouTube': {
            icon: 'fab fa-youtube',
            color: '#ff0000',
            stats: ['2.7B+ Monthly Users', 'Video Content Platform', 'Global Reach'],
            features: ['Video Ads', 'Channel Management', 'Analytics', 'Live Streaming']
        }
    };
    
    const info = platformInfo[platformName];
    if (info) {
        showModal(platformName, info);
    }
}

// Show modal with platform information
function showModal(platformName, info) {
    // Remove existing modal
    const existingModal = document.querySelector('.platform-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'platform-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    <i class="${info.icon}" style="color: ${info.color}"></i>
                    <h2>${platformName} Marketing</h2>
                </div>
                
                <div class="modal-body">
                    <div class="platform-stats">
                        <h3>Platform Statistics</h3>
                        <ul>
                            ${info.stats.map(stat => `<li>${stat}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="platform-features">
                        <h3>Our Services</h3>
                        <div class="features-grid">
                            ${info.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-primary">Get Started</button>
                    <button class="btn-secondary">Learn More</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
        .platform-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .platform-modal .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 20px;
        }
        
        .platform-modal .modal-content {
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 500px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .platform-modal.show .modal-content {
            transform: scale(1);
        }
        
        .platform-modal .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .platform-modal .modal-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
        }
        
        .platform-modal .modal-header i {
            font-size: 2rem;
        }
        
        .platform-modal .modal-header h2 {
            color: #2c3e50;
            margin: 0;
        }
        
        .platform-modal .modal-body h3 {
            color: #34495e;
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        
        .platform-modal .platform-stats {
            margin-bottom: 25px;
        }
        
        .platform-modal .platform-stats ul {
            list-style: none;
            padding: 0;
        }
        
        .platform-modal .platform-stats li {
            padding: 8px 0;
            color: #5a6c7d;
            border-bottom: 1px solid #f1f2f6;
        }
        
        .platform-modal .platform-stats li::before {
            content: "📊";
            margin-right: 10px;
        }
        
        .platform-modal .features-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .platform-modal .feature-tag {
            background: ${info.color};
            color: white;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.85rem;
        }
        
        .platform-modal .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 25px;
        }
        
        .platform-modal .btn-primary,
        .platform-modal .btn-secondary {
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            flex: 1;
        }
        
        .platform-modal .btn-primary {
            background: ${info.color};
            color: white;
        }
        
        .platform-modal .btn-secondary {
            background: transparent;
            color: ${info.color};
            border: 2px solid ${info.color};
        }
        
        .platform-modal .btn-primary:hover,
        .platform-modal .btn-secondary:hover {
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .platform-modal .modal-content {
                padding: 20px;
                margin: 10px;
            }
            
            .platform-modal .modal-actions {
                flex-direction: column;
            }
        }
        </style>
    `;
    
    // Add styles to head
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Add modal to DOM
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.classList.add('show');
    }, 10);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// Add parallax effect
function addParallaxEffect() {
    const images = document.querySelectorAll('.workspace-img, .mobile-img');
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const speed = 0.1;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * speed);
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    }, 10));
}

// Add save button functionality
function addSaveButtonFunctionality() {
    const saveBtn = document.querySelector('.save-btn');
    
    if (saveBtn) {
        // Add pulse animation
        saveBtn.classList.add('pulse');
        
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Change button state
            const icon = this.querySelector('i');
            const text = this.childNodes[2];
            
            if (icon.classList.contains('fas')) {
                icon.classList.remove('fas', 'fa-heart');
                icon.classList.add('far', 'fa-heart');
                text.textContent = ' Save';
                this.style.background = '#95a5a6';
            } else {
                icon.classList.remove('far', 'fa-heart');
                icon.classList.add('fas', 'fa-heart');
                text.textContent = ' Saved';
                this.style.background = '#e74c3c';
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Utility function for debouncing
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

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    const marketingContent = document.querySelector('.marketing-content');
    const servicesContent = document.querySelector('.services-content');
    
    if (window.innerWidth <= 768) {
        if (marketingContent) {
            marketingContent.style.gridTemplateColumns = '1fr';
        }
        if (servicesContent) {
            servicesContent.style.gridTemplateColumns = '1fr';
        }
    } else {
        if (marketingContent) {
            marketingContent.style.gridTemplateColumns = '1fr 1fr';
        }
        if (servicesContent) {
            servicesContent.style.gridTemplateColumns = '1fr 1fr';
        }
    }
}, 250));

// Add smooth scrolling for any internal links
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

// mobile app script

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeAnimations();
    addScrollAnimations();
    addServiceInteractivity();
    addPortfolioInteractivity();
    addMockupAnimations();
    
});

// Initialize loading animations
function initializeAnimations() {
    const sections = document.querySelectorAll('.services-overview, .app-development-section, .app-portfolio-section');
    
    sections.forEach((section, index) => {
        section.classList.add('loading');
        section.style.animationDelay = `${index * 0.3}s`;
    });
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const servicesGrid = document.querySelector('.services-grid');
    const developmentContent = document.querySelector('.development-content');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (servicesGrid) {
        servicesGrid.classList.add('fade-in');
        observer.observe(servicesGrid);
    }
    
    if (developmentContent) {
        developmentContent.classList.add('slide-in-left');
        observer.observe(developmentContent);
    }
    
    if (portfolioGrid) {
        portfolioGrid.classList.add('fade-in');
        observer.observe(portfolioGrid);
    }
}

// Add service interactivity
function addServiceInteractivity() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach((item, index) => {
        // Add staggered entrance animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
        
        // Add click functionality
        item.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            showServiceModal(serviceType);
        });
        
        // Add keyboard support
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Show service modal
function showServiceModal(serviceType) {
    const serviceInfo = {
        'ios': {
            title: 'iOS App Development',
            icon: 'fab fa-apple',
            color: '#667eea',
            description: 'Create stunning iOS applications with native performance and beautiful design.',
            features: ['Swift Programming', 'App Store Optimization', 'iOS Design Guidelines', 'Core Data Integration'],
            technologies: ['Swift', 'Objective-C', 'Xcode', 'Core Data', 'UIKit']
        },
        'android': {
            title: 'Android App Development',
            icon: 'fab fa-android',
            color: '#3d8b37',
            description: 'Build powerful Android applications that reach millions of users worldwide.',
            features: ['Material Design', 'Google Play Store', 'Kotlin Development', 'Firebase Integration'],
            technologies: ['Kotlin', 'Java', 'Android Studio', 'Firebase', 'Material Design']
        },
        'game': {
            title: 'Game Development',
            icon: 'fas fa-gamepad',
            color: '#ee5a24',
            description: 'Develop engaging games for mobile and web platforms with immersive experiences.',
            features: ['2D/3D Graphics', 'Multiplayer Support', 'In-App Purchases', 'Cross-Platform'],
            technologies: ['Unity', 'Unreal Engine', 'C#', 'JavaScript', 'WebGL']
        },
        'vr': {
            title: 'VR/AR App Development',
            icon: 'fas fa-vr-cardboard',
            color: '#6c5ce7',
            description: 'Create immersive virtual and augmented reality experiences.',
            features: ['3D Modeling', 'Motion Tracking', 'Spatial Audio', 'Hand Gestures'],
            technologies: ['Unity 3D', 'ARKit', 'ARCore', 'Oculus SDK', 'WebXR']
        }
    };
    
    const info = serviceInfo[serviceType];
    if (info) {
        createModal(info);
    }
}

// Create and show modal
function createModal(info) {
    // Remove existing modal
    const existingModal = document.querySelector('.service-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    <div class="modal-icon" style="background: ${info.color}">
                        <i class="${info.icon}"></i>
                    </div>
                    <h2>${info.title}</h2>
                </div>
                
                <div class="modal-body">
                    <p class="modal-description">${info.description}</p>
                    
                    <div class="modal-features">
                        <h3>Key Features</h3>
                        <ul>
                            ${info.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-technologies">
                        <h3>Technologies</h3>
                        <div class="tech-tags">
                            ${info.technologies.map(tech => `<span class="tech-tag" style="background: ${info.color}">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-primary" style="background: ${info.color}">Get Quote</button>
                    <button class="btn-secondary">Learn More</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    addModalStyles();
    
    // Add modal to DOM
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// Add modal styles
function addModalStyles() {
    if (document.querySelector('#modal-styles')) return;
    
    const modalStyles = document.createElement('style');
    modalStyles.id = 'modal-styles';
    modalStyles.textContent = `
        .service-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .service-modal .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 20px;
        }
        
        .service-modal .modal-content {
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 500px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .service-modal .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .service-modal .modal-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
        }
        
        .service-modal .modal-icon {
            width: 50px;
            height: 50px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .service-modal .modal-icon i {
            color: white;
            font-size: 1.5rem;
        }
        
        .service-modal .modal-header h2 {
            color: #2c3e50;
            margin: 0;
        }
        
        .service-modal .modal-description {
            color: #5a6c7d;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        
        .service-modal .modal-features,
        .service-modal .modal-technologies {
            margin-bottom: 20px;
        }
        
        .service-modal h3 {
            color: #34495e;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }
        
        .service-modal ul {
            list-style: none;
            padding: 0;
        }
        
        .service-modal li {
            padding: 5px 0;
            color: #5a6c7d;
        }
        
        .service-modal li::before {
            content: "✓";
            color: #27ae60;
            font-weight: bold;
            margin-right: 10px;
        }
        
        .service-modal .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .service-modal .tech-tag {
            color: white;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.85rem;
        }
        
        .service-modal .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 25px;
        }
        
        .service-modal .btn-primary,
        .service-modal .btn-secondary {
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            flex: 1;
        }
        
        .service-modal .btn-primary {
            color: white;
        }
        
        .service-modal .btn-secondary {
            background: transparent;
            color: #666;
            border: 2px solid #ddd;
        }
        
        .service-modal .btn-primary:hover,
        .service-modal .btn-secondary:hover {
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .service-modal .modal-content {
                padding: 20px;
                margin: 10px;
            }
            
            .service-modal .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
}

// Add portfolio interactivity
function addPortfolioInteractivity() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        // Add staggered entrance animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
        
        // Add click functionality
        item.addEventListener('click', function() {
            const appType = this.querySelector('.portfolio-overlay h3').textContent;
            showAppDetails(appType);
        });
        
        // Add keyboard support
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Show app details
function showAppDetails(appType) {
    alert(`Learn more about ${appType} development. Contact us for a detailed consultation!`);
}

// Add mockup animations
function addMockupAnimations() {
    const mockups = document.querySelectorAll('.app-mockup');
    
    // Add floating animation
    mockups.forEach((mockup, index) => {
        setInterval(() => {
            if (!mockup.matches(':hover')) {
                const offset = Math.sin(Date.now() * 0.001 + index) * 10;
                mockup.style.transform = `translateY(${offset}px)`;
            }
        }, 50);
    });
    
    // Add parallax effect on scroll
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        
        mockups.forEach((mockup, index) => {
            const rect = mockup.getBoundingClientRect();
            const speed = 0.1 + (index * 0.05);
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * speed);
                mockup.style.transform = `translateY(${yPos}px)`;
            }
        });
    }, 10));
}

// Utility function for debouncing
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

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    const servicesGrid = document.querySelector('.services-grid');
    const developmentContent = document.querySelector('.development-content');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (window.innerWidth <= 768) {
        if (servicesGrid) {
            servicesGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }
        if (developmentContent) {
            developmentContent.style.gridTemplateColumns = '1fr';
        }
        if (portfolioGrid) {
            portfolioGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }
    } else if (window.innerWidth <= 480) {
        if (servicesGrid) {
            servicesGrid.style.gridTemplateColumns = '1fr';
        }
        if (portfolioGrid) {
            portfolioGrid.style.gridTemplateColumns = '1fr';
        }
    }
}, 250));

// Add smooth scrolling for any internal links
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

// combo pacakge javascript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeAnimations();
    addScrollAnimations();
    addInteractiveEffects();
    addContactFunctionality();
    addParallaxEffects();
    
});

// Initialize loading animations
function initializeAnimations() {
    const sections = document.querySelectorAll('.silver-combo-section, .bronze-combo-section');
    
    sections.forEach((section, index) => {
        section.classList.add('loading');
        section.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Staggered animation for service items
    const serviceItems = document.querySelectorAll('.service-list li');
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '0.9';
            item.style.transform = 'translateX(0)';
        }, 100 + (index * 50));
    });
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on element
                if (entry.target.classList.contains('package-card')) {
                    animatePackageCard(entry.target);
                } else if (entry.target.classList.contains('services-grid')) {
                    animateServicesGrid(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const packageCards = document.querySelectorAll('.package-card');
    const servicesGrids = document.querySelectorAll('.services-grid');
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    packageCards.forEach(card => {
        card.classList.add('slide-in-left');
        observer.observe(card);
    });
    
    servicesGrids.forEach(grid => {
        grid.classList.add('slide-in-right');
        observer.observe(grid);
    });
    
    contactButtons.forEach(btn => {
        btn.classList.add('fade-in');
        observer.observe(btn);
    });
}

// Animate package card
function animatePackageCard(card) {
    const price = card.querySelector('.package-price');
    const originalPrice = price.textContent;
    const numericPrice = parseInt(originalPrice.replace('$', ''));
    
    // Animate price counting up
    let currentPrice = 0;
    const increment = Math.ceil(numericPrice / 50);
    
    const priceAnimation = setInterval(() => {
        currentPrice += increment;
        if (currentPrice >= numericPrice) {
            currentPrice = numericPrice;
            clearInterval(priceAnimation);
        }
        price.textContent = '$' + currentPrice;
    }, 30);
}

// Animate services grid
function animateServicesGrid(grid) {
    const serviceItems = grid.querySelectorAll('.service-list li');
    
    serviceItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Add interactive effects
function addInteractiveEffects() {
    // Package card hover effects
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Service list item hover effects
    const serviceItems = document.querySelectorAll('.service-list li');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = '#ec4899';
            this.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '#ffffff';
            this.style.opacity = '0.9';
        });
    });
    
    // Contact item click effects
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactValue = this.querySelector('.contact-value').textContent;
            
            if (contactValue.includes('(831)')) {
                // Phone number clicked
                window.location.href = 'tel:+18312311755';
            } else if (contactValue.includes('Live Chat')) {
                // Live chat clicked
                openLiveChat();
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Add contact functionality
function addContactFunctionality() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.closest('.silver-combo-section, .bronze-combo-section');
            const packageType = section.classList.contains('silver-combo-section') ? 'Silver' : 'Bronze';
            
            showContactModal(packageType);
            
            // Add click animation
            this.style.transform = 'translateY(-1px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1)';
            }, 150);
        });
        
        // Add keyboard support
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Show contact modal
function showContactModal(packageType) {
    // Remove existing modal
    const existingModal = document.querySelector('.contact-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    <h2>Contact Us - ${packageType} Package</h2>
                    <p>Get started with your ${packageType} combo package today!</p>
                </div>
                
                <div class="modal-body">
                    <form class="contact-form">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="company">Company Name</label>
                            <input type="text" id="company" name="company">
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Project Details</label>
                            <textarea id="message" name="message" rows="4" placeholder="Tell us about your project requirements..."></textarea>
                        </div>
                        
                        <div class="package-summary">
                            <h3>${packageType} Package - ${packageType === 'Silver' ? '$999' : '$699'}</h3>
                            <p class="discount-text">20% OFF on your next order!</p>
                        </div>
                        
                        <button type="submit" class="submit-btn">Get Started Now</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    addModalStyles();
    
    // Add modal to DOM
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const form = modal.querySelector('.contact-form');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(form, packageType);
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// Handle form submission
function handleFormSubmission(form, packageType) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            showSuccessMessage(packageType);
            document.querySelector('.contact-modal').remove();
        }, 1500);
    }, 2000);
}

// Show success message
function showSuccessMessage(packageType) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>We've received your inquiry for the ${packageType} package.</p>
            <p>Our team will contact you within 24 hours.</p>
        </div>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 5000);
}

// Open live chat
function openLiveChat() {
    // Simulate opening live chat
    alert('Live chat feature would open here. Contact us at (831) 231-1755 for immediate assistance!');
}

// Add modal styles
function addModalStyles() {
    if (document.querySelector('#modal-styles')) return;
    
    const modalStyles = document.createElement('style');
    modalStyles.id = 'modal-styles';
    modalStyles.textContent = `
        .contact-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .contact-modal .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 20px;
        }
        
        .contact-modal .modal-content {
            background: linear-gradient(135deg, #1a1a1a, #2d1b69);
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            color: white;
        }
        
        .contact-modal .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #ec4899;
        }
        
        .contact-modal .modal-header {
            text-align: center;
            margin-bottom: 25px;
        }
        
        .contact-modal .modal-header h2 {
            color: #ec4899;
            margin-bottom: 10px;
        }
        
        .contact-modal .form-group {
            margin-bottom: 20px;
        }
        
        .contact-modal label {
            display: block;
            margin-bottom: 5px;
            color: #ec4899;
            font-weight: 600;
        }
        
        .contact-modal input,
        .contact-modal textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid rgba(236, 72, 153, 0.3);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 14px;
        }
        
        .contact-modal input:focus,
        .contact-modal textarea:focus {
            outline: none;
            border-color: #ec4899;
            box-shadow: 0 0 10px rgba(236, 72, 153, 0.3);
        }
        
        .contact-modal .package-summary {
            background: rgba(236, 72, 153, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
        }
        
        .contact-modal .package-summary h3 {
            color: #ec4899;
            margin-bottom: 5px;
        }
        
        .contact-modal .discount-text {
            color: #10b981;
            font-weight: 600;
        }
        
        .contact-modal .submit-btn {
            width: 100%;
            background: linear-gradient(135deg, #ec4899, #8b5cf6);
            color: white;
            border: none;
            padding: 15px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .contact-modal .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(236, 72, 153, 0.4);
        }
        
        .contact-modal .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .success-content {
            text-align: center;
        }
        
        .success-content i {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        
        .success-content h3 {
            margin-bottom: 10px;
        }
        
        .success-content p {
            margin-bottom: 5px;
            font-size: 14px;
        }
        
        @media (max-width: 768px) {
            .contact-modal .modal-content {
                padding: 20px;
                margin: 10px;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
}

// Add parallax effects
function addParallaxEffects() {
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        const backgrounds = document.querySelectorAll('.combo-background');
        
        backgrounds.forEach(bg => {
            const speed = 0.5;
            bg.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 10));
}

// Utility function for debouncing
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

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    const comboContents = document.querySelectorAll('.combo-content');
    
    comboContents.forEach(content => {
        if (window.innerWidth <= 1024) {
            content.style.gridTemplateColumns = '1fr';
        } else if (content.classList.contains('bronze-content')) {
            content.style.gridTemplateColumns = '2fr 1fr';
        } else {
            content.style.gridTemplateColumns = '1fr 2fr';
        }
    });
}, 250));


// contact us page javascript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeAnimations();
    addScrollAnimations();
    addContactCardInteractivity();
    addFormFunctionality();
    addFormValidation();
    
});

// Initialize loading animations
function initializeAnimations() {
    const sections = document.querySelectorAll('.contact-info-section, .contact-form-section');
    
    sections.forEach((section, index) => {
        section.classList.add('loading-animation');
        section.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Staggered animation for contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 200));
    });
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations
                if (entry.target.classList.contains('contact-cards-grid')) {
                    animateContactCards(entry.target);
                } else if (entry.target.classList.contains('contact-form-container')) {
                    animateFormContainer(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const contactCardsGrid = document.querySelector('.contact-cards-grid');
    const formContainer = document.querySelector('.contact-form-container');
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    if (contactCardsGrid) {
        contactCardsGrid.classList.add('fade-in');
        observer.observe(contactCardsGrid);
    }
    
    if (formContainer) {
        formContainer.classList.add('slide-in-up');
        observer.observe(formContainer);
    }
    
    sectionHeaders.forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });
}

// Animate contact cards
function animateContactCards(grid) {
    const cards = grid.querySelectorAll('.contact-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
        }, index * 150);
    });
}

// Animate form container
function animateFormContainer(container) {
    const formElements = container.querySelectorAll('.form-group, .form-header, .submit-btn');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

// Add contact card interactivity
function addContactCardInteractivity() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Click functionality
        card.addEventListener('click', function() {
            if (this.classList.contains('phone-card')) {
                handlePhoneClick();
            } else if (this.classList.contains('email-card')) {
                handleEmailClick();
            } else if (this.classList.contains('location-card')) {
                handleLocationClick();
            }
            
            // Click animation
            this.style.transform = 'translateY(-10px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }, 150);
        });
    });
    
    // Location button specific functionality
    const locationBtn = document.querySelector('.location-btn');
    if (locationBtn) {
        locationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            handleLocationClick();
        });
    }
}

// Handle phone click
function handlePhoneClick() {
    const phoneNumbers = ['tel:+13213738440', 'tel:+17792022021'];
    
    // Create phone selection modal
    const modal = createPhoneModal(phoneNumbers);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

// Create phone modal
function createPhoneModal(phoneNumbers) {
    const modal = document.createElement('div');
    modal.className = 'phone-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>Choose Phone Number</h3>
                <div class="phone-options">
                    <a href="${phoneNumbers[0]}" class="phone-option">
                        <i class="fas fa-phone"></i>
                        <span>(321) 3738 440</span>
                    </a>
                    <a href="${phoneNumbers[1]}" class="phone-option">
                        <i class="fas fa-phone"></i>
                        <span>+1 779 202 2021</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    addPhoneModalStyles();
    
    // Add close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(modal);
    });
    
    return modal;
}

// Handle email click
function handleEmailClick() {
    window.location.href = 'mailto:info@delogostudio.com';
    showNotification('Opening email client...', 'info');
}

// Handle location click
function handleLocationClick() {
    const address = 'Princeton, TX';
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
    showNotification('Opening location in Google Maps...', 'info');
}

// Add form functionality
function addFormFunctionality() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            handleFormSubmission();
        }
    });
    
    // Add input animations
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.15)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
}

// Add form validation
function addFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    removeFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-$$$$]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    if (!isValid) {
        field.style.borderColor = '#ef4444';
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    field.parentElement.appendChild(errorElement);
    
    setTimeout(() => {
        errorElement.style.opacity = '1';
    }, 10);
}

// Remove field error
function removeFieldError(field) {
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Validate entire form
function validateForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Check reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        showNotification('Please complete the reCAPTCHA verification', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Handle form submission
function handleFormSubmission() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        form.reset();
        grecaptcha.reset();
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Add success animation to form
        const formContent = document.querySelector('.form-content');
        formContent.style.transform = 'scale(1.02)';
        setTimeout(() => {
            formContent.style.transform = 'scale(1)';
        }, 200);
        
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `${type}-message`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Close modal
function closeModal(modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// Add phone modal styles
function addPhoneModalStyles() {
    if (document.querySelector('#phone-modal-styles')) return;
    
    const modalStyles = document.createElement('style');
    modalStyles.id = 'phone-modal-styles';
    modalStyles.textContent = `
        .phone-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .phone-modal .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 20px;
        }
        
        .phone-modal .modal-content {
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 400px;
            width: 100%;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            text-align: center;
        }
        
        .phone-modal .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .phone-modal h3 {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 1.5rem;
        }
        
        .phone-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .phone-option {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: linear-gradient(135deg, #8b5cf6, #ec4899);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        
        .phone-option:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
        }
        
        .phone-option i {
            font-size: 1.2rem;
        }
        
        .phone-option span {
            font-size: 1.1rem;
            font-weight: 600;
        }
    `;
    
    document.head.appendChild(modalStyles);
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    const contactCardsGrid = document.querySelector('.contact-cards-grid');
    const formRows = document.querySelectorAll('.form-row');
    
    if (window.innerWidth <= 768) {
        formRows.forEach(row => {
            row.style.gridTemplateColumns = '1fr';
        });
    } else {
        formRows.forEach(row => {
            row.style.gridTemplateColumns = '1fr 1fr';
        });
    }
}, 250));

// Utility function for debouncing
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

// Add smooth scrolling for any internal links
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