(function(){
    "use strict";
    console.log('reading js');

    const myForm = document.querySelector('#madLibsForm');
    const storyOverlay = document.querySelector('#output');
    const professorPic = document.querySelector('#professorPicture');
    const pokemonImage = document.querySelector('#pokemonImage')

    myForm.addEventListener('submit', function (e){
        e.preventDefault();

        const name = document.querySelector('#name').value;
        const adj = document.querySelector('#adj').value;
        const town = document.querySelector('#town').value;
        const starter = document.querySelector('#starter').value;
        const exclamation = document.querySelector('#exclamation').value;
        const move = document.querySelector('#move').value;
        const rival = document.querySelector('#rival').value;

        if (name === ''){
            alert('Please enter a name for your trainer!');
            document.querySelector('#name').focus();
        }
        else if (adj === ''){
            alert('Please enter an adjective!');
            document.querySelector('#adj').focus();
        } 
        else if (town === ''){
            alert('Please enter a hometown!');
            document.querySelector('#town').focus();
        } 
        else if (starter === ''){
            alert('Please choose your starter!');
            document.querySelector('#starter').focus();
        } 
        else if (exclamation === ''){
            alert('Please enter an exclamation!');
            document.querySelector('#exclamation').focus();
        } 
        else if (move === ''){
            alert('Please enter an attack name!');
            document.querySelector('#move').focus();
        } 
        else if (rival === ''){
            alert('Please enter a name for your rival!');
            document.querySelector('#rival').focus();
        } 
        else {
            document.querySelector('#out-name1').textContent = name;
            document.querySelector('#out-name2').textContent = name;
            document.querySelector('#out-name3').textContent = name;
            document.querySelector('#out-name4').textContent = name;
            
            document.querySelector('#out-town').textContent = town;
            document.querySelector('#out-adj').textContent = adj;
            document.querySelector('#out-starter1').textContent = starter;
            document.querySelector('#out-starter2').textContent = starter;
            document.querySelector('#out-exclamation').textContent = exclamation;
            document.querySelector('#out-move').textContent = move;
            document.querySelector('#out-rival1').textContent = rival;
            document.querySelector('#out-rival2').textContent = rival;

            if (starter === "Squirtle"){
                pokemonImage.src = "images/squirtle.png"
                pokemonImage.classList.remove('hidden');
            } 
            else if(starter === 'Bulbasaur'){
                pokemonImage.src = 'images/bulbasaur.png'
                pokemonImage.classList.remove('hidden');
            }
            else if (starter === 'Charmander'){
                pokemonImage.src = 'images/charmander.png'
                pokemonImage.classList.remove('hidden');
            }

            professorPic.classList.add('hidden');
            storyOverlay.classList.remove('hidden');
        }
    });

    const resetButton = document.querySelector('#close');
    resetButton.addEventListener('click', function(){
        storyOverlay.classList.add('hidden');
        professorPic.classList.remove('hidden');
        pokemonImage.classList.add('hidden');

        document.querySelector('#name').value = '';
        document.querySelector('#adj').value = '';
        document.querySelector('#town').value = '';
        document.querySelector('#starter').value = '';
        document.querySelector('#exclamation').value = '';
        document.querySelector('#move').value = '';
        document.querySelector('#rival').value = '';
    });
})();