(function() {
    'use strict';
    console.log('running js');

    const cardImages = [
        'experiment/images/pikachu.png',
        'experiment/images/mew.png',
        'experiment/images/megacharizard.png',
        'experiment/images/umbreon.png',
        'experiment/images/charizard.png'
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

})();