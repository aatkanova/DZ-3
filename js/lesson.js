//phone checker
const phoneInput = document.querySelector('#phone_input');
const phoneCheck = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

// const regExp = new RegExp('n', 'gi')
const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneCheck.onclick = () => {
    if (regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    }else{
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}

//tab slider

const tabContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

const hideTabContent = () => {
    tabContent.forEach((item)=>{
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContent[index].style.display='block'
    tabs[index].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent(0)

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((item, i) => {
            if (event.target === item ){
                hideTabContent()
                showTabContent(i)
            }
        })
    }
}   

let index = 0

const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if (i > tabs.length - 1) {
            i = 0
        }
        hideTabContent()
        showTabContent(i)
    }, 3000)
}

autoSlider(index)

//convertor

function setupCurrencyConverter() {
    const som = document.querySelector('#som');
    const usd = document.querySelector('#usd');
    const eur = document.querySelector('#eur');

    const request = new XMLHttpRequest();
    request.open("GET", "../data/convertor.json");
    request.setRequestHeader("Content-type", "application/json");
    request.send();

    request.onload = () => {
        const response = JSON.parse(request.response);
        const usdExchangeRate = response.usd;
        const eurExchangeRate = response.eur;

        function updateSomValue(inputValue) {
            if (!isNaN(inputValue)) {
                usd.value = (inputValue / usdExchangeRate).toFixed(2);
                eur.value = (inputValue / eurExchangeRate).toFixed(2);
            } else {
                usd.value = "";
                eur.value = "";
            }
        }

        function updateUsdValue(inputValue) {
            if (!isNaN(inputValue)) {
                som.value = (inputValue * usdExchangeRate).toFixed(2);
                eur.value = (inputValue * (usdExchangeRate / eurExchangeRate)).toFixed(2);
            } else {
                som.value = "";
                eur.value = "";
            }
        }

        function updateEurValue(inputValue) {
            if (!isNaN(inputValue)) {
                som.value = (inputValue * eurExchangeRate).toFixed(2);
                usd.value = (inputValue * (eurExchangeRate / usdExchangeRate)).toFixed(2);
            } else {
                som.value = "";
                usd.value = "";
            }
        }

        som.oninput = () => {
            const inputValue = parseFloat(som.value);
            updateSomValue(inputValue);
        };

        usd.oninput = () => {
            const inputValue = parseFloat(usd.value);
            updateUsdValue(inputValue);
        };

        eur.oninput = () => {
            const inputValue = parseFloat(eur.value);
            updateEurValue(inputValue);
        };
    };
}

setupCurrencyConverter();





// som.addEventListener('input', (event) => {
//     const request = new XMLHttpRequest()
//     request.open("GET", "../data/convertor.json")
//     request.setRequestHeader("Content-type", "application/json")
//     request.send()

//     request.addEventListener('load', () => {
//         const responce = JSON.parse(request.response)
//         usd.value = (som.value / responce.usd).toFixed(2)
//     })
// })