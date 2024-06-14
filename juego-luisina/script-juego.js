const totalCards = 8;
let cards =[];
let selectCards=[];
let used =[];
let cantMov=0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

for (let i=0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
 }