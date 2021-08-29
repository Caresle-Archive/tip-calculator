const inputBill = document.getElementById('inputBill')
const inputPerson = document.getElementById('inputPerson')
const inputBtn = document.getElementById('btn-custom')
const inputs = document.querySelectorAll('input')

const tipTotalPerson = document.getElementById('tip-total-text')
const tipPerson = document.getElementById('tip-person-text')

const resetButton = document.getElementById('reset-button')
const buttonsBill = document.querySelectorAll('.btn-bill')

const errorMessage = document.getElementById('error-message')
errorMessage.innerHTML = ''
let btnActive = ''

const addStyle = (ele, addS, remS) => {
	ele.classList.remove(remS)
	ele.classList.add(addS)
}

// Add the style before click the button
const removeBtnActive = (btn, remS, addS) => {
	if (btn !== '') {
		addStyle(btn, addS, remS)
	}
}

const clickBillButton = (e) => {
	const btn = e.target
	removeBtnActive(btnActive, 'btn-primary', 'btn-primary-dark')
	addStyle(btn, 'btn-primary', 'btn-primary-dark')
	btnActive = btn
	amount()
}

// Set the value to zero in case of NaN
const setValueToZero = (val) => {
	val = parseFloat(val)
	val = (isNaN(val)) ? 0 : val
	return val
}

// Calc and set the tips text
const calcTip = (bill, people, tipPercent) => {
	const totalPerson = (bill / people * (1 + tipPercent))
	const tipInd = (bill / people * tipPercent)
	tipTotalPerson.innerHTML = totalPerson.toFixed(2)
	tipPerson.innerHTML = tipInd.toFixed(2)
}

const amount = () => {
	let inputBillValue = 0
	let inputPersonValue = 0
	let inputBtnValue = 0
	
	inputBillValue = setValueToZero(inputBill.value)
	inputPersonValue = setValueToZero(inputPerson.value)
	inputBtnValue = setValueToZero(inputBtn.value)
	if (inputPersonValue === 0) {
		inputPerson.classList.add('input-danger')
		errorMessage.innerHTML = 'can\'t be zero'
		return
	} else {
		inputPerson.classList.remove('input-danger')
		errorMessage.innerHTML = ''
	}

	if (inputBtnValue === 0) {
		let tipPercent = document.querySelector('.btn-primary').value
		tipPercent = setValueToZero(tipPercent)
		totalPerson = (inputBillValue / inputPersonValue * (1 + tipPercent))
		calcTip(inputBillValue, inputPersonValue, tipPercent)
	} else {
		inputBtnValue = inputBtnValue / 100
		calcTip(inputBillValue, inputPersonValue, inputBtnValue)
	}
}

window.addEventListener('load', () => {
	if (inputPerson.value !== '' && inputBill.value !== '') {
		resetButton.disabled = false
	}

	for (const button of buttonsBill) {
		button.addEventListener('click', clickBillButton)
	}

	for (const input of inputs) {
		input.addEventListener('change', amount)
		input.addEventListener('focusout', amount)
	}

	inputBtn.addEventListener('click', () => {
		removeBtnActive(btnActive, 'btn-primary', 'btn-primary-dark')
	})

	resetButton.addEventListener('click', () => {
		tipTotalPerson.innerHTML = 0
		tipPerson.innerHTML = 0
	})
})

