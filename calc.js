const numbers = document.querySelectorAll('.numbers')
const cancel = document.querySelector('.cancel')
const arithmeticOps = document.querySelectorAll('.arithmetic-ops')
const deleteBtn = document.querySelector('.delete')
const equal = document.querySelector('.equal')
const dot = document.querySelector('.dot')

let display = document.querySelector('.calc-display')
let result = 0;
let currentNumber = '0';
let prevNumber;
let operation;

function calcResult(operation, newOp) {
    if (operation == '+') {
        if (newOp) {
            result += Number(currentNumber)
        } else {
            result = Number(prevNumber) + Number(currentNumber)
        }

    } else if (operation == '-') {
        if (newOp) {
            result -= Number(currentNumber)
        } else {
            result = Number(prevNumber) - Number(currentNumber)
        }

    } else if (operation == '*') {
        if (newOp) {
            result *= Number(currentNumber)
        } else {
            result = Number(prevNumber) * Number(currentNumber)
        }

    } else if (operation == '/') {
        if (newOp) {
            result /= Number(currentNumber)
        } else {
            result = Number(prevNumber) / Number(currentNumber)
        }

    }
}
// display number

for (let num of numbers) {
    num.addEventListener('click', function () {

        let pushedNumber = num.innerText
        if (currentNumber == '0') {
            currentNumber = pushedNumber
        } else {
            currentNumber += pushedNumber
            if (operation != undefined) {
                calcResult(operation, false)
            }
        }

        if (display.innerText == '0' && pushedNumber == '0') return

        if (display.innerText == '0') {
            display.innerText = pushedNumber
        } else {
            let lastSymbol = display.innerText[display.innerText.length - 1]
            if (lastSymbol == '+' || lastSymbol == '-' || lastSymbol == '*' || lastSymbol == '/') {
                if(result == 0){
                    calcResult(lastSymbol, false)
                } else {
                    calcResult(lastSymbol, true)
                }
                operation = lastSymbol
            }
            display.innerText += pushedNumber
        }

    })
}

// cancel

cancel.addEventListener('click', function () {
    display.innerText = '0'
    currentNumber = '0'
    prevNumber = '0'
    result = 0
})

// display arithmetic ops

for (const item of arithmeticOps) {
    item.addEventListener('click', function () {
        let lastSymbol = display.innerText[display.innerText.length - 1]
        if (lastSymbol == '+' || lastSymbol == '-' || lastSymbol == '*' || lastSymbol == '/') return

        if (display.innerText == '0') {

        } else if (item.classList.contains('plus')) {

            display.innerText += '+'

        } else if (item.classList.contains('minus')) {

            display.innerText += '-'

        } else if (item.classList.contains('multiply')) {

            display.innerText += '*'

        } else if (item.classList.contains('divide')) {

            display.innerText += '/'

        }
        prevNumber = currentNumber
        currentNumber = '0'
    })
}

// delete

deleteBtn.addEventListener('click', function () {
    if (display.innerText == '0') return

    let displayArr = display.innerText.split('')
    displayArr.pop()
    if (displayArr.length == 0) {
        display.innerText = '0'
    } else {
        display.innerText = displayArr.join('')
    }

    currentNumberArr = currentNumber.split('')
    currentNumberArr.pop()
    if (currentNumberArr.length == 0) {
        currentNumber = '0'
    } else {
        currentNumber = currentNumberArr.join('')
    }
    calcResult(operation, false)
})

// show result

equal.addEventListener('click', function () {
    display.innerText = result
    prevNumber = '0'
    currentNumber = result
})

dot.addEventListener('click', function() {
    let lastSymbol = display.innerText[display.innerText.length - 1]
    if(lastSymbol == '.'){
        return
    }
    currentNumber += '.'
    display.innerText += '.'
})