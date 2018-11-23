const col = 4;
const row = 3;
const colorArray = ['orange','orange','blue','blue','black','black','pink','pink','brown','brown','yellow','yellow'];
let randomColorArry = [];
for(let i=0;colorArray.length>0;i++) {
    randomColorArry = randomColorArry.concat(colorArray.splice(Math.floor(Math.random() * colorArray.length),1));
}
const cardSetting = function(col, row) {
    for(let i=0,max=(col*row);i<max;i++) {
    const   card      = document.createElement('div'),
            cardInner = document.createElement('div'),
            cardFront = document.createElement('div'),
            cardBack  = document.createElement('div');

            card.className = 'card';
            cardInner.className = 'card-inner';
            cardFront.className = 'card-front';
            cardBack.className = 'card-back';
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            cardBack.style.backgroundColor = randomColorArry[i];
            card.addEventListener('click', function(){
                card.classList.toggle('flipped');
            });
            document.getElementById('wrap').appendChild(card);
        
    }
}
cardSetting(col,row);