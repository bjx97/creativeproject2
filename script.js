const select = document.querySelectorAll('select');
const input = document.querySelectorAll('input');
const url = "https://api.exchangeratesapi.io/latest";
let boxNames = '';

async function exchange() {
    const response = await fetch(url);
    const data = await response.json();
    const countryNames = Object.keys(data.rates);
    const rates = data.rates;

    countryNames.map(item =>{
        return boxNames += `<option value=${item}>${item}</option>`;
    });

    for(let i = 0; i < select.length; i++) {
        select[i].innerHTML = boxNames;
    };

    function convertCurrent(first,second) {
        input[first].value = input[second].value * rates[select[first].value] / rates[select[second].value];
    }
    
    input[0].addEventListener('keyup', () => convertCurrent(1,0));
    input[1].addEventListener('keyup', () => convertCurrent(0,1));
    select[0].addEventListener('change', () => convertCurrent(1,0));
    select[1].addEventListener('change', () => convertCurrent(0,1));
};

exchange();