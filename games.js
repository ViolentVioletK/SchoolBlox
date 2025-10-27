//////////////////////////////
// WORDLE CLONE + LEADERBOARD + GUESS HISTORY
//////////////////////////////

const words = ["apple","brick","chair","dance","eagle"];
let answer = words[Math.floor(Math.random() * words.length)];
let attempts = 0;

// Store last 5 guesses
function addToGuessHistory(guess){
    let history = JSON.parse(localStorage.getItem("wordleHistory") || "[]");
    history.push(guess);
    if(history.length > 5) history.shift(); // Keep last 5
    localStorage.setItem("wordleHistory", JSON.stringify(history));
    displayGuessHistory();
}

function displayGuessHistory(){
    const container = document.getElementById("wordleGame");
    let oldHistory = document.getElementById("guessHistory");
    if(oldHistory) oldHistory.remove();

    let history = JSON.parse(localStorage.getItem("wordleHistory") || "[]");
    let histDiv = document.createElement("div");
    histDiv.id = "guessHistory";
    histDiv.innerHTML = "<h4>Last 5 Guesses</h4>";

    if(history.length === 0){
        histDiv.innerHTML += "<p>No guesses yet.</p>";
    } else {
        history.forEach(g => {
            histDiv.innerHTML += `<p>${g}</p>`;
        });
    }

    container.appendChild(histDiv);
}

// Wordle Leaderboard
function updateWordleLeaderboard(user, attempts){
    let leaderboard = JSON.parse(localStorage.getItem("wordleLeaderboard") || "[]");

    leaderboard.push({user, attempts, time: new Date().toLocaleTimeString()});
    localStorage.setItem("wordleLeaderboard", JSON.stringify(leaderboard));
    displayWordleLeaderboard();
}

function displayWordleLeaderboard(){
    const container = document.getElementById("wordleGame");
    if(!container) return;

    let oldBoard = document.getElementById("wordleLeaderboard");
    if(oldBoard) oldBoard.remove();

    let leaderboard = JSON.parse(localStorage.getItem("wordleLeaderboard") || "[]");
    let boardDiv = document.createElement("div");
    boardDiv.id = "wordleLeaderboard";
    boardDiv.innerHTML = "<h3>Wordle Leaderboard</h3>";

    if(leaderboard.length === 0){
        boardDiv.innerHTML += "<p>No one has played yet.</p>";
    } else {
        leaderboard.sort((a,b)=>a.attempts - b.attempts);
        leaderboard.forEach(entry=>{
            boardDiv.innerHTML += `<p>${entry.user} guessed in ${entry.attempts} tries at ${entry.time}</p>`;
        });
    }

    container.appendChild(boardDiv);
}

function startWordle(){
    const container = document.getElementById("wordleGame");
    container.innerHTML = `
        <input type="text" id="guessInput" maxlength="5" placeholder="Guess 5-letter word">
        <button onclick="checkWord()">Guess</button>
        <div id="wordleOutput"></div>
    `;
    displayWordleLeaderboard();
    displayGuessHistory();
}

function checkWord(){
    let guess = document.getElementById("guessInput").value.toLowerCase();
    let output = document.getElementById("wordleOutput");

    if(guess.length !== 5){
        alert("Word must be 5 letters!");
        return;
    }

    attempts++;
    const currentUser = localStorage.getItem("currentUser") || "Guest";

    addToGuessHistory(guess);

    if(guess === answer){
        output.innerHTML += `<p>✅ You guessed it in ${attempts} tries! The word was ${answer}.</p>`;
        updateWordleLeaderboard(currentUser, attempts);
        answer = words[Math.floor(Math.random() * words.length)];
        attempts = 0;
        localStorage.setItem("wordleHistory", "[]"); // reset history after win
        displayGuessHistory();
    } else {
        output.innerHTML += `<p>❌ ${guess} is wrong!</p>`;
    }

    document.getElementById("guessInput").value = "";
}

startWordle();

//////////////////////////////
// SUDOKU
//////////////////////////////

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

//////////////////////////////
// WORD SEARCH
//////////////////////////////

function startWordSearch() {
    const container = document.getElementById("wordsearchGame");
    container.innerHTML = "<div id='wordsearchGrid'></div><p>Find these words: CAT, DOG, SUN</p>";

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

    document.querySelectorAll(".wsCell").forEach(cell => {
        cell.onclick = function() {
            if (cell.style.backgroundColor === "yellow") cell.style.backgroundColor = "";
            else cell.style.backgroundColor = "yellow";
        }
    });
}

startWordSearch();

//////////////////////////////
// COLORING BOOK
//////////////////////////////

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

function resetCanvas(){
    const canvas = document.getElementById("coloringCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

startColoring();
