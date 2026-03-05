(function() {
    'use strict';

    // array for cards
    const cardImages = [
        'images/pikachu.png',
        'images/mew.png',
        'images/megacharizard.png',
        'images/umbreon.png',
        'images/charizard.png'
    ];


    // for the card glows
    const cardGlows = [
        '#f6e652', // yellow 4 pikachu
        '#32c2ffff', // blue 4 shiny mew
        '#ffdb4bff', // gold for gold mega charizard
        '#7c52ff', // umbreon
        '#ff4be7ff'  // sunset charizard
    ];

    // array for stories of how i got cards
    const cardStories = [
        "This Pikachu was the first big pull my girlfriend Trish and I hit. It really catapulted us into the hobby of collecting! Although Pokemon is really expensive, I wouldn't trade any of the experiences going out and looking for cards with Trish for anything in the world.",
        "This Mew was all Trish! There were multiple boxes of Paldean Fates in the card shop, but Trish said she had a good feeling about this box. Lo and behold, we got the Bubble Mew! One of the cutest cards in my collection and definitely my favorite.",
        "For this Mega Charizard, I pulled it in the last pack out of 18 packs from a box I got at Target. I pulled it in front of Trish and all my housemates and it was a crazy surreal feeling.",
        "This Umbreon is in Japanese, and that's because it's from Terastal Festival, a Japanese set. What's crazy about the story for this card is that we pulled it out of a god pack, which is when every single card is an SIR.",
        "Another card that was sniped by Trish! We bought a pack of 151 at Whynot Boba in Downtown Davis, and from that single pack we pulled the best card in the set. It was Trish's first huge pull, and she never lets me forget it."
    ];

    let currentStep = 0;

    // all my consts
    const openBtn = document.querySelector('#open-button');
    const prevBtn = document.querySelector('#prev-button'); 
    const nextBtn = document.querySelector('#next-button');
    const resetBtn = document.querySelector('#reset-button');
    const overlay = document.querySelector('#overlay');
    const cardImg = document.querySelector('#current-card');
    const cardCounter = document.querySelector('#card-counter');
    const cardStory = document.querySelector('#card-story');


    // open card
    openBtn.addEventListener('click', function() {
        overlay.classList.remove('hidden');
        showCard();
    });

    // next card
    nextBtn.addEventListener('click', function() {
        if (currentStep < cardImages.length - 1) {
            currentStep++;
            showCard();
        }
    });

    // previous card
    prevBtn.addEventListener('click', function() {
        if (currentStep > 0) {
            currentStep--;
            showCard();
        }
    });

    // start over
    resetBtn.addEventListener('click', function() {
        currentStep = 0; 
        overlay.classList.add('hidden'); 
        showCard();
    });

    // updates the c,ard story text and buttons
    function showCard() {
        cardImg.src = cardImages[currentStep];
        cardCounter.textContent = `Card ${currentStep + 1} of ${cardImages.length}`;
        cardStory.textContent = cardStories[currentStep];

        cardImg.classList.remove('card-animation');

        setTimeout(function() {
            cardImg.classList.add('card-animation');
        }, 10);

        if (currentStep === 0) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        if (currentStep === cardImages.length - 1) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }
    }

    
    cardImg.addEventListener('animationend', function() {
        cardImg.classList.remove('card-animation');
    });

    // glow animations
    cardImg.addEventListener('mouseenter', function() {
        cardImg.style.boxShadow = `0 0 50px ${cardGlows[currentStep]}`;
    });

    cardImg.addEventListener('mouseleave', function() {
        cardImg.style.boxShadow = 'none';
    });

    // added improvements
    const pokemonPack = document.querySelector('#pokemon-pack');

    pokemonPack.addEventListener('click', function() {
        overlay.classList.remove('hidden');
        showCard();
    });

    openBtn.addEventListener('click', function() {
        overlay.classList.remove('hidden');
        showCard();
    });
})();