//на странице есть список элементов, каждый из которых имеет атрибут data-price, содержащий цену товара. Создайту функцию, которая принимает максимальную цену и скрывает все элементы с ценой выше указаного значения

const filterElementsByDataAttribute = (attributeName, maxPrice) => {
    const elements = Array.from(document.querySelectorAll(`[${attributeName}]`));
    elements.forEach(element => {
        const price = parseFloat(element.getAttribute(attributeName));
        if (price > maxPrice) {
            element.style.display = 'none';
        }
    });
};
// пример использования
filterElementsByDataAttribute('data-price', 50);
//на странице есть список элементов, каждый из которых имеет атрибут data-rating, содержащий рейтинг товараю Создайте функцию , которая сортирует элементы в порядке убывания рейтинга и перествлят их на странице в соответствии с новым порядком 
const sortElementsByDataAttribute = attributeName => {
    const rating = document.querySelector('.rating');
    const elements = Array.from(rating.querySelectorAll(`[${attributeName}]`));
    elements.sort((a, b) => {
        const ratingA = parseInt(a.getAttribute(attributeName));
        const ratingB = parseInt(b.getAttribute(attributeName));
        return ratingB - ratingA;
    });
    elements.forEach(element => {
        rating.appendChild(element);
    });
};
// пример использования
sortElementsByDataAttribute('data-rating');
