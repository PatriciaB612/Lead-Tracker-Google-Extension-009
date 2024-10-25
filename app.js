let reads = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const readsFromLocalStorage = JSON.parse(localStorage.getItem('reads'))
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')

if (readsFromLocalStorage) {
  reads = readsFromLocalStorage
  render(reads)
}

tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    reads.push(tabs[0].url)
    localStorage.setItem('reads', JSON.stringify(reads))
    render(reads)
  })
})

inputBtn.addEventListener('click', function () {
  reads.push(inputEl.value)
  inputEl.value = ''
  localStorage.setItem('reads', JSON.stringify(reads))
  render(reads)
})

function render(arr) {
  let arrItems = ''
  for (let i = 0; i < arr.length; i++) {
    arrItems += `<li><a href="${arr[i]}" target="_blank">${arr[i]}</a></li>`
  }
  ulEl.innerHTML = arrItems
}

deleteBtn.addEventListener('click', function () {
  reads = []
  localStorage.clear()
  render(reads)
})
