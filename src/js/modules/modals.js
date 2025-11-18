// модалка
const modals = () => {
	function bindModal(
		triggerSelector,
		modalSelector,
		closeSelector,
		closeClickOverlay = true
	) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]'); // закрыть все модалки

		trigger.forEach((item) => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				windows.forEach((item) => {
					item.style.display = 'none'; // закрыть все модалки
				});

				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';
			});
		});

		close.addEventListener('click', () => {
			windows.forEach((item) => {
				item.style.display = 'none'; // закрыть все модалки
			});

			modal.style.display = 'none';
			document.body.style.overflow = '';
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay) {
				windows.forEach((item) => {
					item.style.display = 'none'; // закрыть все модалки
				});

				modal.style.display = 'none';
				document.body.style.overflow = '';
			}
		});
	}

	function showModalByTime(selector, time) {
		setTimeout(() => {
			document.querySelector(selector).style.display = 'block';
			document.body.style.overflow = 'hidden';
		}, time);
	}

	// это ВЫЗВАТЬ ЗАМЕРЩИКА
	bindModal(
		'.popup_engineer_btn',
		'.popup_engineer',
		'.popup_engineer .popup_close'
	);
	// это МОДАЛКА ПО ссылке
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	// это РАССЧИТАТЬ СТОИМОСТЬ
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
	// это РАССЧИТАТЬ СТОИМОСТЬ - вторая МОДАЛКА
	bindModal(
		'.popup_calc_button',
		'.popup_calc_profile',
		'.popup_calc_profile_close',
		false
	);
	// это РАССЧИТАТЬ СТОИМОСТЬ - третья МОДАЛКА
	bindModal(
		'.popup_calc_profile_button',
		'.popup_calc_end',
		'.popup_calc_end_close',
		false
	);
	// showModalByTime('.popup', 60000);
};

export default modals;
