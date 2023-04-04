const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.querySelector('.popup')
const allInput = document.querySelectorAll('.form-box input')

const eyeBtns = document.querySelectorAll('.form-box .fa-regular')

const showHidePassword = e => {
	e.preventDefault()
	if (e.target.matches('.fa-eye')) {
		e.target.classList.remove('fa-eye')
		e.target.classList.add('fa-eye-slash')
		e.target.previousElementSibling.setAttribute('type', 'text')
	} else {
		e.target.classList.remove('fa-eye-slash')
		e.target.classList.add('fa-eye')
		e.target.previousElementSibling.setAttribute('type', 'password')
	}
}


const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')
	
	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkLenght = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.textContent.slice(0, -1)} składa się z min. ${min} znaków`)
		// previousElementSibling - poprzednie rodzeństwo elementu
	}
}

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Hasła do siebie nie pasują')
	}
}

const checkMail = email => {
	const re =
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	
	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'E-mail jest nieprawidłowy')
	}
}

const checkErrors = () => {
	const allFormBox = document.querySelectorAll('.form-box')
	let errorCount = 0
	
	allFormBox.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})
	
	if (errorCount === 0) {
		popup.classList.add('show-popup')
	}
}
eyeBtns.forEach(el => {
	el.addEventListener('click', showHidePassword)
})

sendBtn.addEventListener('click', e => {
	e.preventDefault()
	
	checkForm(allInput)
	checkLenght(username, 4)
	checkLenght(pass, 8)
	checkPassword(pass, pass2)
	checkMail(email)
	checkErrors()
})

clearBtn.addEventListener('click', e => {
	e.preventDefault()

	allInput.forEach(el => {
		el.value = ''
		clearError(el)
	})
})
