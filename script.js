document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    const body = document.body;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Prevent scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 2. Hide Navbar on Scroll Down, Show on Scroll Up
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            if (navbar) navbar.classList.add('hidden');
        } else {
            if (navbar) navbar.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });

    // 3. Highlight Active Navigation Item Based on URL
    const highlightActiveNav = () => {
        const path = window.location.pathname;
        const pageName = path.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(link => {
            const href = link.getAttribute('href');
            // Check if pageName matches the href target, defaulting to index.html for root path
            if (href === pageName || (pageName === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    highlightActiveNav();

    // 4. Fade-in on Scroll using Intersection Observer
    const setupIntersectionObserver = () => {
        const fadeElements = document.querySelectorAll('.fade-in, .featured-card, .project-card, .contact-detail-card, .contact-form');
        
        const appearOptions = {
            threshold: 0.05,
            rootMargin: "0px 0px -30px 0px"
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        fadeElements.forEach(el => {
            appearOnScroll.observe(el);
        });
    };

    // 5. Smooth Anchor Scrolling (For same-page references)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Dynamic Projects Rendering & Filtering (Page Specific)
    function getLinkIcon(linkLabel) {
        if (linkLabel === 'Visit Website') {
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>`;
        } else if (linkLabel === 'Get on Play Store' || (linkLabel && linkLabel.toLowerCase().includes('play store'))) {
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
        } else {
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;
        }
    }

    function renderFeaturedSystems() {
        const container = document.getElementById('featured-container');
        if (!container || typeof projectsData === 'undefined') return;
        
        const featured = projectsData.filter(p => p.featured);
        
        container.innerHTML = featured.map(p => {
            const badgeLabel = p.category === 'iot' ? 'IoT & Embedded' : p.category === 'website' ? 'Web Development' : 'Hobby & Labs';
            const badgeClass = p.category;
            
            let buttonHTML = '';
            if (p.status === 'private') {
                buttonHTML = `
                    <span class="btn btn-github private">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 2v10"></path></svg>
                        <span>Private Repository</span>
                    </span>
                `;
            } else {
                const btnLabel = p.linkLabel || 'Source Code';
                const linkIcon = getLinkIcon(btnLabel);
                buttonHTML = `
                    <a href="${p.link}" target="_blank" class="btn btn-github">
                        ${linkIcon}
                        <span>${btnLabel}</span>
                    </a>
                `;
            }

            let archHTML = '';
            if (p.architecture) {
                archHTML = `
                    <div class="featured-visual">
                        <div class="featured-arch">
                            <div class="arch-header">System Architecture</div>
                            <pre class="arch-code"><code>${p.architecture}</code></pre>
                        </div>
                    </div>
                `;
            }

            return `
                <div class="featured-card category-${p.category} fade-in">
                    <div class="featured-content">
                        <div class="featured-badge badge-${badgeClass}">${badgeLabel}</div>
                        <h3 class="featured-title">${p.title}</h3>
                        <p class="featured-desc">${p.description}</p>
                        <div class="featured-buttons">
                            ${buttonHTML}
                        </div>
                    </div>
                    ${archHTML}
                </div>
            `;
        }).join('');
    }

    function renderProjectGrid(filter = 'all') {
        const container = document.getElementById('project-grid-container');
        if (!container || typeof projectsData === 'undefined') return;

        const filtered = projectsData.filter(p => {
            if (p.featured) return false; // Exclude featured systems from standard grids
            if (filter === 'all') return true;
            return p.category === filter;
        });

        if (filtered.length === 0) {
            container.innerHTML = `<div class="no-projects">No projects found in this category.</div>`;
            return;
        }

        container.innerHTML = filtered.map((p, idx) => {
            let iconSVG = '';
            let categoryLabel = '';
            
            if (p.category === 'website') {
                categoryLabel = 'Website';
                iconSVG = `<svg class="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect><line x1="2" y1="8" x2="22" y2="8"></line><line x1="6" y1="13" x2="6.01" y2="13"></line><line x1="10" y1="13" x2="10.01" y2="13"></line></svg>`;
            } else if (p.category === 'iot') {
                categoryLabel = 'IoT & Embedded';
                iconSVG = `<svg class="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`;
            } else {
                categoryLabel = 'Hobby & Labs';
                iconSVG = `<svg class="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
            }

            const tagBadges = p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
            const buttonText = p.linkLabel || (p.status === 'private' ? 'Private' : 'Source Code');
            
            let buttonHTML = '';
            if (p.status === 'private') {
                buttonHTML = `
                    <span class="btn btn-github private">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 2v10"></path></svg>
                        <span>${buttonText}</span>
                    </span>
                `;
            } else {
                const linkIcon = getLinkIcon(p.linkLabel);
                buttonHTML = `
                    <a href="${p.link}" target="_blank" class="btn btn-github">
                        ${linkIcon}
                        <span>${buttonText}</span>
                    </a>
                `;
            }

            return `
                <div class="project-card category-${p.category} fade-in-card" style="animation-delay: ${idx * 0.05}s">
                    <div class="card-top">
                        <span class="card-number">${p.index}</span>
                        <span class="card-category-indicator" title="${categoryLabel}">${iconSVG}</span>
                    </div>
                    <h3>${p.title}</h3>
                    <div class="card-bar"></div>
                    <p class="card-desc">${p.description}</p>
                    <div class="project-tech">
                        ${tagBadges}
                    </div>
                    <div class="project-links">
                        ${buttonHTML}
                    </div>
                </div>
            `;
        }).join('');

        setTimeout(() => {
            const cards = container.querySelectorAll('.project-card');
            cards.forEach(card => card.classList.add('is-visible'));
        }, 50);
    }

    function updateCategoryCounts() {
        const container = document.getElementById('project-grid-container');
        if (!container || typeof projectsData === 'undefined') return;
        
        const counts = {
            all: 0,
            website: 0,
            iot: 0,
            hobby: 0
        };

        projectsData.forEach(p => {
            if (p.featured) return;
            counts.all++;
            if (counts[p.category] !== undefined) {
                counts[p.category]++;
            }
        });

        const elAll = document.getElementById('count-all');
        const elWeb = document.getElementById('count-website');
        const elIot = document.getElementById('count-iot');
        const elHobby = document.getElementById('count-hobby');

        if (elAll) elAll.textContent = counts.all;
        if (elWeb) elWeb.textContent = counts.website;
        if (elIot) elIot.textContent = counts.iot;
        if (elHobby) elHobby.textContent = counts.hobby;
    }

    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const category = btn.getAttribute('data-filter');
                
                const container = document.getElementById('project-grid-container');
                if (container) {
                    container.style.opacity = '0';
                    container.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        renderProjectGrid(category);
                        container.style.opacity = '1';
                        container.style.transform = 'translateY(0)';
                    }, 200);
                }
            });
        });
    }

    // 7. Interactive Form Mockup Logic (Contact Page Specific)
    const setupContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        const feedback = document.getElementById('form-feedback');
        
        if (contactForm && feedback) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const nameVal = document.getElementById('name').value;
                
                // Show dynamic success toast/message
                feedback.innerHTML = `
                    <div class="feedback-card success-feedback">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" class="success-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <div>
                            <h4>Message Logged Successfully</h4>
                            <p>Thank you, <strong>${nameVal}</strong>! As this is a static showcase site, your message was saved client-side. Please reach out directly via <a href="mailto:mauryashh@gmail.com">mauryashh@gmail.com</a>.</p>
                        </div>
                    </div>
                `;
                
                contactForm.reset();
                feedback.classList.add('visible');
            });
        }
    };

    // Run Initializers
    if (typeof projectsData !== 'undefined') {
        renderFeaturedSystems();
        renderProjectGrid('all');
        updateCategoryCounts();
        setupFilters();
    }
    setupContactForm();
    setupIntersectionObserver();

    // 8. Interactive Embers Particle Animation (Runs Globally)
    const canvas = document.getElementById('embers-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        
        let mouse = { x: null, y: null, radius: 120 };

        const resizeCanvas = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });
        
        const particles = [];
        const getParticleCount = () => {
            return Math.min(200, Math.floor(width / 7.5));
        };
        
        let maxParticles = getParticleCount();
        
        class EmberParticle {
            constructor(initAnywhere = false) {
                this.reset(initAnywhere);
            }
            
            reset(initAnywhere = false) {
                this.size = Math.random() * 2.0 + 0.6;
                this.x = Math.random() * width;
                this.y = initAnywhere ? Math.random() * height : height + Math.random() * 30 + 10;
                
                this.vy = Math.random() * 1.0 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.2;
                
                this.alpha = Math.random() * 0.3 + 0.5;
                
                const lifeFactor = Math.random() * 0.6 + 0.7;
                this.fadeSpeed = (this.vy / height) * lifeFactor;
                
                this.driftAngle = Math.random() * Math.PI * 2;
                this.driftSpeed = Math.random() * 0.01 + 0.005;
            }
            
            update() {
                this.y -= this.vy;
                this.driftAngle += this.driftSpeed;
                
                let moveX = this.vx + Math.sin(this.driftAngle) * 0.15;
                let moveY = 0;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const dirX = dx / distance;
                        const dirY = dy / distance;
                        
                        const pushStrength = force * 2.0;
                        moveX += dirX * pushStrength;
                        moveY += dirY * pushStrength * 0.5;
                    }
                }
                
                this.x += moveX;
                this.y += moveY;
                
                this.alpha -= this.fadeSpeed;
                
                if (this.y < -10 || this.alpha <= 0 || this.x < -10 || this.x > width + 10) {
                    this.reset(false);
                }
            }
            
            draw() {
                const pct = Math.max(0, Math.min(1, 1 - (this.y / height)));
                
                let r, g, b;
                if (pct < 0.3) {
                    const t = pct / 0.3;
                    r = 245;
                    g = Math.floor(190 - t * 60);
                    b = Math.floor(70 - t * 40);
                } else if (pct < 0.75) {
                    const t = (pct - 0.3) / 0.45;
                    r = Math.floor(245 - t * 65);
                    g = Math.floor(130 - t * 100);
                    b = Math.floor(30 - t * 15);
                } else {
                    const t = (pct - 0.75) / 0.25;
                    r = Math.floor(180 - t * 120);
                    g = Math.floor(30 - t * 15);
                    b = Math.floor(15 + t * 10);
                }
                
                ctx.beginPath();
                ctx.globalAlpha = Math.max(0, this.alpha);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
                
                if (this.size > 1.8 && pct < 0.6) {
                    ctx.shadowBlur = this.size * 1.2;
                    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.35)`;
                } else {
                    ctx.shadowBlur = 0;
                }
                
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        const initParticles = () => {
            particles.length = 0;
            maxParticles = getParticleCount();
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new EmberParticle(true));
            }
        };
        
        initParticles();
        
        window.addEventListener('resize', () => {
            const currentMax = getParticleCount();
            if (currentMax !== maxParticles) {
                maxParticles = currentMax;
                const diff = maxParticles - particles.length;
                if (diff > 0) {
                    for (let i = 0; i < diff; i++) {
                        particles.push(new EmberParticle(false));
                    }
                } else if (diff < 0) {
                    particles.splice(maxParticles);
                }
            }
        });
        
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
});
