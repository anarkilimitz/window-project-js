import checkNumInputs from './checkNumInputs';

const forms = (state) => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input');

	checkNumInputs('input[name="user_phone"]'); // валидация инпутов на число

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо, скоро Вам ответят...',
		failure: 'Ошибка, что-то пошло не так...',
	};

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {
			method: 'POST',
			body: data,
		});

		return await res.text();
	};

	const clearInputs = () => {
		inputs.forEach((item) => {
			item.value = '';
		});
	};

	form.forEach((item) => {
		item.addEventListener('submit', (e) => {
			e.preventDefault(); // чтоб страница не перезагружалась

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);
			// проверка что это именно модалка из калькулятора окон
			const formData = new FormData(item);
			if (item.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			postData('assets/server.php', formData)
				.then((res) => {
					console.log(res);
					statusMessage.textContent = message.success;
				})
				.catch(() => (statusMessage.textContent = message.failure))
				.finally(() => {
					clearInputs();
					// закрыть именно модалку КАЛЬКУЛЯТОР после отправки
					if (item.getAttribute('data-calc') === 'end') {
						setTimeout(() => {
							const modal = document.querySelector('.popup_calc_end');
							modal.style.display = 'none';
							document.body.style.overflow = '';

							// закрть все остальные модалки на всякий случай
							document.querySelectorAll('[data-modal]').forEach((win) => {
								win.style.display = 'none';
							});
						}, 2500);
					}
					setTimeout(() => {
						statusMessage.remove();
					}, 1800);
				});
		});
	});
};

export default forms;
