/**
 * MAURYA SHAH - EVENT HORIZON DIGITAL EXPERIENCE (REFINED MOTION & READABILITY)
 * Video Background, Lenis Inertia Scroll, GSAP Section Choreography,
 * Minimalist Magnetic Cursor, 3D Glass Card Tilt Physics.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    /* ==========================================================================
       1. PRELOADER ENGINE & VIDEO/AUDIO AUTOPLAY ASSURANCE
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    const percentEl = document.getElementById('preloader-percent');
    const ringFill = document.getElementById('ring-fill');
    const bgVideo = document.getElementById('blackhole-video');
    const bgAudio = document.getElementById('bg-audio');
    const audioToggle = document.getElementById('audio-toggle');

    if (bgVideo) {
        bgVideo.play().catch(err => {
            console.log('Video autoplay deferred:', err);
        });
    }

    // Background Audio Handler (Starts on first click/interaction anywhere on the site)
    let audioStarted = false;

    // Default UI state is SOUND OFF until the user clicks
    updateAudioUI(false);

    function playAudio() {
        if (!bgAudio) return;
        bgAudio.play().then(() => {
            audioStarted = true;
            updateAudioUI(true);
        }).catch(err => {
            console.log('Audio play failed:', err);
            audioStarted = false;
            updateAudioUI(false);
        });
    }

    function updateAudioUI(isPlaying) {
        if (!audioToggle) return;
        const icon = audioToggle.querySelector('.audio-icon');
        const text = audioToggle.querySelector('.audio-text');
        if (isPlaying) {
            if (icon) icon.textContent = '🔊';
            if (text) text.textContent = 'SOUND ON';
            audioToggle.classList.add('playing');
            audioToggle.classList.remove('muted');
        } else {
            if (icon) icon.textContent = '🔇';
            if (text) text.textContent = 'SOUND OFF';
            audioToggle.classList.remove('playing');
            audioToggle.classList.add('muted');
        }
    }

    // Start sound on first click or interaction anywhere on the website
    function startAudioOnFirstInteraction() {
        if (!audioStarted) {
            playAudio();
        }
        window.removeEventListener('click', startAudioOnFirstInteraction);
        window.removeEventListener('keydown', startAudioOnFirstInteraction);
        window.removeEventListener('touchstart', startAudioOnFirstInteraction);
        window.removeEventListener('pointerdown', startAudioOnFirstInteraction);
    }

    window.addEventListener('click', startAudioOnFirstInteraction);
    window.addEventListener('keydown', startAudioOnFirstInteraction);
    window.addEventListener('touchstart', startAudioOnFirstInteraction);
    window.addEventListener('pointerdown', startAudioOnFirstInteraction);

    // Audio Toggle Button Event Listener
    if (audioToggle && bgAudio) {
        audioToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgAudio.paused) {
                playAudio();
            } else {
                bgAudio.pause();
                audioStarted = false;
                updateAudioUI(false);
            }
        });
    }

    let progress = 0;
    const preloaderDuration = 2200; // minimum 2.2 seconds preloader display
    const startTime = Date.now();

    const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        progress = Math.min(100, Math.floor((elapsedTime / preloaderDuration) * 100));

        if (percentEl) percentEl.textContent = `${progress}%`;
        if (ringFill) ringFill.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);

            setTimeout(() => {
                if (preloader) preloader.classList.add('finished');
                document.body.classList.remove('is-loading');
                initHeroChoreography();
                initSectionChoreography();
            }, 300);
        }
    }, 30);

    /* ==========================================================================
       2. LENIS SMOOTH SCROLL & SCROLL LASER TRACKING
       ========================================================================== */
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', (e) => {
                ScrollTrigger.update();
                updateScrollLaser(e.scroll, e.limit);
            });

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0, 0);
        }
    } else {
        window.addEventListener('scroll', () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            updateScrollLaser(window.scrollY, scrollTotal);
        });
    }

    function updateScrollLaser(scroll, limit) {
        const laser = document.getElementById('scroll-laser-line');
        if (laser && limit > 0) {
            const pct = Math.min(100, Math.max(0, (scroll / limit) * 100));
            laser.style.height = `${pct}%`;
        }
    }

    /* ==========================================================================
       3. ELEGANT MINIMAL MAGNETIC CURSOR & CLICK FIXES
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const cursorText = document.getElementById('cursor-text');

    if (cursorDot && cursorRing) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        function renderCursor() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        const magneticTargets = document.querySelectorAll('.magnetic-target');
        magneticTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursorRing.classList.add('is-hovered');
            });

            target.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('is-hovered');
            });
        });

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.project-card')) {
                cursorRing.classList.add('is-project-hover');
                if (cursorText) cursorText.textContent = 'VIEW';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.project-card')) {
                cursorRing.classList.remove('is-project-hover');
                if (cursorText) cursorText.textContent = '';
            }
        });
    }

    // Smooth Lenis Scroll for all Hash Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    if (lenis) {
                        lenis.scrollTo(targetElement, { offset: -60 });
                    } else {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });

    /* ==========================================================================
       4. STATIC GLASS CARDS (TILT MOVEMENT DISABLED)
       ========================================================================== */
    function attachTilt(card) {
        // Card hover tilt movement disabled per user request
        return;
    }

    document.querySelectorAll('.tilt-card').forEach(card => attachTilt(card));

    /* ==========================================================================
       5. INTERACTIVE SKILLS CONSTELLATION CANVAS
       ========================================================================== */
    const skillsCanvas = document.getElementById('skills-canvas');
    if (skillsCanvas) {
        const ctx = skillsCanvas.getContext('2d');
        let width = skillsCanvas.width = skillsCanvas.parentElement.clientWidth;
        let height = skillsCanvas.height = skillsCanvas.parentElement.clientHeight;

        window.addEventListener('resize', () => {
            if (skillsCanvas.parentElement) {
                width = skillsCanvas.width = skillsCanvas.parentElement.clientWidth;
                height = skillsCanvas.height = skillsCanvas.parentElement.clientHeight;
            }
        });

        const skillNodes = [
            { label: 'ESP32', x: width * 0.2, y: height * 0.3, vx: 0.3, vy: -0.2, color: '#C99763' },
            { label: 'C++', x: width * 0.4, y: height * 0.6, vx: -0.2, vy: 0.4, color: '#DDEFFF' },
            { label: 'Python', x: width * 0.7, y: height * 0.4, vx: 0.4, vy: 0.2, color: '#C99763' },
            { label: 'OpenCV', x: width * 0.85, y: height * 0.7, vx: -0.2, vy: -0.3, color: '#DDEFFF' },
            { label: 'BLE', x: width * 0.3, y: height * 0.8, vx: 0.2, vy: -0.2, color: '#D1DCED' },
            { label: 'UDP Video', x: width * 0.6, y: height * 0.2, vx: -0.3, vy: 0.2, color: '#C99763' },
            { label: 'MediaPipe', x: width * 0.15, y: height * 0.65, vx: 0.2, vy: 0.3, color: '#DDEFFF' }
        ];

        let sMouseX = -1000;
        let sMouseY = -1000;

        skillsCanvas.addEventListener('mousemove', (e) => {
            const rect = skillsCanvas.getBoundingClientRect();
            sMouseX = e.clientX - rect.left;
            sMouseY = e.clientY - rect.top;
        });

        skillsCanvas.addEventListener('mouseleave', () => {
            sMouseX = -1000;
            sMouseY = -1000;
        });

        function animateConstellation() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < skillNodes.length; i++) {
                for (let j = i + 1; j < skillNodes.length; j++) {
                    const dx = skillNodes[i].x - skillNodes[j].x;
                    const dy = skillNodes[i].y - skillNodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 180) {
                        ctx.beginPath();
                        ctx.moveTo(skillNodes[i].x, skillNodes[i].y);
                        ctx.lineTo(skillNodes[j].x, skillNodes[j].y);
                        ctx.strokeStyle = `rgba(201, 151, 99, ${0.4 - dist / 350})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            skillNodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 30 || node.x > width - 30) node.vx *= -1;
                if (node.y < 30 || node.y > height - 30) node.vy *= -1;

                const mdx = node.x - sMouseX;
                const mdy = node.y - sMouseY;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mdist < 100) {
                    node.x += (mdx / mdist) * 2;
                    node.y += (mdy / mdist) * 2;
                }

                ctx.beginPath();
                ctx.arc(node.x, node.y, 4.5, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();

                ctx.font = '12px "JetBrains Mono", monospace';
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText(node.label, node.x + 10, node.y + 4);
            });

            requestAnimationFrame(animateConstellation);
        }
        animateConstellation();
    }

    /* ==========================================================================
       6. REFINED CINEMATIC SECTION CHOREOGRAPHY (TAMED INTENSITY ~25%)
       ========================================================================== */
    function initHeroChoreography() {
        if (typeof gsap === 'undefined') return;

        const tl = gsap.timeline();

        tl.fromTo('.hero-anim-1', 
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        )
        .fromTo('.hero-anim-2 .mask-content', 
            { y: '100%', clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
            { y: '0%', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.7, ease: 'power3.out' },
            '-=0.3'
        )
        .fromTo('.hero-anim-2-sub',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.4'
        )
        .fromTo('.hero-anim-3',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
        )
        .fromTo('.hero-anim-4 .tag',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
            '-=0.3'
        )
        .fromTo('.hero-anim-5 .btn',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
            '-=0.2'
        )
        .fromTo('.hero-anim-widget',
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
        );
    }

    function initSectionChoreography() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // ABOUT CHOREOGRAPHY
        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        aboutTl.fromTo('.about-anim-tag',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo('.about-anim-heading .mask-content',
            { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
            { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.7, ease: 'power3.out' },
            '-=0.3'
        )
        .fromTo('.about-anim-card',
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.4'
        )
        .fromTo('.about-anim-stat',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
            '-=0.5'
        );

        // SKILLS CHOREOGRAPHY
        const skillsTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        skillsTl.fromTo('.skills-anim-tag',
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.5 }
        )
        .fromTo('.skills-anim-heading .mask-content',
            { y: '100%' },
            { y: '0%', duration: 0.6, ease: 'power3.out' },
            '-=0.3'
        )
        .fromTo('.skills-anim-canvas',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.3'
        )
        .fromTo('.skills-anim-card',
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' },
            '-=0.4'
        );

        // EXPERIENCE CHOREOGRAPHY
        const expCards = document.querySelectorAll('.exp-anim-card');
        expCards.forEach((card) => {
            gsap.fromTo(card,
                { opacity: 0, y: 25 },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power2.out'
                }
            );
        });

        // PROJECTS CHOREOGRAPHY
        const projTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#projects',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        projTl.fromTo('.proj-anim-tag',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5 }
        )
        .fromTo('.proj-anim-heading .mask-content',
            { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
            { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.7, ease: 'power3.out' },
            '-=0.3'
        )
        .fromTo('.proj-anim-filters .filter-btn',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
            '-=0.4'
        );

        // CONTACT CHOREOGRAPHY
        const contactTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        contactTl.fromTo('.contact-anim-tag',
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.5 }
        )
        .fromTo('.contact-anim-heading .mask-content',
            { y: '100%' },
            { y: '0%', duration: 0.6, ease: 'power3.out' },
            '-=0.3'
        )
        .fromTo('.contact-anim-left',
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.4'
        );
    }

    // Counter animation for stat numbers
    const statCounters = document.querySelectorAll('.count-up');
    statCounters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        let started = false;

        window.addEventListener('scroll', () => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && !started) {
                started = true;
                const timer = setInterval(() => {
                    count += 1;
                    counter.textContent = count;
                    if (count >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    }
                }, 100);
            }
        });
    });

    /* ==========================================================================
       7. MOBILE MENU & NAVIGATION LOGIC
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item, .nav-btn');

    function toggleMenu() {
        if (!hamburger || !navLinks) return;
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Scroll Spy
    const sections = document.querySelectorAll('section[id]');
    function scrollSpy() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-item[href*="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollSpy);

    /* ==========================================================================
       8. PROJECT RENDERING & CATEGORY FILTERS
       ========================================================================== */
    const projectGrid = document.getElementById('project-grid-container');
    const filterButtons = document.querySelectorAll('#project-filters .filter-btn');

    function updateCounts() {
        if (typeof projectsData === 'undefined') return;

        const countAll = document.getElementById('count-all');
        const countIot = document.getElementById('count-iot');
        const countWeb = document.getElementById('count-website');
        const countHobby = document.getElementById('count-hobby');

        if (countAll) countAll.textContent = projectsData.length;
        if (countIot) countIot.textContent = projectsData.filter(p => p.category === 'iot').length;
        if (countWeb) countWeb.textContent = projectsData.filter(p => p.category === 'website').length;
        if (countHobby) countHobby.textContent = projectsData.filter(p => p.category === 'hobby').length;
    }

    function renderProjects(category = 'all') {
        if (!projectGrid || typeof projectsData === 'undefined') return;

        projectGrid.innerHTML = '';

        const filtered = category === 'all' 
            ? projectsData 
            : projectsData.filter(item => item.category === category);

        if (filtered.length === 0) {
            projectGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); font-family: var(--font-mono); padding: 40px 0;">No projects found in this category.</div>`;
            return;
        }

        filtered.forEach((project, idx) => {
            const card = document.createElement('div');
            card.className = 'project-card tilt-card';

            const tagsHtml = project.tags.map(tag => `<span class="ptag">#${tag}</span>`).join('');
            const linkText = project.linkLabel || (project.status === 'private' ? 'Private Repository' : 'View Code ↗');
            const linkHref = project.link || '#';
            const isPrivate = project.status === 'private' && linkHref === '#';

            const archHtml = project.architecture ? `
                <button class="arch-btn magnetic-target" onclick="toggleArch('${project.index}')">Architecture Spec</button>
                <div class="arch-block" id="arch-${project.index}">${project.architecture}</div>
            ` : '';

            card.innerHTML = `
                <div class="glare-overlay"></div>
                <div>
                    <div class="project-card-header">
                        <span class="project-index">// ${project.index}</span>
                        <span class="project-cat-tag">${project.category}</span>
                    </div>
                    <h3 class="project-card-title">${project.title}</h3>
                    <p class="project-card-desc">${project.description}</p>
                    <div class="project-card-tags">${tagsHtml}</div>
                </div>
                <div>
                    ${archHtml}
                    <div class="project-card-footer">
                        ${isPrivate 
                            ? `<span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim);">Private Repo</span>`
                            : `<a href="${linkHref}" target="_blank" rel="noopener" class="project-link magnetic-target">${linkText}</a>`
                        }
                    </div>
                </div>
            `;

            projectGrid.appendChild(card);

            if (typeof gsap !== 'undefined') {
                gsap.fromTo(card,
                    { opacity: 0, y: 25 },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            toggleActions: 'play none none none'
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: (idx % 3) * 0.1,
                        ease: 'power2.out'
                    }
                );
            }

            attachTilt(card);
        });
    }

    window.toggleArch = function(index) {
        const archBlock = document.getElementById(`arch-${index}`);
        if (archBlock) {
            archBlock.classList.toggle('show');
        }
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            renderProjects(filterValue);
        });
    });

    updateCounts();
    renderProjects('all');

    /* ==========================================================================
       9. COPY EMAIL & FORM SUBMISSION
       ========================================================================== */
    const copyBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');

    if (copyBtn && emailText) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailText.textContent.trim()).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'COPIED';
                copyBtn.style.background = 'var(--warm-highlight)';
                copyBtn.style.color = '#05070D';

                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = '';
                    copyBtn.style.color = '';
                }, 2000);
            });
        });
    }

    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (formFeedback) {
                formFeedback.textContent = 'Message received. Thank you for reaching out.';
                formFeedback.style.color = 'var(--warm-highlight)';
            }

            contactForm.reset();

            setTimeout(() => {
                if (formFeedback) formFeedback.textContent = '';
            }, 5000);
        });
    }
});
