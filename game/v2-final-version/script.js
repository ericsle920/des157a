(function (){
    'use strict';
    console.log('reading js');

    // 1. DATA ROSTER
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

    // 2. STATE MANAGEMENT
    let score = 0;
    let currentRound = 0;
    const totalRounds = 10;

    // 3. ELEMENT SELECTORS
    const landingScreen = document.getElementById('landing');
    const gameScreen = document.getElementById('game');
    const resultsScreen = document.getElementById('results-screen');
    const pokemonImg = document.getElementById('pokemon-image');
    const choiceBtns = document.querySelectorAll('.choice-btn');
    const progressBar = document.getElementById('progress-bar');
    const roundIndicator = document.getElementById('round');
    const scoreIndicator = document.getElementById('score');
    const finalScoreText = document.getElementById('final-score');
    const overlay = document.getElementById('feedback-overlay');
    const feedbackText = document.getElementById('feedback-text');
    const itWasText = document.getElementById('it-was-text');

    // Audio Elements
    const bgMusic = document.getElementById('bg-music');
    const introVoice = document.getElementById('intro-voice');
    const correctSfx = document.getElementById('correct-sfx');
    const wrongSfx = document.getElementById('wrong-sfx');
    const revealVoice = document.getElementById('reveal-voice');
    const volumeSlider = document.getElementById('volume-slider');
    const muteBtn = document.getElementById('mute-btn');

    // Fisher-Yates Shuffle Algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // 4. SHUFFLE LOGIC FOR BUTTONS
    function getChoices(correctAnswer) {
        let distractors = pokemonData
            .map(p => p.name)
            .filter(name => name !== correctAnswer);

        distractors.sort(() => Math.random() - 0.5);
        let picks = distractors.slice(0, 3);

        picks.push(correctAnswer);
        return picks.sort(() => Math.random() - 0.5);
    }

    // 5. GAME FUNCTIONS
    function loadRound() {
        const currentPoke = pokemonData[currentRound];

        // Ensure overlay is hidden at start of new round
        overlay.classList.add('hidden');
        
        choiceBtns.forEach(btn => {
            btn.classList.remove('correct', 'incorrect', 'disabled');
        });
        
        pokemonImg.src = currentPoke.s;
        roundIndicator.innerText = `${currentRound + 1}/${totalRounds}`;
        scoreIndicator.innerText = `${score} points`;
        progressBar.style.width = `${((currentRound + 1) / totalRounds) * 100}%`;

        introVoice.currentTime = 0;
        introVoice.play();

        const choices = getChoices(currentPoke.name);
        choiceBtns.forEach((btn, index) => {
            btn.innerText = choices[index];
        });
    }

    function showResults() {
        overlay.classList.add('hidden');
        gameScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        finalScoreText.innerText = score;

        const rosterGrid = document.getElementById('pokemon-roster-grid');
        rosterGrid.innerHTML = ''; // Clear any old icons if playing twice

        // Loop through the (now shuffled) data and add the revealed images
        pokemonData.forEach((poke, index) => {
            const img = document.createElement('img');
            img.src = poke.r; // Use the revealed (.png) version
            img.classList.add('roster-item');
            img.alt = poke.name;
            
            // Stagger the entrance of the icons for a cool effect
            img.style.animationDelay = `${index * 0.1}s`;
            
            rosterGrid.appendChild(img);
        });
    }       

    // 6. EVENT LISTENERS
    document.getElementById('start-btn').addEventListener('click', () => {
        landingScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        // --- RANDOMIZATION TRIGGER ---
        shuffleArray(pokemonData);
        
        bgMusic.volume = 0.4;
        bgMusic.play().catch(e => console.log("Audio play blocked."));
        
        loadRound();
    });

    choiceBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            const guess = e.target.innerText;
            const currentPoke = pokemonData[currentRound];

            choiceBtns.forEach(btn => btn.classList.add('disabled'));
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

            pokemonImg.src = currentPoke.r;
            itWasText.innerText = `It's ${currentPoke.name}!`;
            
            setTimeout(() => {
                revealVoice.src = `audio/reveal_${currentPoke.name.toLowerCase()}.mp3`;
                revealVoice.play();
                overlay.classList.remove('hidden');
            }, 400);

            setTimeout(() => {
                if (currentRound < totalRounds - 1) {
                    currentRound++;
                    loadRound();
                } else {
                    showResults();
                }
            }, 3000); 
        });
    });

    volumeSlider.addEventListener('input', (e) => {
        bgMusic.volume = e.target.value;
    });

    muteBtn.addEventListener('click', () => {
        bgMusic.muted = !bgMusic.muted;
        muteBtn.innerText = bgMusic.muted ? "🔇" : "🔊";
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
        location.reload();
    });

})();