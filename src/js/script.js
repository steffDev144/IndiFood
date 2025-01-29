document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.block-hamburger'),
          close = document.querySelector('.header__list_close'),
          list = document.querySelector('.header__list');
    console.log(1)
    hamburger.addEventListener('click', () => {
        list.classList.add('active');
    })
    close.addEventListener('click', () => {
        list.classList.remove('active');
    })
});