const bill = document.getElementById('bill')
const tipAmount = document.getElementById('tip')
const custom = document.getElementById('custom')
const peopleNo = document.getElementById('people-no')
const total = document.getElementById('total')
const btn = document.getElementById('btn')
const peopleDiv = document.querySelector('.people-div')
const tipSelected = document.querySelectorAll('.tip-selected')
const tipMessage = document.getElementById('check-percentage')

let inputBill = ''
let inputPeople = ''
let customTip = ''
let tipPerPerson = ''

bill.addEventListener('input', (e) => {
  inputBill = parseFloat(e.target.value)
})

peopleNo.addEventListener('input', (e) => {
  remove()
  inputPeople = parseInt(e.target.value)
  if (inputPeople === 0) {
    peopleDiv.innerHTML += `
            <h3>Can't be Zero</h3
        `
  } else if (inputPeople < 0) {
    peopleDiv.innerHTML += `
            <h3>Can't be Negative</h3
        `
  }
})

tipSelected.forEach((tip) => {
  tip.addEventListener('click', (e) => {
    if (inputBill > 0 && inputPeople > 0) {
      let tipPercentage = e.target.innerText
      tipPercentage = parseInt(
        tipPercentage.substr(0, tipPercentage.length - 1)
      )
      calculateTip(tipPercentage)
      calculateTotal(inputBill)
    }
  })
})

custom.addEventListener('input', (e) => {
  let customPercentage = parseFloat(e.target.value)
  remove()
  if (checkPercentage(customPercentage)) {
    if (inputBill > 0 && inputPeople > 0) {
      calculateTip(customPercentage)
      calculateTotal(inputBill)
    }
  }
})

btn.addEventListener('click', () => {
  bill.value = ''
  peopleNo.value = ''
  custom.value = ''
  tipAmount.innerText = '0.00'
  total.innerText = '0.00'
  inputBill = 0
  inputPeople = 0
  customTip = 0
  tipPerPerson = 0
})

function calculateTip(Percentage) {
  if (Percentage >= 1) {
    let totalTip = ((Percentage / 100) * inputBill) / inputPeople

    tipAmount.innerText = totalTip.toFixed(2)
    tipPerPerson = totalTip
  } else {
    tipAmount.innerText = '0.00'
  }
}

function calculateTotal(amount) {
  if (amount >= 1) {
    let totalAmount = (inputBill + tipPerPerson) / inputPeople

    total.innerText = totalAmount.toFixed(2)
  } else {
    total.innerText = '0.00'
  }
}

function checkPercentage(Percentage) {
  if (Percentage > 100) {
    tipMessage.classList.add('active')
    return false
  } else return true
}

function remove() {
  peopleDiv.innerHTML = `
    <label for="people-no"> Number of People</label>
    `
  tipMessage.classList.remove('active')
}
