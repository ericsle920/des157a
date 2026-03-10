(function () {
    'use strict';
    console.log('reading js');

    // pokemon array
    const pokemonData = [
        { name: "Pikachu", s: "images/pikachu_s.svg", r: "images/pikachu.png" },
        { name: "Charmander", s: "images/charmander_s.svg", r: "images/charmander.png" },
        { name: "Squirtle", s: "images/squirtle_s.svg", r: "images/squirtle.png" },
        { name: "Bulbasaur", s: "images/bulbasaur_s.svg", r: "images/bulbasaur.png" },
        { name: "Ditto", s: "images/ditto_s.svg", r: "images/ditto.png" },
        { name: "Gengar", s: "images/gengar_s.svg", r: "images/gengar.png" },
        { name: "Piplup", s: "images/piplup_s.png", r: "images/piplup.png" },
        { name: "Jigglypuff", s: "images/jigglypuff_s.svg", r: "images/jigglypuff.png" },
        { name: "Snorlax", s: "images/snorlax_s.svg", r: "images/snorlax.png" },
        { name: "Psyduck", s: "images/psyduck_s.svg", r: "images/psyduck.png" }
    ];

    // forgot what it was called but like organizing the state
    let score = 0;
    let currentRound = 0;
    const totalRounds = 10;

    // hella variables
    const landingScreen = document.querySelector('#landing');
    const gameScreen = document.querySelector('#game');
    const resultsScreen = document.querySelector('#results-screen');
    const pokemonImg = document.querySelector('#pokemon-image');
    const progressBar = document.querySelector('#progress-bar');
    const roundIndicator = document.querySelector('#round');
    const scoreIndicator = document.querySelector('#score');
    const finalScoreText = document.querySelector('#final-score');
    const overlay = document.querySelector('#feedback-overlay');
    const feedbackText = document.querySelector('#feedback-text');
    const itWasText = document.querySelector('#it-was-text');

    const bgMusic = document.querySelector('#bg-music');
    const introVoice = document.querySelector('#intro-voice');
    const correctSfx = document.querySelector('#correct-sfx');
    const wrongSfx = document.querySelector('#wrong-sfx');
    const revealVoice = document.querySelector('#reveal-voice');
    const volumeSlider = document.querySelector('#volume-slider');
    const muteBtn = document.querySelector('#mute-btn');

    const choiceBtns = document.querySelectorAll('.choice-btn');

    // randomizing
    function shuffleArray(array) {
        array.sort(function() {
            return Math.random() - 0.5;
        });
    }

    // function to get names, make wrong names, shuffle, put right answer back in, make it so the final answer isn't last
    function getChoices(correctAnswer) {
        let allNames = [];
        
        for (let i = 0; i < pokemonData.length; i++) {
            allNames.push(pokemonData[i].name);
        }

        let wrongNames = [];
        for (let i = 0; i < allNames.length; i++) {
            if (allNames[i] !== correctAnswer) {
                wrongNames.push(allNames[i]);
            }
        }

        shuffleArray(wrongNames);
        let picks = wrongNames.slice(0, 3);

        picks.push(correctAnswer);

        shuffleArray(picks);
        return picks;
    }

    // functions
    function loadRound() {
        const currentPoke = pokemonData[currentRound];
        
        overlay.classList.add('hidden');

        // reset the buttons
        for (let i = 0; i < choiceBtns.length; i++) {
            choiceBtns[i].classList.remove('correct', 'incorrect', 'disabled');
        }

        pokemonImg.src = currentPoke.s;
        roundIndicator.innerText = (currentRound + 1) + '/' + totalRounds;
        scoreIndicator.innerText = score + ' points';
        
        // progress bar
        let progressPercent = ((currentRound + 1) / totalRounds) * 100;
        progressBar.style.width = progressPercent + '%';

        introVoice.currentTime = 0;
        introVoice.play();

        const choices = getChoices(currentPoke.name);
        for (let i = 0; i < choiceBtns.length; i++) {
            choiceBtns[i].innerText = choices[i];
        }
    }


    // showing the results of the quiz
    function showResults() {
        overlay.classList.add('hidden');
        gameScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        finalScoreText.innerText = score;

        const rosterGrid = document.querySelector('#pokemon-roster-grid');
        rosterGrid.innerHTML = ''; 

        for (let i = 0; i < pokemonData.length; i++) {
            const poke = pokemonData[i];
            const img = document.createElement('img');
            img.src = poke.r; 
            img.classList.add('roster-item');
            img.alt = poke.name;
            // had to ask my friend for help with the lines below
            img.style.animationDelay = (i * 0.1) + 's';
            rosterGrid.appendChild(img);
        }
    }

    // interactive elements
    document.querySelector('#start-btn').addEventListener('click', function() {
        landingScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');

        shuffleArray(pokemonData);

        bgMusic.volume = 0.4;
        bgMusic.play();

        loadRound();
    });


    for (let i = 0; i < choiceBtns.length; i++) {
        choiceBtns[i].addEventListener('click', function(e) {
            const guess = e.target.innerText;
            const currentPoke = pokemonData[currentRound];

            for (let j = 0; j < choiceBtns.length; j++) {
                choiceBtns[j].classList.add('disabled');
            }

            feedbackText.classList.remove('text-correct', 'text-wrong');

            if (guess === currentPoke.name) {
                score++;
                correctSfx.currentTime = 0;
                correctSfx.play();
                e.target.classList.add('correct');
                feedbackText.innerText = "That's Correct!";
                feedbackText.classList.add('text-correct');
            } else {
                wrongSfx.currentTime = 0;
                wrongSfx.play();
                e.target.classList.add('incorrect');
                feedbackText.innerText = "That's Wrong!";
                feedbackText.classList.add('text-wrong');
            }

            // revealing da pokemon
            pokemonImg.src = currentPoke.r;
            itWasText.innerText = "It's " + currentPoke.name + "!";

            setTimeout(function() {
                let nameLower = currentPoke.name.toLowerCase();
                revealVoice.src = 'audio/reveal_' + nameLower + '.mp3';
                revealVoice.play();
                overlay.classList.remove('hidden');
            }, 800);
            // delay so audio hits after pokemon is revealed

            setTimeout(function() {
                if (currentRound < totalRounds - 1) {
                    currentRound++;
                    loadRound();
                } else {
                    showResults();
                }
            }, 3000);
        });
    }

    // audio stuff
    volumeSlider.addEventListener('input', function(e) {
        bgMusic.volume = e.target.value;
    });

    muteBtn.addEventListener('click', function() {
        bgMusic.muted = !bgMusic.muted;
        if (bgMusic.muted) {
            muteBtn.innerText = "🔇";
        } else {
            muteBtn.innerText = "🔊";
        }
    });

    document.querySelector('#restart-btn').addEventListener('click', function() {
        location.reload();
    });

})();