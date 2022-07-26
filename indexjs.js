let myleads = []
const inputel = document.querySelector('#input-el')
const inputbtn = document.querySelector('#input-btn')
const ulel = document.querySelector('#ul-el')
const tagbtn = document.querySelector('#tag-btn')
const resetbtn = document.querySelector('#reset-btn')

if (JSON.parse(localStorage.getItem("myleads"))){
    myleads = JSON.parse(localStorage.getItem("myleads"))
    renderlist(myleads)
}
else renderlist(myleads)

inputbtn.addEventListener("click", function () {
    if (inputel.value == "") return
    myleads.push(inputel.value)
    inputel.value = ""
    localStorage.setItem("myleads", JSON.stringify(myleads))     
    renderlist(myleads)
})

tagbtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify(myleads))
        renderlist(myleads)
    })
    
})

resetbtn.addEventListener("click", function () {
    myleads = []
    localStorage.clear()
    renderlist(myleads)
})

function renderlist(leads) {
    //console.log(myleads)
    ulel.textContent = ""
    for (let i = 0; i < myleads.length; i++) {
        ulel.innerHTML += `
        <li>
         <a target='_blank' href =${myleads[i]}>
          ${myleads[i]}
        </li>
        `
    }
}


