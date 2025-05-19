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

// Обработчик клика на горячую точку (измененная строка)
function hotspot(hotSpotDiv, args) {
    hotSpotDiv.classList.add('custom-hotspot');
    hotSpotDiv.addEventListener('mouseenter', (e) => showTooltip(e, args.text)); // Добавлен параметр события
    hotSpotDiv.addEventListener('mouseleave', hideTooltip);
    hotSpotDiv.addEventListener('click', function() {
        window.location.href = args.URL;
    });
}

// Новая версия функции showTooltip
function showTooltip(event, text) {
    if (!tooltipDiv) {
        tooltipDiv = document.createElement('div');
        tooltipDiv.className = 'custom-tooltip';
        document.body.appendChild(tooltipDiv);
        console.log('Tooltip element created'); // Для отладки
    }
    tooltipDiv.textContent = text;
    console.log('Tooltip text:', text); // Для отладки
    
    // Добавьте проверку координат
    const x = event.clientX + window.scrollX + 15;
    const y = event.clientY + window.scrollY + 15;
    
    tooltipDiv.style.left = `${x}px`;
    tooltipDiv.style.top = `${y}px`;
    tooltipDiv.style.display = 'block';
    console.log('Tooltip position:', x, y); // Для отладки
}

// Скрываем всплывающую подсказку
function hideTooltip() {
    if (tooltipDiv) {
        tooltipDiv.style.display = 'none';
    }
}