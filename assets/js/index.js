// Animação de scroll suave
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

// Animação de fade-in ao rolar a página
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

// Aplicar animação aos elementos
document.addEventListener('DOMContentLoaded', () => {
    // Animar cards de projetos
    const projetoCards = document.querySelectorAll('.projeto-card');
    projetoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Animar seção de contato
    const contatoSection = document.querySelector('.contato');
    if (contatoSection) {
        contatoSection.style.opacity = '0';
        contatoSection.style.transform = 'translateY(50px)';
        contatoSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(contatoSection);
    }

    // Efeito parallax no card hero-content
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const movement = Math.min(scrolled * 0.3, 100);
            heroContent.style.transform = `translateY(${movement}px) scale(${1 - movement * 0.001})`;
            heroContent.style.opacity = `${1 - scrolled * 0.0015}`;
        }
    });

    // Efeito hover na imagem de perfil
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', () => {
            heroImage.style.transform = 'scale(1.05) rotate(5deg)';
        });
        
        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Destacar link ativo na navegação ao rolar
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Animação de digitação para o título
    const titulo = document.querySelector('.hero-text h1');
    if (titulo) {
        const textoOriginal = titulo.textContent;
        titulo.textContent = '';
        titulo.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < textoOriginal.length) {
                titulo.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Animação para o subtítulo
    const subtitulo = document.querySelector('.hero-text h2');
    if (subtitulo) {
        subtitulo.style.opacity = '0';
        subtitulo.style.transform = 'translateX(-50px)';
        setTimeout(() => {
            subtitulo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            subtitulo.style.opacity = '1';
            subtitulo.style.transform = 'translateX(0)';
        }, 2000);
    }

    // Animação para o parágrafo
    const paragrafo = document.querySelector('.hero-text p');
    if (paragrafo) {
        paragrafo.style.opacity = '0';
        paragrafo.style.transform = 'translateX(-50px)';
        setTimeout(() => {
            paragrafo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            paragrafo.style.opacity = '1';
            paragrafo.style.transform = 'translateX(0)';
        }, 2500);
    }
});

// Adicionar partículas de fundo (opcional)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
        `;
        hero.appendChild(particle);
    }
}

// Auto-scroll dos skills (esquerda e direita)
const skillsGrid = document.querySelector('.skills-grid');

if (skillsGrid) {
    let currentIndex = 0;
    let direction = 1; // 1 para direita, -1 para esquerda
    const scrollInterval = 3000; // 3 segundos
    
    function scrollToNext() {
        const cards = skillsGrid.querySelectorAll('.skill-card');
        const cardWidth = cards[0].offsetWidth + 25;
        
        currentIndex += direction;
        
        if (currentIndex >= cards.length - 1) {
            direction = -1;
        } else if (currentIndex <= 0) {
            direction = 1;
            currentIndex = 0;
        }
        
        skillsGrid.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    }
    
    let autoScrollTimer = setInterval(scrollToNext, scrollInterval);
    
    skillsGrid.addEventListener('mouseenter', () => {
        clearInterval(autoScrollTimer);
    });
    
    skillsGrid.addEventListener('mouseleave', () => {
        autoScrollTimer = setInterval(scrollToNext, scrollInterval);
    });
}

// Formulário de contato
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const mailtoLink = `mailto:rimauddjido@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)}`;
            window.location.href = mailtoLink;
            contactForm.reset();
        });
    }
});