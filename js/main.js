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
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cardWidth = cards[0].offsetWidth + 20; // width + gap
    let currentPosition = 0;
    let maxPosition = -((cards.length / 4 - 1) * cardWidth * 4);

    // Клонируем первые карточки для бесконечной прокрутки
    const cloneCards = Array.from(cards).slice(0, 4);
    cloneCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    // Перемотка вперед
    nextBtn.addEventListener('click', () => {
        currentPosition -= cardWidth;
        if (currentPosition < maxPosition) {
            currentPosition = 0;
            track.style.transition = 'none';
            track.style.transform = `translateX(${currentPosition}px)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease';
                currentPosition = -cardWidth;
                track.style.transform = `translateX(${currentPosition}px)`;
            }, 10);
        } else {
            track.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    // Перемотка назад
    prevBtn.addEventListener('click', () => {
        currentPosition += cardWidth;
        if (currentPosition > 0) {
            currentPosition = maxPosition;
            track.style.transition = 'none';
            track.style.transform = `translateX(${currentPosition}px)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease';
                currentPosition = maxPosition + cardWidth;
                track.style.transform = `translateX(${currentPosition}px)`;
            }, 10);
        } else {
            track.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    // Автопрокрутка
    let autoScroll = setInterval(() => {
        nextBtn.click();
    }, 5000);

    // Пауза при наведении
    document.querySelector('.testimonials-carousel').addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });

    document.querySelector('.testimonials-carousel').addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            nextBtn.click();
        }, 5000);
    });

    // Адаптация при изменении размера окна
    window.addEventListener('resize', () => {
        const newCardWidth = document.querySelector('.testimonial-card').offsetWidth + 20;
        if (newCardWidth !== cardWidth) {
            cardWidth = newCardWidth;
            track.style.transform = `translateX(${currentPosition}px)`;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрываем все другие открытые вопросы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий вопрос
            item.classList.toggle('active');
        });
    });
    
    // Открываем первый вопрос по умолчанию
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
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
        const section = document.querySelector('.why-us-section');
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


document.addEventListener('DOMContentLoaded', function() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
    if (isTouchDevice) {
        document.querySelector('.philosophy-image-wrapper').classList.add('touch');
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const promoSection = document.querySelector('.promo-section');
    
    function checkVisibility() {
        const rect = promoSection.getBoundingClientRect();
        const isVisible = (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
        
        if (isVisible) {
            promoSection.classList.add('animated');
            window.removeEventListener('scroll', checkVisibility);
        }
    }
    
    // Проверяем сразу при загрузке
    checkVisibility();
    
    // И при скролле
    window.addEventListener('scroll', checkVisibility);
});



// Бургер меню 
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.header-nav');
    const backdrop = document.querySelector('.backdrop');

    toggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        backdrop.classList.toggle('active');
        document.body.style.overflow = backdrop.classList.contains('active') ? 'hidden' : '';
    });

    // Закрытие меню при клике на пункт или бэкдроп
    document.querySelectorAll('.nav-list_item a, .backdrop').forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});