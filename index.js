window.addEventListener('load', function() {
    const load = document.getElementById('load');
    const ttxt = document.getElementById('ttext');
    const txts = [
        "Loading.."
    ];
    let txi = 0;
    let chi = 0;
    let isd = false;
    function typeEffect() {
        const currentText = txts[txi];
        if (isd) {
            ttxt.textContent = currentText.substring(0, chi - 1);
            chi--;
        } else {
            ttxt.textContent = currentText.substring(0, chi + 1);
            chi++;
        }
        if (!isd && chi === currentText.length) {
            isd = true;
            setTimeout(typeEffect, 1500);
        } else if (isd && chi === 0) {
            isd = false;
            txi = (txi + 1) % txts.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isd ? 30 : 100);
        }
    }
    setTimeout(() => {
        typeEffect();
        setTimeout(() => {
            load.classList.add('fade');
            setTimeout(() => {
                load.style.display = 'none';
                document.body.style.overflow = 'auto';
                initPortfolio();
            }, 600);
        }, 3500);
    }, 500);
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            particlesContainer.appendChild(particle);
        }
    }
    initParticles();
});
function initGradient() {
    const canvas = document.getElementById('gradient-canvas');
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    function createGradient() {
        const gradient = ctx.createRadialGradient(
            canvas.width * 0.8,
            canvas.height * 0.2,
            0,
            canvas.width * 0.8,
            canvas.height * 0.2,
            Math.max(canvas.width, canvas.height) * 0.8
        );
        gradient.addColorStop(0, 'rgba(0, 34, 51, 0.8)');
        gradient.addColorStop(0.5, 'rgba(0, 17, 26, 0.4)');
        gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function animate() {
        createGradient();
        requestAnimationFrame(animate);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
}
function initPortfolio() {
    initGradient();
    const menu = document.querySelector('.menu');
    const nlist = document.querySelector('.nlist');
    if (menu) {
        menu.addEventListener('click', function() {
            menu.classList.toggle('act');
            nlist.classList.toggle('act');
        });
    }
    document.querySelectorAll('.nitem').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('act');
            nlist.classList.remove('act');
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    const skillsData = [
        {
            id: 1,
            name: "HTML",
            icon: "fab fa-html5",
            type: "Markup Language",
            level: "Advanced",
            percentage: 80,
            description: "Creating the website",
        },
        {
            id: 2,
            name: "CSS",
            icon: "fab fa-css3-alt",
            type: "Styling Language",
            level: "Intermediate",
            percentage: 70,
            description: "Making things look good and work on any device",
        },
        {
            id: 3,
            name: "JavaScript",
            icon: "fab fa-js",
            type: "Programming Language",
            level: "Beginner",
            percentage: 35,
            description: "Adding functionality and websites that work",
        }
    ];
    const sgrid = document.getElementById('sgrid');
    if (sgrid) {
        skillsData.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'sitem';
            skillElement.dataset.id = skill.id;
            skillElement.innerHTML = `
                <div class="sicon">
                    <i class="${skill.icon}"></i>
                </div>
                <div class="sinfo">
                    <h4>${skill.name}</h4>
                    <div class="slev">${skill.level}</div>
                </div>
            `;
            sgrid.appendChild(skillElement);
            skillElement.addEventListener('click', function() {
                document.querySelectorAll('.sitem').forEach(item => {
                    item.classList.remove('act');
                });
                this.classList.add('act');
                updateSkillDetails(skill);
            });
        });
        if (skillsData.length > 0) {
            document.querySelector('.sitem').classList.add('act');
            updateSkillDetails(skillsData[0]);
        }
    }
    function updateSkillDetails(skill) {
        document.getElementById('sicon').innerHTML = `
            <i class="${skill.icon}"></i>
            <div class="sicon-glow"></div>
        `;
        document.getElementById('sname').textContent = skill.name;
        document.getElementById('stype').textContent = skill.type;
        document.getElementById('plev').textContent = skill.level;
        document.getElementById('pper').textContent = skill.percentage + '%';
        document.getElementById('pfill').style.width = skill.percentage + '%';
        document.getElementById('sdesc').textContent = skill.description;
    }
    function animateProgressBars() {
        const progressItems = document.querySelectorAll('.litem');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFill = entry.target.querySelector('.pfill');
                    const currentWidth = progressFill.style.width;
                    progressFill.style.width = '0%';
                    setTimeout(() => {
                        progressFill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        progressFill.style.width = currentWidth;
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        progressItems.forEach(item => observer.observe(item));
    }
    animateProgressBars();
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nitem');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            item.classList.remove('act');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('act');
            }
        });
        const header = document.querySelector('.head');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        section.classList.add('anim');
        sectionObserver.observe(section);
    });
    const testimonialsData = [
        {
            id: 1,
            text: "This boy is really talented at what he does. He's the guy you go to when you need anything complex or highly functional. 10/10 for sure.",
            name: "Lucas",
            role: "Friend",
            emoji: "👨‍💻"
        },
        {
            id: 2,
            text: "Personally, I'd rate it 7/10 for design - just my personal opinion. But in terms of functionality, it's a 10/10. It's really good.",
            name: "Jamie",
            role: "Friend",
            emoji: "🎨"
        },
        {
            id: 3,
            text: "9/10, because when you think about it you're only 16 and you can already do stuff like this",
            name: "Kacper",
            role: "Friend",
            emoji: "🌟"
        },
        {
            id: 4,
            text: "This young guy's website is packed with love, fun, sweat and pure passion. It's a strong 9 out of 10 overall. Go check him out!",
            name: "Arseny",
            role: "Friend",
            emoji: "🔥"
        },
        {
            id: 5,
            text: "Nathan's got a passion for programming, ever since I have known him he has always been programming something. He's very talented, especially for only 16 years of age. 10/10",
            name: "Jake",
            role: "Friend",
            emoji: "💯"
        }
    ];
    const rslide = document.getElementById('rslide');
    if (rslide) {
        testimonialsData.forEach((testimonial, index) => {
            const card = document.createElement('div');
            card.className = 'rcard';
            const avatarLetter = testimonial.name.charAt(0);
            card.innerHTML = `
                <div class="rbub">
                    <p class="rtext">${testimonial.text}</p>
                </div>
                <div class="rinfo">
                    <div class="ravat">${avatarLetter}</div>
                    <div class="rdet">
                        <h4>${testimonial.name}</h4>
                        <div class="rrole">${testimonial.role}</div>
                    </div>
                </div>
            `;
            rslide.appendChild(card);
        });
        const slideContent = rslide.innerHTML;
        rslide.innerHTML += slideContent;
        const prevBtn = document.querySelector('.slider-btn.prev');
        const nextBtn = document.querySelector('.slider-btn.next');
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                rslide.scrollBy({ left: -400, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                rslide.scrollBy({ left: 400, behavior: 'smooth' });
            });
        }
        let autoScrollInterval;
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                rslide.scrollBy({ left: 400, behavior: 'smooth' });
                if (rslide.scrollLeft + rslide.clientWidth >= rslide.scrollWidth / 2) {
                    rslide.scrollLeft = 0;
                }
            }, 4000);
        }
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        rslide.addEventListener('mouseenter', stopAutoScroll);
        rslide.addEventListener('mouseleave', startAutoScroll);
        startAutoScroll();
    }
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
                backToTop.style.transform = 'translateY(10px)';
            }
        });
    }
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.className = 'ripple';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflow = 'hidden';
});