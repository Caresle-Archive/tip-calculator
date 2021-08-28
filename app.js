const inputBill = document.getElementById('inputBill')
const inputPerson = document.getElementById('inputPerson')
const valueCard = document.getElementById('value-card')
const resetButton = document.getElementById('reset-button')
const buttonsBill = document.querySelectorAll('.btn-bill')

let btnActive = ''

const addBtnStyle = (btn, addS, remS) => {
	btn.classList.remove(remS)
	btn.classList.add(addS)
}

// Add the style before click the button
const removeBtnActive = (btn, remS, addS) => {
	if (btn.textContent === 'Custom') {
		addBtnStyle(btn, 'btn-gray', 'btn-primary-outline')
		return
	}

	if (btn !== '') {
		addBtnStyle(btn, addS, remS)
	}
}

const clickBillButton = (e) => {
	const btn = e.target
	if (btn.textContent === 'Custom') {
		removeBtnActive(btnActive, 'btn-primary', 'btn-primary-dark')
		addBtnStyle(btn, 'btn-primary-outline', 'btn-gray')
		btnActive = btn
	} else {
		removeBtnActive(btnActive, 'btn-primary', 'btn-primary-dark')
		addBtnStyle(btn, 'btn-primary', 'btn-primary-dark')
		btnActive = btn
	}
}

window.addEventListener('load', () => {
	if (inputPerson.value !== '' && inputBill.value !== '') {
		resetButton.disabled = false
	}

	for (const button of buttonsBill) {
		button.addEventListener('click', clickBillButton)
	}

	inputBill.addEventListener('change', e => {
		console.log(e)
	})

	inputPerson.addEventListener('change', () => {
		console.log(inputPerson.value)
	})
})

