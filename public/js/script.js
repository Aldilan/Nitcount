//funct darkMode
const darkMode = document.querySelector('#mode')
const htmlTag = document.getElementById('htmlTag')
darkMode.addEventListener('click', function (e) {
    htmlTag.classList.toggle('dark')
    if (e.target.getAttribute('alt') == 'sun') {
        e.target.setAttribute('src','public/img/moon.png')
        e.target.setAttribute('alt','moon')
    }else if(e.target.getAttribute('alt') == 'moon') {
        e.target.setAttribute('src','public/img/sun.png')
        e.target.setAttribute('alt','sun')
    }
})

//funct navbar
const navbarButtons = document.querySelectorAll('#navbarButton')
const containers = document.querySelectorAll('.container')
navbarButtons.forEach(function (navbarButton) {
    navbarButton.addEventListener('click',function (e) {
        navbarButtons.forEach(function (navbarButton) {
            navbarButton.classList.remove('brightness-0','invert')
        })
        e.target.classList.add('brightness-0','invert')
        containers.forEach(function (container) {
            container.classList.add('hidden')
        })
        if (e.target.getAttribute('alt') == 'calculator') {
            containers[0].classList.remove('hidden')
        }else if (e.target.getAttribute('alt') == 'money') {
            containers[1].classList.remove('hidden')
        }else if (e.target.getAttribute('alt') == 'other') {
            containers[2].classList.remove('hidden')
        }else {
            containers[3].classList.remove('hidden')
        }
    })
})

//function more
const moreButton = document.getElementById('moreButton')
const calculator = document.getElementById('calc')

moreButton.addEventListener('click', function (e) {
    if (calculator.className == 'w-full h-[50vh] bg-blue-300 grid grid-cols-6') {
        calculator.classList.remove('grid-cols-6')  
        calculator.classList.add('grid-cols-4')
    }else {
        calculator.classList.remove('grid-cols-4')
        calculator.classList.add('grid-cols-6')
    }
})

//calculator function
const resetButton = document.getElementById('resetButton')
const resultPage = document.getElementById('resultPage')
const historyPage = document.getElementById('historyPage')
const deleteButton = document.getElementById('deleteButton')
const numberButtons = document.querySelectorAll('#numberButton')
const operationButtons = document.querySelectorAll('#operationButton')
const equalToButton = document.getElementById('equalToButton')

let countArrayOperation = 0
let countOperation = 0
let numbers = []
let subNumbers = []
let operations = []
let hasOperation = false
let histo = ''


numberButtons.forEach(function (numberButton) {
    numberButton.parentElement.addEventListener('click', function (e) {
        if (resultPage.textContent == '0') {
            subNumbers[subNumbers.length-1] = '0'
        }
        if (numbers.length > countArrayOperation && subNumbers != '') {
            subNumbers.push(numberButton.textContent)
            resultPage.textContent += numberButton.textContent
            numbers[numbers.length-1] = subNumbers.join('')
            hasOperation = false
        }else{ 
            subNumbers.push(numberButton.textContent)
            resultPage.textContent += numberButton.textContent
            numbers[numbers.length] = subNumbers.join('')
            hasOperation = false}
    })
})

operationButtons.forEach(function (operationButton) {
    operationButton.addEventListener('click', function (e) {
        if (numbers.length != countArrayOperation) {
            if (hasOperation == false) {
                subNumbers = []
                operations.push(e.target.getAttribute('value'))
                countArrayOperation += 1
                resultPage.textContent += operationButton.textContent
                hasOperation = true
            }            
        }
    })
})

function countTotal() {
    if (numbers.length >= 1 && countArrayOperation > 0) {
        if (hasOperation == false) {
            let total = ''
            let historyCount = ''
            for (let i = 0; i <= numbers.length; i++) {
                if (i == numbers.length) {
                    historyCount = eval(total)
                    total = '= '+eval(total)
                }else if(i == 0){
                    total += numbers[i]
                }else {
                    total += operations[i-1]+numbers[i]
                }
            }
            historyPage.innerHTML = total
            return histo = String(historyCount)
        }
    }
}

setInterval(countTotal,100)

deleteButton.parentElement.addEventListener('click', function (e) {
    if (numbers.length != 0) {
        if (numbers.length > operations.length) {
            subNumberNow = subNumbers[subNumbers.length-1]
            subNumberNow = subNumberNow.slice(0,-1)
            subNumbers[subNumbers.length-1] = subNumberNow
            if (subNumbers[subNumbers.length-1] == '') {
                subNumbers.pop()
            }
            if (subNumbers == '') {
                numbers.pop()
            }else{
                numbers[numbers.length-1] = subNumbers.join('')
            }
        }else{
            subNumbers = [numbers[numbers.length-1]]
            operations.pop()
            hasOperation = false
            countArrayOperation -= 1
        }
        resultPage.innerHTML=resultPage.innerText.slice(0,-1)
    }
})

equalToButton.parentElement.addEventListener('click', function (e) {
    if (numbers.length > 1 && numbers.length > operations.length) {
        resultPage.innerHTML = histo
        historyPage.innerHTML = ' '
        countArrayOperation = 0
        countOperation = 0
        numbers = [histo]
        subNumbers = []
        operations = []
        hasOperation = false
        subNumbers[0] = histo
        histo = ''
    }
})

resetButton.addEventListener('click', function (e) {
    if (subNumbers >= 1) {
        numbers[0] = subNumbers
    }
    if (numbers.length != 0) {
        resultPage.innerHTML = ''
        historyPage.innerHTML = ''
        countArrayOperation = 0
        countOperation = 0
        numbers = []
        subNumbers = []
        operations = []
        hasOperation = false
        histo = ''
    }
})

//funct money container
const moneyMenus = document.querySelectorAll('#moneyMenu div div')
const moneyMenu = document.getElementById('moneyMenu')
const moneyPages = document.querySelectorAll('#moneyPage')
const backMoneys = document.querySelectorAll('#backMoney')

backMoneys.forEach(function name(backMoney) {
    backMoney.addEventListener('click', function (e) {
        moneyPages.forEach(function (moneyPage) {
            moneyPage.classList.add('hidden')
        })
        moneyMenu.classList.remove('hidden')
    })
})

moneyMenus.forEach(function (moneymenu) {
    moneymenu.addEventListener('click', function (e) {
        let moneyPageNow = e.target.getAttribute('value')
        moneyPages.forEach(function (moneyPage) {
            if (moneyPage.getAttribute('value') == moneyPageNow) {
                moneyPage.classList.remove('hidden')
                moneyMenu.classList.add('hidden')
            }else{
                moneyPage.classList.add('hidden')
            }
        })
    })
})

//funct discount
const inputDiscounts = document.querySelectorAll('.discount table tr td input')
const finalPriceDiscount = document.getElementById('finalPriceDiscount')
const saveDiscount = document.getElementById('saveDiscount')

function countDiscount() {
    if (inputDiscounts[0].value != '' && inputDiscounts[1].value != '') {
        finalPriceDiscount.innerHTML=inputDiscounts[0].value-(inputDiscounts[0].value*inputDiscounts[1].value/100)
        saveDiscount.innerHTML=eval(inputDiscounts[0].value-finalPriceDiscount.textContent)

    }else {
        finalPriceDiscount.innerHTML=0
        saveDiscount.innerHTML=0
    }
}

setInterval(countDiscount,100)

//funct tax
const inputTaxs = document.querySelectorAll('.tax table tr td input')
const finalPriceTax = document.getElementById('finalPriceTax')
const totalTax = document.getElementById('totalTax')

function countTax() {
    if (inputTaxs[0].value != '' && inputTaxs[1].value != '') {
        let tax = inputTaxs[0].value*inputTaxs[1].value/100
        finalPriceTax.innerHTML=eval(parseInt(inputTaxs[0].value)+tax)
        totalTax.innerHTML=eval(inputTaxs[0].value*inputTaxs[1].value/100)
    }else {
        finalPriceTax.innerHTML=0
        totalTax.innerHTML=0
    }
}

setInterval(countTax,100)

//funct tax
const inputInterests = document.querySelectorAll('.interest table tr td input')
const finalPriceInterest = document.getElementById('finalPriceInterest')
const totalInterest = document.getElementById('totalInterest')

function countInterest() {
    if (inputInterests[0].value != '' && inputInterests[1].value != '' && inputInterests[2].value != '') {
        let interest = inputInterests[0].value*inputInterests[1].value/100*inputInterests[2].value
        finalPriceInterest.innerHTML=eval(parseInt(inputInterests[0].value)+interest)
        totalInterest.innerHTML=interest
    }else {
        finalPriceInterest.innerHTML=0
        totalInterest.innerHTML=0
    }
}

setInterval(countInterest,100)

//funct other container
const otherMenus = document.querySelectorAll('#otherMenu div div')
const otherMenu = document.getElementById('otherMenu')
const otherPages = document.querySelectorAll('#otherPage')
const backOthers = document.querySelectorAll('#backOther')

backOthers.forEach(function name(backOther) {
    backOther.addEventListener('click', function (e) {
        otherPages.forEach(function (otherPage) {
            otherPage.classList.add('hidden')
        })
        otherMenu.classList.remove('hidden')
    })
})

otherMenus.forEach(function (othermenu) {
    othermenu.addEventListener('click', function (e) {
        let otherPageNow = e.target.getAttribute('value')
        otherPages.forEach(function (otherPage) {
            if (otherPage.getAttribute('value') == otherPageNow) {
                otherPage.classList.remove('hidden')
                otherMenu.classList.add('hidden')
            }else{
                otherPage.classList.add('hidden')
            }
        })
    })
})

//funct bmi
const inputBmis = document.querySelectorAll('.bmi table tr td input')
const finalBmi = document.getElementById('finalBmi')
const categoryBmi = document.getElementById('categoryBmi')

function countBmi() {
    if (inputBmis[0].value != '' && inputBmis[1].value != '') {
        let bmi = Math.ceil(eval(inputBmis[0].value/((inputBmis[1].value/100)*(inputBmis[1].value/100))))
        finalBmi.innerHTML= bmi
        if (bmi < 18.5) {
            categoryBmi.innerHTML = 'underweight'
        }else if (bmi < 25) {
            categoryBmi.innerHTML = 'normal'
        }else {
            categoryBmi.innerHTML = 'overweight'
        }
    }else {
        finalBmi.innerHTML=0
        categoryBmi.innerHTML=0
    }
}

setInterval(countBmi,100)