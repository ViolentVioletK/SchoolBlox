// Wordle clone - super simple
const words = ["apple","brick","chair","dance","eagle"];
let answer = words[Math.floor(Math.random() * words.length)];
let attempts = 0;

function startWordle(){
    const container = document.getElementById("wordleGame");
    container.innerHTML = `<input type="text" id="guessInput" maxlength="5" placeholder="Guess 5-letter word">
                           <button onclick="checkWord()">Guess</button>
                           <div id="wordleOutput"></div>`;
}

function checkWord(){
    let guess = document.getElementById("guessInput").value.toLowerCase();
    let output = document.getElementById("wordleOutput");

    if(guess.length !== 5){
        alert("Word must be 5 letters!");
        return;
    }

    attempts++;
    if(guess === answer){
        output.innerHTML += `<p>✅ You guessed it in ${attempts} tries! The word was ${answer}.</p>`;
        answer = words[Math.floor(Math.random() * words.length)];
        attempts = 0;
    } else {
        output.innerHTML += `<p>❌ ${guess} is wrong!</p>`;
    }

    document.getElementById("guessInput").value = "";
}

startWordle();
