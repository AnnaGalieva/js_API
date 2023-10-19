// Вы должны создать веб-страницу, которая позволяет пользователю динамически управлять элементами на странице. Ниже приведены основные требования и функциональность:
// На странице должны быть кнопки "Добавить элемент", "Удалить элемент" и "Клонировать элемент".
// При нажатии на кнопку "Добавить элемент" на страницу добавляется новый квадратный элемент (<div>) с размерами 100x100 пикселей. Этот элемент должен иметь класс .box и содержать текст, указывающий порядковый номер элемента (1, 2, 3 и так далее).
// При нажатии на кнопку "Удалить элемент" удаляется последний добавленный элемент, если таковой имеется.
// При нажатии на кнопку "Клонировать элемент" создается копия последнего добавленного элемента и добавляется на страницу.
// Все элементы имеют класс .box и стилизованы с помощью CSS .
// Элементы могут быть добавлены, удалены и клонированы в любом порядке и в любом количестве.

const addBtn = document.querySelector('#add');
const deleteBtn = document.querySelector('#delete');
const clonBtn = document.querySelector('#clone');
let index = 0;

addBtn.addEventListener('click', () => {
    index++;
    const newDiv = createDiv();
    newDiv.textContent = index;
    document.body.append(newDiv);
});
deleteBtn.addEventListener('click', () => {
    const lastDiv = document.querySelectorAll('.box');
    const theLastDiv = lastDiv[lastDiv.length - 1];
    if (theLastDiv.classList.contains('clone')) {
        theLastDiv.remove();
    }
    else {
        theLastDiv.remove();
        index--;
    }

})
clonBtn.addEventListener('click', () => {
    const lastDiv = document.querySelectorAll('.box');
    const theLastDiv = lastDiv[lastDiv.length - 1];
    let clone = theLastDiv.cloneNode(true);
    clone.classList.add('clone');
    document.body.appendChild(clone);
});

function createDiv() {
    const newDiv = document.createElement('div');
    newDiv.classList.add('box');
    newDiv.style.background = 'yellow';
    return newDiv;
};




// const addBtn = document.querySelector('#add');
// const deleteBtn = document.querySelector('#delete');
// const clonBtn = document.querySelector('#clone');
// let index = 0;

// addBtn.addEventListener('click', () => {
//     index++;
//     const newDiv = createDiv();
//     newDiv.textContent = index;
//     document.body.append(newDiv);
// });
// deleteBtn.addEventListener('click', () => {
//     const lastDiv = document.querySelectorAll('.box');
//     const theLastDiv = lastDiv[lastDiv.length - 1];
//     if (theLastDiv.classList.contains('clone')) {
//         theLastDiv.remove();
//     }
//     else {
//         theLastDiv.remove();
//         index--;
//     }

// })
// clonBtn.addEventListener('click', () => {
//     const lastDiv = document.querySelectorAll('.box');
//     const theLastDiv = lastDiv[lastDiv.length - 1];
//     let clone = theLastDiv.cloneNode(true);
//     clone.classList.add('clone');
//     document.body.appendChild(clone);
// });

// function createDiv() {
//     const newDiv = document.createElement('div');
//     newDiv.classList.add('box');
//     newDiv.style.background = 'yellow';
//     return newDiv;
// };
