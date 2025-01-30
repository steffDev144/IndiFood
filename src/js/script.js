document.addEventListener('DOMContentLoaded', () => {


    // Функционал бургер-меню
    const hamburger = document.querySelector('.block-hamburger'),
          close = document.querySelector('.header__list_close'),
          list = document.querySelector('.header__list');
    hamburger.addEventListener('click', () => {
        list.classList.add('active');
    })
    close.addEventListener('click', () => {
        list.classList.remove('active');
    })

    

    // Маска для телефона
    if(document.querySelector("#userPhone")) {
        if(screen.width > "768") {
            $.fn.setCursorPosition = function(pos) {
                if ($(this).get(0).setSelectionRange) {
                    $(this).get(0).setSelectionRange(pos, pos);
                } else if ($(this).get(0).createTextRange) {
                    var range = $(this).get(0).createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            };
            $('#userPhone').click(function(){
                $(this).setCursorPosition(4);
            }).mask("+7 (999) 999-99-99",{autoclear: false});
        }
    }

    const nameElements = document.querySelectorAll('.typeName');
    /* Валидация имени */ 
    nameElements.forEach((el) => {
        el.addEventListener('input', () => {
            el.value = el.value.replace(/[^a-zа-яA-ZА-Я\s.]/g, '');
        });
    });



    // Скролл
    const myHref = 'formwrap';
    const lastForm = document.querySelector(`#${myHref}`);
    const myLink = document.querySelector('.toForm');
    const stylesForBehavior = `<style>html { scroll-behavior: smooth; }</style>`;
    document.body.insertAdjacentHTML('beforeend', stylesForBehavior);
    myLink.addEventListener('click', function (e) {
        e.preventDefault();
        const targetPosition = lastForm.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;
        const targetHeight = lastForm.offsetHeight;
        const scrollToPosition = targetPosition - windowHeight + targetHeight + 150;
        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
        });
    });



    // Выпадающий список магазинов
    const hideElems = document.querySelectorAll(".shop__list_item");
    const btnElems = document.querySelector(".btn-elems");

    btnElems.addEventListener("click", (e) => {
        console.log(e.target.getAttribute("data-active"));
        if(e.target.getAttribute("data-active") == "no") {
            hideElems.forEach((elem) => {
                if(elem.classList.contains("shop__list_item-hide")) {
                    elem.classList.remove("shop__list_item-hide");
                }
            });
            e.target.setAttribute("data-active", "yes");
            e.target.textContent = "Скрыть магазины";
        } 
        else if(e.target.getAttribute("data-active") == "yes") {
            hideElems.forEach((elem, i) => {
                if(i >= 3) {
                    elem.classList.add("shop__list_item-hide");
                }
            });
            e.target.setAttribute("data-active", "no");
            e.target.textContent = "Показать больше";
        }
    });



    //Мейлер

    const mainForm = document.querySelector('.mainForm');

	function postData(form) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();

			// Сам AJAX запрос
			const request = new XMLHttpRequest();
			request.open("POST", "./mailer/smart.php");
			// Не нужно устанавливать заголовки для формата XMLHttpRequest + FormData
			// request.setRequestHeader("Content-Type", "multipart/form-data; charset=UTF-8");
			const formDataRes = new FormData(form);
			request.send(formDataRes);

			// Взаимодействие с модальным окном
			const modalRequest = document.querySelector('#modal-success'),
				  modalRequestInner = document.querySelector('.modal-success__block'),
				  modalClose = document.querySelector('.modal-success__block-close');

			modalRequest.style.cssText = "transition: .3s all ease-in-out;";


			let objRequest = {
				ok: {
					title: "Благодарю за заявку!",
					descr: "Скоро с вами свяжется мой менеджер"
				},
				bad: {
					title: "Что-то пошло не так....",
					descr: "Попробуйте ещё раз или напишите в тех.поддержку!"
				}
			};

			class MessRequest {
				constructor(message, classObj) {
					this.message = message;
					this.classObj = classObj;
				}
				render() {
					modalRequest.classList.remove("hide");
					document.body.classList.add('overflow-hidden');
					let requestMessage = document.createElement('div');
					requestMessage.className = this.classObj;
					requestMessage.innerHTML = this.message;
					modalRequestInner.appendChild(requestMessage);
					// if(modalRequestInner.childNodes[3]) {
					//     modalRequestInner.childNodes[3].nextSibling.classList.add("title");
					// }
					// console.log(modalRequestInner.childNodes[2].nextSibling);
					// console.dir(modalRequestInner.childNodes[2].nextSibling);
				}
			}

			function modalCls() {
				modalRequest.classList.add('hide');
				document.body.classList.remove('overflow-hidden');
				let objText = document.querySelector(".modal-success__block");
				while (objText.childNodes.length > 2) {
					objText.removeChild(objText.lastChild);
				}
			}
			modalClose.addEventListener('click', () => {
				modalCls();
			});
			if (modalRequest.classList.contains('hide')) {
				document.querySelector('.modal-success').addEventListener('click', function () {
					modalCls();
				});
			}

			request.addEventListener('load', () => {
				if (request.status === 200 && request.readyState === 4) {
					new MessRequest(objRequest.ok.title, "modal-success__block-title title").render();
					new MessRequest(objRequest.ok.descr, "modal-success__block-descr title").render();
				} else {
					new MessRequest(objRequest.bad.title, "modal-success__block-title title").render();
					new MessRequest(objRequest.bad.descr, "modal-success__block-descr title").render();
				}
			});

			document.querySelectorAll("form input").forEach(item => {
				item.value = "";
			});
			document.querySelectorAll("form textarea").forEach(item => {
				item.value = "";
			});
		});
	}

	if(mainForm) {
        postData(mainForm);
    }
});