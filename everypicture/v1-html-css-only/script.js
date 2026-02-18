(function() {
    'use strict';
    console.log('running js');

    const cardImages = [
        'images/pikachu.png',
        'images/mew.png',
        'images/megacharizard.png',
        'images/umbreon.png',
        'images/charizard.png'
    ];

    let currentStep = 0;

    const openBtn = document.querySelector('#open-button');
    const nextBtn = document.querySelector('#next-button');
    const resetBtn = document.querySelector('#reset-button');
    const overlay = document.querySelector('#overlay');
    const cardImg = document.querySelector('#current-card');

    openBtn.addEventListener('click', function() {
        overlay.classList.remove('hidden');
        showCard();
    });

    nextBtn.addEventListener('click', function() {
        currentStep++;
        
        if (currentStep < cardImages.length) {
            showCard();
        } else {
            nextBtn.classList.add('hidden');
            resetBtn.classList.remove('hidden');
        }
    });

    resetBtn.addEventListener('click', function() {
        currentStep = 0;
        overlay.classList.add('hidden');
        nextBtn.classList.remove('hidden');
        resetBtn.classList.add('hidden');
    });

    function showCard() {
    cardImg.src = cardImages[currentStep];

    cardImg.classList.add('card-animation');
}

cardImg.addEventListener('animationend', function() {
    cardImg.classList.remove('card-animation');
});

const cardStories = [
    "This Pikachu was the first big pull my girlfriend Trish and I hit. It really catapulted us into the hobby of collecting! Although Pokemon is really expensive, I wouldn't trade any of the experiences going out and looking for cards with Trish for anything in the world.",
    "This Mew was all Trish! There were multiple boxes of Paldean Fates (the set that this card is from) in the card shop, but Trish said she had a good feeling about this box. Lo and behold, we got the Bubble Mew! One of the cutest cards in my collection and definitely my favorite.",
    "For this Mega Charizard, I pulled it in the last pack out of 18 packs from a box I got at Target. I pulled it in front of Trish and all my housemates and it was a crazy surreal feeling.",
    "This Umbreon is in Japanese, and that's because it's from Terastal Festival, a Japanese set. What's crazy about the story for this card is that we pulled it out of a god pack, which is when every single card is an SIR.",
    "Another card that was sniped by Trish! We bought a pack of 151 at Whynot Boba in Downtown Davis, and from that single pack we pulled the best card in the set. It was Trish's first huge pull, and she never lets me forget it."
];

const cardCounter = document.querySelector('#card-counter');
const cardStory = document.querySelector('#story');

function showCard() {
    cardImg.src = cardImages[currentStep];
    cardCounter.textContent = `Card ${currentStep + 1} of ${cardImages.length}`;
    cardStory.textContent = cardStories[currentStep];
    cardImg.classList.add('card-animation');
}

})();