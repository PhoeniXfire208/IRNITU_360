// Функция возврата назад
function goBack() {
    window.history.back();
}

var sound = false;
// Управление звуком
function sound_on_off() {
    if (sound) {
        document.getElementById('sound_button').className="sound-button sound-button_on";
        audio.pause();
    }
    else {
        document.getElementById('sound_button').className="sound-button sound-button_off";
        audio.play().catch(e => console.error("Ошибка воспроизведения:", e));
    }
    sound = !sound;
}

// Остановка звука после окончания трека
audio.addEventListener('ended', function() {
    sound=false;
    document.getElementById('sound_button').className="sound-button sound-button_on";
});

// Создаем глобальную переменную для хранения div'а tooltip
let tooltipDiv = null;

// Обработчик клика на горячую точку
function hotspot(hotSpotDiv, args) {
    // Добавляем класс custom-hotspot
    hotSpotDiv.classList.add('custom-hotspot');

    // Показываем название при наведении мыши
    hotSpotDiv.addEventListener('mouseenter', () => showTooltip(args.text));

    // Скрываем название при уходе мыши
    hotSpotDiv.addEventListener('mouseleave', hideTooltip);

    // Переход по ссылке при клике
    hotSpotDiv.addEventListener('click', function() {
        window.location.href = args.URL;
    });
}

// Отображаем всплывающую подсказку
function showTooltip(text) {
    if (!tooltipDiv) {
        tooltipDiv = document.createElement('div');
        tooltipDiv.style.position = 'absolute';
        tooltipDiv.style.backgroundColor = '#fff';
        tooltipDiv.style.padding = '5px';
        tooltipDiv.style.borderRadius = '5px';
        tooltipDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,.3)';
        tooltipDiv.style.zIndex = '1000'; // поверх остальных элементов
        tooltipDiv.style.opacity = '0.9';
        tooltipDiv.style.pointerEvents = 'none'; // чтобы не мешал взаимодействию с элементами
        document.body.appendChild(tooltipDiv);
    }
    tooltipDiv.innerText = text;
    const rect = event.target.getBoundingClientRect(); // Получаем координаты элемента
    tooltipDiv.style.left = `${rect.left + 50 + rect.width / 2 - tooltipDiv.offsetWidth / 2}px`;
    tooltipDiv.style.top = `${rect.top - tooltipDiv.offsetHeight - 30}px`;
    tooltipDiv.style.display = 'block';
}

// Скрываем всплывающую подсказку
function hideTooltip() {
    if (tooltipDiv) {
        tooltipDiv.style.display = 'none';
    }
}