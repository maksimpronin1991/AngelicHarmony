let lastScroll = 0;
const header = document.querySelector('.header');
const scrollThreshold = 10; // порог прокрутки для срабатывания

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        // В самом верху страницы - показываем хедер
        header.classList.remove('hide');
        return;
    }
    
    if (Math.abs(currentScroll - lastScroll) < scrollThreshold) {
        // Прокрутка меньше порога - игнорируем
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('hide')) {
        // Прокрутка вниз - скрываем
        header.classList.add('hide');
    } else if (currentScroll < lastScroll && header.classList.contains('hide')) {
        // Прокрутка вверх - показываем
        header.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});



document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.procedure-btn');
    const cards = document.querySelectorAll('.procedure-card');
    const container = document.querySelector('.procedure-card-container');
    
    // Проверяем, есть ли активная карточка при загрузке
    updateContainerVisibility();
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем active у всех кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            // Добавляем active к текущей кнопке
            this.classList.add('active');
            
            // Скрываем все карточки
            cards.forEach(card => card.classList.remove('active'));
            
            // Показываем соответствующую карточку
            const procedureId = this.getAttribute('data-procedure');
            document.getElementById(procedureId).classList.add('active');
            
            // Обновляем видимость контейнера
            updateContainerVisibility();
        });
    });
    
    // Функция для обновления видимости контейнера
    function updateContainerVisibility() {
        const activeCards = document.querySelectorAll('.procedure-card.active');
        if (activeCards.length > 0) {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Настройки Intersection Observer
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Функция-обработчик
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Анимируем заголовок
                entry.target.querySelector('.section-title').classList.add('animate-in');
                
                // Анимируем элементы списка по очереди
                const items = entry.target.querySelectorAll('.feature-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 150);
                });
                
                // Отключаем observer после срабатывания
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Создаем observer
    const observer = new IntersectionObserver(observerCallback, options);
    
    // Начинаем наблюдать за секцией
    const section = document.querySelector('.why-us-section');
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // Создаем точки навигации
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Функция переключения слайдов
    function goToSlide(slideIndex) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (slideIndex + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Переключение на следующий слайд
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Переключение на предыдущий слайд
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Автопереключение слайдов
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Остановка автопереключения
    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Обработчики событий
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlider();
        startSlider();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlider();
        startSlider();
    });

    // Пауза при наведении на слайдер
    document.querySelector('.experience-slider').addEventListener('mouseenter', stopSlider);
    document.querySelector('.experience-slider').addEventListener('mouseleave', startSlider);

    // Инициализация слайдера
    startSlider();
});


document.addEventListener('DOMContentLoaded', function() {
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    }
    
    // Функция обработки скролла
    function handleScroll() {
        const section = document.querySelector('.promo-section');
        if (isElementInViewport(section)) {
            section.classList.add('animated');
            window.removeEventListener('scroll', handleScroll);
        }
    }
    
    // Проверяем при загрузке, может быть секция уже в viewport
    handleScroll();
    
    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll);
});