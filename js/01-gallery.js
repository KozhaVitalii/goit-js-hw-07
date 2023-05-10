import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGallery(galleryItems);

// 1. Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.

// 1.1 Напишемо функцію для створення розмітки: 
function createGallery(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
    <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    })
      .join('');
}
// console.log(createImageCardsMarkup(galleryItems));

// 1.2 Зарендерим нашу розмітку в наш ul  контейнер:
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

// 2. Реалізація делегування на ul.gallery і отримання url великого зображення.

galleryContainer.addEventListener('click', onClick);

let instance;

function onClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG') {
        const original = evt.target.dataset.source;
        instance = basicLightbox.create(`
    <img class="gallery__image" src="${original}"/>
    `);
    // instance.element().querySelector('img').setAttribute('src', original);
        instance.show();

        document.addEventListener('keydown', onKeyPress);
    }
}


function onKeyPress(evt) {
  if (evt.key === 'Escape') {
    // умова закриття модального вікна якщо клавіша Escape 
    instance.close();

    // видаляємо обробник подій з клавіатуры
    document.removeEventListener('keydown', onKeyPress);
  }
}

galleryContainer.addEventListener('click', onClick);


// Мій коммент для справки: data - src - это атрибут который используется для ленивой загрузки.src - это обязательный атрибут 
// для отображения изображени на экране (также может быть использован в качестве заглушки или превью изображения), а
// data - source - это пользовательский атрибут в котором можно хранить оригинальный размер изображени

// Приклади:

// const instance = basicLightbox.create(`
//     <h1>Заголовок</h1>
//     <p>Это содержимое модального окна</p>
// `, {
//     onShow: (instance) => {
//         console.log('Модальное окно открыто');
//     },
//     onClose: (instance) => {
//         console.log('Модальное окно закрыто');
//     }
// });

// // Открытие модального окна
// instance.show();

// // Проверка видимости модального окна
// if (instance.visible()) {
//     console.log('Модальное окно открыто');
// }

// // Изменение содержимого модального окна
// instance.setContent(`
//     <h1>Новый заголовок</h1>
//     <p>Новое содержимое модального окна</p>
// `);

// // Закрытие модального окна
// instance.close();

// При вызове метода .create() необходимо передать два параметра:
// content - содержимое модального окна в виде строки HTML-разметки или DOM-элемента.
// opts - объект опций, который может содержать следующие свойства:
// onShow - функция, которая будет вызвана при открытии модального окна.
// onClose - функция, которая будет вызвана при закрытии модального окна.
// beforeShow - функция, которая будет вызвана перед открытием модального окна.
// beforeClose - функция, которая будет вызвана перед закрытием модального окна.
// className - строка с CSS-классами, которые будут добавлены к модальному окну.
// closable - логический флаг, указывающий, можно ли закрыть модальное окно при нажатии на фон или клавишу Esc.
// focus - логический флаг, указывающий, должно ли модальное окно получать фокус при открытии.
// scrollable - логический флаг, указывающий, может ли содержимое модального окна прокручиваться.

// После создания экземпляра модального окна можно использовать его методы и свойства для управления его поведением.
// Например, метод instance.show() открывает модальное окно, а метод instance.close() закрывает его. 
// Свойство instance.visible() возвращает логический флаг, указывающий, открыто ли модальное окно в данный момент.
// С помощью метода instance.setContent() можно изменить содержимое модального окна.


// v2:

// let originalSrc = '';

// function onClick(evt) {
//   evt.preventDefault();
//   if (evt.target.tagName === 'IMG') {
//     const preview = evt.target.src;
//     originalSrc = evt.target.dataset.source;
//     instance = basicLightbox.create(`
//       <img class="gallery__image" src="${originalSrc}"/>
//     `);
//     instance.show();
//     document.addEventListener('keydown', onKeyPress);
//   }
// }

// function onKeyPress(evt) {
//   if (evt.key === 'Escape') {
//     instance.close();
//     instance.element().querySelector('img').setAttribute('src', preview);
//     document.removeEventListener('keydown', onKeyPress);
//   }
// }