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