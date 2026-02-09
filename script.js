// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Обработка поиска
document.querySelectorAll('.search-box button').forEach(button => {
    button.addEventListener('click', function() {
        const searchBox = this.closest('.search-box');
        const input = searchBox.querySelector('input');
        const query = input.value;
        
        if (query.trim()) {
            alert(`Поиск по запросу: "${query}". В реальном сайте здесь будет реализован поиск по содержимому.`);
            input.value = '';
        }
    });
});

// Обработка нажатия Enter в поле поиска
document.querySelectorAll('.search-box input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            this.closest('.search-box').querySelector('button').click();
        }
    });
});

// Анимация при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к карточкам
document.querySelectorAll('.card, .service-item, .stat-item, .vacancy-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(item);
});

// Установка активного пункта меню
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Обработка формы обратной связи
document.querySelectorAll('form').forEach(form => {
    if (form.id === 'requestForm' || form.classList.contains('contact-form')) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо! Ваш запрос отправлен. Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
});

// Вызываем при загрузке
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavItem();
    
    // Плавная прокрутка к якорям
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 120,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});