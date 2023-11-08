// Цель: Разработать веб-приложение, которое каждый день будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.
// Регистрация на Unsplash:
// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).
// Создание приложения:
// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:
// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу.

// * Дополнительные задачи (по желанию):

// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался.
// • Реализуйте возможность просмотра предыдущих "фото дня" с сохранением их в истории просмотров.

'use strict';
let fact;
// read localStorage
if (localStorage.getItem('PhotoDay')) {
    const photoDay = JSON.parse(localStorage.getItem('PhotoDay'));
} else {
    const photoDay = {};
    photoDay['id'] = '';
    photoDay['likes'] = '0';
    localStorage.setItem('PhotoDay', JSON.stringify(photoDay));
}

// creating elements & query selectors
const photoContaner = document.querySelector('#photo-container');
// likes
const likesEl = document.createElement('div');
likesEl.classList.add('likes');
// photoEl
const photoEl = document.createElement('div');
photoEl.classList.add('photo');
// image
const image = document.createElement('img');
image.classList.add('image');
image.setAttribute('width', '304');
image.setAttribute('height', '228');
// like
const likeEl = document.createElement('div');
likeEl.classList.add('like');
likeEl.classList.add('active');
likeEl.innerHTML =
    '<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#f31408" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// author
const authorEl = document.createElement('div');
// buttonEl
const buttonEl = document.createElement('button');
buttonEl.textContent = 'The most liked';
buttonEl.classList.add('best');
// append elements
photoContaner.append(photoEl);
photoEl.append(image);
photoContaner.append(authorEl);
photoEl.append(likeEl);
photoContaner.append(likesEl);
photoContaner.append(buttonEl);
//
// fetch photo
//
async function showPic(id) {
    let url;
    if (!id) {
        url =
            'https://api.unsplash.com/photos/random?client_id=2HdMabyOYU2-DTxrfjd8rBPqh6ZtTVBF8HeLWOQ2GL8';
    } else {
        url = `https://api.unsplash.com/photos/${id}?client_id=2HdMabyOYU2-DTxrfjd8rBPqh6ZtTVBF8HeLWOQ2GL8`;
    }
    const response = await fetch(url);
    console.log(response.status);
    console.log(response.ok);
    fact = await response.json();
    // reading data
    const urlsImg = fact.urls.regular;
    const author = fact.user.first_name + ' ' + fact.user.last_name;
    image.setAttribute('src', `${urlsImg}`);
    authorEl.textContent = 'Photographer: ' + author;
    likesEl.textContent = 'Likes: ' + fact.likes;
}
// best click
buttonEl.addEventListener('click', function (e) {
    console.log(
        parseInt(JSON.parse(localStorage.getItem('PhotoDay')).likes)
    );
    const id = JSON.parse(localStorage.getItem('PhotoDay')).id;
    if (id) showPic(id);
});
//
// like click
likeEl.addEventListener('click', function (e) {
    if (likeEl.classList.contains('active')) {
        let likes = parseInt(likesEl.textContent.split(':')[1]);
        likes++;
        likesEl.textContent = 'Likes: ' + likes;
        likeEl.classList.remove('active');
        //
        if (
            likes > parseInt(JSON.parse(localStorage.getItem('PhotoDay')).likes)
        ) {
            const photoDay = {};
            photoDay['id'] = fact.id;
            photoDay['likes'] = likes;
            localStorage.setItem('PhotoDay', JSON.stringify(photoDay));
        }
    } else {
        alert('Only one like available on the same photo');
    }
    //
});
showPic();