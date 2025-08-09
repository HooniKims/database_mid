document.addEventListener('DOMContentLoaded', () => {
    // 1. highlight.js 초기화
    hljs.highlightAll();

    // 2. 스크롤 애니메이션을 위한 Intersection Observer 설정
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0'; // 초기 상태를 투명하게 설정
        observer.observe(card);
    });

    // 3. 활성 내비게이션 링크 표시
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        navObserver.observe(section);
    });
});

// CSS에 애니메이션 및 활성 클래스 추가
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    header nav a.active {
        color: var(--primary-color);
        font-weight: 700;
    }

    header nav a.active::after {
        width: 100%;
        left: 0;
    }
`;
document.head.appendChild(style);
