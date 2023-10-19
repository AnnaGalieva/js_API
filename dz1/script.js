// Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.
// Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.
// Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.
// Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.
// После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".
// Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.
// Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

const data = `[{
    "id": "1",
    "classTitle": "Pilates",
    "classTime": "2023-10-14 12:00",
    "classMaximum": 10,
    "classCurrent": 5
},
{
    "id": "2",
    "classTitle": "Boxing",
    "classTime": "2023-10-15 16:00",
    "classMaximum": 10,
    "classCurrent": 5
},
{
    "id": "3",
    "classTitle": "Yoga",
    "classTime": "2023-10-16 15:00",
    "classMaximum": 20,
    "classCurrent": 10
}
]`
const timetable = JSON.parse(data);
const cardBox = document.querySelector('.classes__cards-box');
schedule();

cardBox.addEventListener('click', (e) => {
    if (e.target.classList.contains('button-join')) {
        timetable[e.target.id - 1].classCurrent = Number(timetable[e.target.id - 1].classCurrent) + 1;
        const student = document.querySelector(`[data-id="${e.target.id}"]`);
        student.textContent = timetable[e.target.id - 1].classCurrent;

        const currentBtn = document.getElementById(`${e.target.id}`);

        currentBtn.classList.add('inactive');
        currentBtn.nextElementSibling.classList.remove('inactive');
    }
    if (e.target.classList.contains('button-cancel')) {
        let curentEl = timetable.filter((cls, index) => cls.classTitle === e.target.dataset.id);

        let index = Number(curentEl[0].id) - 1;

        timetable[index].classCurrent = timetable[index].classCurrent - 1;

        const student = document.querySelector(`[data-id="${index + 1}"]`);
        student.textContent = timetable[index].classCurrent;

        const currentBtn = document.querySelector(`[data-id="${e.target.dataset.id}"]`);

        currentBtn.classList.add('inactive');
        currentBtn.previousElementSibling.classList.remove('inactive');
    }
});

function schedule() {
    timetable.forEach(sportClass => {
        let card = `<article class="card">
                    <div class="card__title-box">
                        <p class="card__title">${sportClass.classTitle}</p>
                    <div class="card__quantity-box">
                        <p class="card__people-text"> текущее количество:</p>
                        <p data-id=${sportClass.id} class="card__people">${sportClass.classCurrent}</p>
                    </div>
                    </div>
                    <div class="card__content">            
                      максимальное количество: <span id="capacity">${sportClass.classMaximum}</span></p>
                      время проведения: <span>${sportClass.classTime}</span></p>
                      <p class="card__content-text">                        
                    </div>
                    <div class="card__buttons">
                      <button id=${sportClass.id} class="button-join">Записаться</button>
                      <button data-id="${sportClass.classTitle}" class="button-cancel inactive">Отменить запись</button>
                    </div>
                    </article>`
        cardBox.insertAdjacentHTML('beforeend', card);

        // Если мест нет
        if (Number(sportClass.classMaximum) === Number(sportClass.classCurrent)) {
            const joinBtn = document.getElementById(`${sportClass.id}`);
            joinBtn.classList.add('inactive');
        }
    });
}; 