const bill = document.getElementById('bill')
const tipAmount = document.getElementById('tip')
const custom = document.getElementById('custom')
const peopleNo = document.getElementById('people-no')
const total = document.getElementById('total')
const btn = document.getElementById('btn')
const peopleDiv = document.querySelector('.people-div')
const tipSelected = document.querySelectorAll('.tip-selected')

let inputBill = ''
let inputPeople = ''
let customTip = ''
let tipPerPerson = ''

bill.addEventListener('input', (e) => {
  inputBill = +e.target.value
})

peopleNo.addEventListener('input', (e) => {
  remove()
  inputPeople = +e.target.value
  if (inputPeople === 0) {
    peopleDiv.innerHTML += `
            <h3>Can't be Zero</h3
        `
    console.log(inputPeople)
  } else if (inputPeople < 0) {
    peopleDiv.innerHTML += `
            <h3>Can't be Negative</h3
        `
  }
})

tipSelected.forEach((tip) => {
  tip.addEventListener('click', (e) => {
    let tipPercentage = e.target.innerText
    tipPercentage = +tipPercentage.substr(0, tipPercentage.length - 1)
    calculateTip(tipPercentage)
    calculateTotal(inputBill)
  })
})

custom.addEventListener('input', (e) => {
  let customPercentage = +e.target.value
  if (inputBill > 0 && inputPeople > 0) {
    calculateTip(customPercentage)
    calculateTotal(inputBill)
  }
})

btn.addEventListener('click', () => {
  location.reload()
})

function calculateTip(Percentage) {
  if (Percentage >= 1) {
    let totalTip = ((Percentage / 100) * inputBill) / inputPeople

    tipAmount.innerText = totalTip
    tipPerPerson = totalTip
  } else {
    tipAmount.innerText = '0.00'
  }
}

function calculateTotal(amount) {
  if (amount >= 1) {
    let totalAmount = (inputBill + tipPerPerson) / inputPeople

    total.innerText = totalAmount
  } else {
    total.innerText = '0.00'
  }
}

function remove() {
  peopleDiv.innerHTML = `
    <label for="people-no"> Number of People</label>
    `
}
