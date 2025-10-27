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
// Simple interactive Sudoku
function startSudoku() {
    const container = document.getElementById("sudokuGame");
    container.innerHTML = "<table id='sudokuTable'></table>";

    let table = document.getElementById("sudokuTable");
    for (let r = 0; r < 9; r++) {
        let row = table.insertRow();
        for (let c = 0; c < 9; c++) {
            let cell = row.insertCell();
            let input = document.createElement("input");
            input.type = "number";
            input.min = 1;
            input.max = 9;
            input.style.width = "30px";
            input.style.textAlign = "center";
            cell.appendChild(input);
        }
    }
}

startSudoku();
// Word Search
function startWordSearch() {
    const container = document.getElementById("wordsearchGame");
    container.innerHTML = "<div id='wordsearchGrid'></div><p>Find these words: CAT, DOG, SUN</p>";

    const words = ["CAT", "DOG", "SUN"];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let gridHTML = "";

    for (let r = 0; r < 8; r++) {
        gridHTML += "<div style='display:flex'>";
        for (let c = 0; c < 8; c++) {
            let span = `<span class='wsCell'>${letters[Math.floor(Math.random()*26)]}</span>`;
            gridHTML += span;
        }
        gridHTML += "</div>";
    }

    container.innerHTML += gridHTML;

    // Optional: clicking highlights letters
    document.querySelectorAll(".wsCell").forEach(cell => {
        cell.onclick = function() {
            if (cell.style.backgroundColor === "yellow") cell.style.backgroundColor = "";
            else cell.style.backgroundColor = "yellow";
        }
    });
}

startWordSearch();
// Coloring Book
function startColoring() {
    const canvas = document.getElementById("coloringCanvas");
    const ctx = canvas.getContext("2d");
    let drawing = false;

    canvas.onmousedown = () => drawing = true;
    canvas.onmouseup = () => drawing = false;
    canvas.onmouseleave = () => drawing = false;

    canvas.onmousemove = (e) => {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.fillStyle = "#FF0000"; // red brush
        ctx.fillRect(x, y, 5, 5);
    };
}

startColoring();
