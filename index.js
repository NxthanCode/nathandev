window.addEventListener('load', function() {
    const load = document.getElementById('load');
    const ttxt = document.getElementById('ttext');
    const txts = [
        "loading..",
        "setting up..",
        "almost ready..",
    ];
    let txi = 0;
    let chi = 0;
    let isd = false;
    function teff() {
        const ctxt = txts[txi];
        if (isd) {
            ttxt.textContent = ctxt.substring(0, chi - 1);
            chi--;
        } else {
            ttxt.textContent = ctxt.substring(0, chi + 1);
            chi++;
        }
        if (!isd && chi === ctxt.length) {
            isd = true;
            setTimeout(teff, 1500);
        } else if (isd && chi === 0) {
            isd = false;
            txi = (txi + 1) % txts.length;
            setTimeout(teff, 500);
        } else {
            setTimeout(teff, isd ? 50 : 100);
        }
    }
    setTimeout(() => {
        teff();
        setTimeout(() => {
            load.classList.add('fade');
            setTimeout(() => {
                load.style.display = `none`;
            }, 500);
        }, 3000);
    }, 500);
});
document.addEventListener('DOMContentLoaded', function() {
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
            const tid = this.getAttribute('href');
            if (tid === '#') return;
            const telm = document.querySelector(tid);
            if (telm) {
                window.scrollTo({
                    top: telm.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    const sdata = [
        {
            id: 1,
            name: "HTML",
            icon: "fab fa-html5",
            type: "Markup Language",
            lev: "Advanced",
            per: 80,
            proj: ["Forced Entry Website", "Portfolio Site"]
        },
        {
            id: 2,
            name: "CSS",
            icon: "fab fa-css3-alt",
            type: "Styling Language",
            lev: "Intermediate",
            per: 70,
            proj: ["Responsive Layouts", "UI Components", "Animations"]
        },
        {
            id: 3,
            name: "JavaScript",
            icon: "fab fa-js",
            type: "Programming Language",
            lev: "Beginner",
            per: 20,
            proj: ["Interactive Websites", "Web Applications", "Dynamic Content"]
        },
    ];
    const sgrid = document.getElementById('sgrid');
    if (sgrid) {
        sdata.forEach(skl => {
            const selv = document.createElement('div');
            selv.className = 'sitem';
            selv.dataset.id = skl.id;
            selv.innerHTML = `
                <div class="sicon">
                    <i class="${skl.icon}"></i>
                </div>
                <div class="sinfo">
                    <h4>${skl.name}</h4>
                    <div class="slev">${skl.lev}</div>
                </div>
            `;
            sgrid.appendChild(selv);
            selv.addEventListener('click', function() {
                document.querySelectorAll('.sitem').forEach(item => {
                    item.classList.remove('act');
                });
                this.classList.add('act');
                uskl(skl);
            });
        });
        if (sdata.length > 0) {
            document.querySelector('.sitem').classList.add('act');
            uskl(sdata[0]);
        }
    }
    function uskl(skl) {
        document.getElementById('sicon').innerHTML = `<i class="${skl.icon}"></i>`;
        document.getElementById('sname').textContent = skl.name;
        document.getElementById('stype').textContent = skl.type;
        document.getElementById('plev').textContent = skl.lev;
        document.getElementById('pper').textContent = skl.per + '%';
        document.getElementById('pfill').style.width = skl.per + '%';
        const plist = document.getElementById('sproj');
        plist.innerHTML = '';
        skl.proj.forEach(proj => {
            const li = document.createElement('li');
            li.textContent = proj;
            plist.appendChild(li);
        });
    }
    function alprog() {
        const litems = document.querySelectorAll('.litem');
        const obs = new IntersectionObserver((ents) => {
            ents.forEach(ent => {
                if (ent.isIntersecting) {
                    const pfill = ent.target.querySelector('.pfill');
                    const cw = pfill.style.width;
                    pfill.style.width = '0%';
                    setTimeout(() => {
                        pfill.style.transition = 'width 1.5s ease-in-out';
                        pfill.style.width = cw;
                    }, 300);
                    obs.unobserve(ent.target);
                }
            });
        }, { threshold: 0.5 });
        litems.forEach(item => {
            obs.observe(item);
        });
    }
    alprog();
    const sects = document.querySelectorAll('section');
    const nitems = document.querySelectorAll('.nitem');
    window.addEventListener('scroll', function() {
        let cur = '';
        sects.forEach(sect => {
            const stop = sect.offsetTop;
            const shei = sect.clientHeight;
            if (pageYOffset >= stop - 100) {
                cur = sect.getAttribute('id');
            }
        });
        nitems.forEach(link => {
            link.classList.remove('act');
            if (link.getAttribute('href') === `#${cur}`) {
                link.classList.add('act');
            }
        });
    });
    const oopt = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const obs = new IntersectionObserver(function(ents) {
        ents.forEach(ent => {
            if (ent.isIntersecting) {
                ent.target.classList.add('anim');
            }
        });
    }, oopt);
    sects.forEach(sect => {
        obs.observe(sect);
    });
});
const style = document.createElement('style');
style.textContent = `
    .anim {
        animation: fiu 0.8s ease-out;
    }
    @keyframes fiu {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .sitem {
        transition: transform 0.3s ease;
    }
    .sitem:hover {
        transform: translateY(-5px);
    }
    .sitem.act {
        border-color: var(--blu);
        background: rgba(0, 217, 255, 0.1);
    }
`;
document.head.appendChild(style);
const rdata = [
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
        text: "This young guy's website is packed with love fun sweat and pure passion. It's a strong 9 out of 10 overall. Go check him out!",
        name: "Arseny",
        role: "Friend",
        date: "",
        emoji: "",
    },
    {
        id: 5,
        text: "Nathan's got a passion for programming, ever since I have known him he has always been programming something and I must say he's very talented, especially for only 15 years of age. 10/10",
        name: "Jake",
        role: "Friend",
        date: "",
        emoji: "",
    }
];
const rslide = document.getElementById('rslide');
    
if (rslide) {
    rdata.forEach((rev) => {
        const rcard = document.createElement('div');
        rcard.className = 'rcard';
        rcard.innerHTML = `
            <div class="rcontn">
                <div class="rbub">
                    <p class="rtext">"${rev.text}"</p>
                </div>
            </div>
            <div class="rinfo">
                <div class="ravat">
                    ${rev.emoji}
                </div>
                <div class="rdet">
                    <h4>${rev.name}</h4>
                    <div class="rrole">${rev.role}</div>
                    <div class="rdate">${rev.date}</div>
                </div>
            </div>
        `;
        rslide.appendChild(rcard);
    });
    
    const scont = rslide.innerHTML;
    rslide.innerHTML += scont;
    
    function sslide() {
        const cw = 300;
        const gap = 30;
        const tc = rdata.length * 2;
        const tw = (cw * tc) + (gap * (tc - 1));
        
        const sf = 80;
        const dur = tw / sf;
        
        rslide.style.animationDuration = `${dur}s`;
    }
    
    sslide();
    
    window.addEventListener('resize', sslide);
}