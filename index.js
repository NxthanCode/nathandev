window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const typingText = document.getElementById('typingText');
    const texts = [
        "loading..",
        "setting up..",
        "almost ready..",
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    function typeEffect() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    setTimeout(() => {
        typeEffect();
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = `none`;
            }, 500);
        }, 3000);
    }, 500);
});
document.addEventListener('DOMContentLoaded', function() {
    const bars = document.querySelector('.bars');
    const navMenu = document.querySelector('.nav-menu');
    if (bars) {
        bars.addEventListener('click', function() {
            bars.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            bars.classList.remove('active');
            navMenu.classList.remove('active');
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
            category: "Markup Language",
            level: "Advanced",
            percent: 80,
            projects: ["Forced Entry Website", "Portfolio Site"]
        },
        {
            id: 2,
            name: "CSS",
            icon: "fab fa-css3-alt",
            category: "Styling Language",
            level: "Intermediate",
            percent: 70,
            projects: ["Responsive Layouts", "UI Components", "Animations"]
        },
        {
            id: 3,
            name: "JavaScript",
            icon: "fab fa-js",
            category: "Programming Language",
            level: "Beginner",
            percent: 20,
            projects: ["Interactive Websites", "Web Applications", "Dynamic Content"]
        },
    ];
    const skillsGrid = document.getElementById('skillsGrid');
    if (skillsGrid) {
        skillsData.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.dataset.id = skill.id;
            skillElement.innerHTML = `
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <div class="skill-info">
                    <h4>${skill.name}</h4>
                    <div class="skill-level">${skill.level}</div>
                </div>
            `;
            skillsGrid.appendChild(skillElement);
            skillElement.addEventListener('click', function() {
                document.querySelectorAll('.skill-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
                updateSkillDetails(skill);
            });
        });
        if (skillsData.length > 0) {
            document.querySelector('.skill-item').classList.add('active');
            updateSkillDetails(skillsData[0]);
        }
    }
    function updateSkillDetails(skill) {
        document.getElementById('skillIcon').innerHTML = `<i class="${skill.icon}"></i>`;
        document.getElementById('skillName').textContent = skill.name;
        document.getElementById('skillCategory').textContent = skill.category;
        document.getElementById('proficiencyLevel').textContent = skill.level;
        document.getElementById('proficiencyPercent').textContent = skill.percent + '%';
        document.getElementById('proficiencyFill').style.width = skill.percent + '%';
        document.getElementById('skillDescription').textContent = skill.description;
        const projectsList = document.getElementById('skillProjects');
        projectsList.innerHTML = '';
        skill.projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = project;
            projectsList.appendChild(li);
        });
    }
    function animateLearningProgress() {
        const learningItems = document.querySelectorAll('.learning-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFill = entry.target.querySelector('.progress-fill');
                    const currentWidth = progressFill.style.width;
                    progressFill.style.width = '0%';
                    setTimeout(() => {
                        progressFill.style.transition = 'width 1.5s ease-in-out';
                        progressFill.style.width = currentWidth;
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        learningItems.forEach(item => {
            observer.observe(item);
        });
    }
    animateLearningProgress();
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });
});
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease-out;
    }
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .skill-item {
        transition: transform 0.3s ease;
    }
    .skill-item:hover {
        transform: translateY(-5px);
    }
    .skill-item.active {
        border-color: var(--accent);
        background: rgba(0, 217, 255, 0.1);
    }
`;
document.head.appendChild(style);
const reviewsData = [
    {
        id: 1,
        text: "This boy is really talented at what he does. He's the guy you go to when you need anything complex or highly functional. 10/10 for sure.",
        name: "Lucas",
        role: "Friend",
        date: "",
        emoji: "",
    },
    {
        id: 2,
        text: "Personally, I'd rate it 7/10 - for design just my personal opinion. But in terms of functionality, it's a 10/10. It's really good.",
        name: "Jamie",
        role: "Friend",
        date: "",
        emoji: "",
    },
    {
        id: 3,
        text: "9/10, because when you think about it youre only 15 and you can already do stuff like this",
        name: "Kacper",
        role: "Friend",
        date: "",
        emoji: "",
    },
    {
        id: 4,
        text: "This young guy’s website is packed with love fun sweat and pure passion. It’s a strong 9 out of 10 overall. Go check him out!",
        name: "Arseny",
        role: "Friend",
        date: "",
        emoji: "",
    }

];
const reviewsMarquee = document.getElementById('reviewsMarquee');
    
if (reviewsMarquee) {
    reviewsData.forEach((review) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-content">
                <div class="speech-bubble">
                    <p class="review-text">"${review.text}"</p>
                </div>
            </div>
            <div class="reviewer-info">
                <div class="reviewer-avatar">
                    ${review.emoji}
                </div>
                <div class="reviewer-details">
                    <h4>${review.name}</h4>
                    <div class="reviewer-role">${review.role}</div>
                    <div class="review-date">${review.date}</div>
                </div>
            </div>
        `;
        reviewsMarquee.appendChild(reviewCard);
    });
    

    const marqueeContent = reviewsMarquee.innerHTML;
    reviewsMarquee.innerHTML += marqueeContent;
    
    function setMarqueeSpeed() {
        const cardWidth = 300;
        const gap = 30; 
        const totalCards = reviewsData.length * 2; 
        const totalWidth = (cardWidth * totalCards) + (gap * (totalCards - 1));
        
        const speedFactor = 80;
        const duration = totalWidth / speedFactor;
        
        reviewsMarquee.style.animationDuration = `${duration}s`;
    }
    
    setMarqueeSpeed();
    
    window.addEventListener('resize', setMarqueeSpeed);
}