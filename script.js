//////////////////////////
// LOGIN & SIGNUP
//////////////////////////

function signup(){
    let user = document.getElementById("signupUser").value;
    let pass = document.getElementById("signupPass").value;

    if(!user || !pass){
        alert("Fill both fields!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if(users[user]){
        alert("Username already exists!");
        return;
    }

    users[user] = pass;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created! You can now login.");
    document.getElementById("signupUser").value = "";
    document.getElementById("signupPass").value = "";
}

function login(){
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if(users[user] && users[user] === pass){
        localStorage.setItem("currentUser", user);
        document.getElementById("loginMessage").innerText = `Welcome, ${user}! Redirecting...`;
        setTimeout(()=>{ window.location.href = "library.html"; }, 1000);
    } else {
        alert("Invalid username or password!");
    }
}

//////////////////////////
// ADMIN PANEL
//////////////////////////

document.getElementById("adminBtn")?.addEventListener("click", function() {
    let password = prompt("Enter admin password:");
    if (password === "Aug.29201215!") {
        alert("Access granted! You can now edit the site.");
        showAdminPanel();
    } else {
        alert("Wrong password! Access denied.");
    }
});

function showAdminPanel() {
    let panel = document.getElementById("adminPanel");
    if (!panel) {
        panel = document.createElement("div");
        panel.id = "adminPanel";
        panel.style.border = "1px solid black";
        panel.style.padding = "10px";
        panel.style.margin = "10px";
        panel.innerHTML = `<h3>Admin Panel</h3>
            <button onclick="addBook()">Add Book</button>
            <div id="pendingBooksContainer"><h4>Pending Books</h4></div>`;
        document.body.prepend(panel);
    } else {
        panel.style.display = "block";
    }
    displayPendingBooks();
}

function addBook(){
    let title = prompt("Enter book title:");
    let genre = prompt("Enter genre:");
    let content = prompt("Enter book content:");
    if(!title || !genre || !content) return;

    let approved = JSON.parse(localStorage.getItem("approvedBooks") || "[]");
    approved.push({title, genre, content});
    localStorage.setItem("approvedBooks", JSON.stringify(approved));
    updateLibrary();
    alert("Book added to library!");
}

//////////////////////////
// BOOK CREATOR
//////////////////////////

const bookForm = document.getElementById("bookForm");
if(bookForm){
    bookForm.addEventListener("submit", function(e){
        e.preventDefault();
        const title = bookForm[0].value;
        const genre = bookForm[1].value;
        const content = bookForm[2].value;

        let pending = JSON.parse(localStorage.getItem("pendingBooks") || "[]");
        pending.push({title, genre, content});
        localStorage.setItem("pendingBooks", JSON.stringify(pending));

        document.getElementById("submissionMessage").innerText = "Book submitted! Waiting for creator approval.";
        bookForm.reset();
    });
}

function displayPendingBooks(){
    const container = document.getElementById("pendingBooksContainer");
    if(!container) return;

    container.innerHTML = "<h4>Pending Books</h4>";
    let pending = JSON.parse(localStorage.getItem("pendingBooks") || "[]");
    if(pending.length === 0){
        container.innerHTML += "<p>No pending books.</p>";
        return;
    }
    pending.forEach((book, index)=>{
        let div = document.createElement("div");
        div.style.border = "1px solid gray";
        div.style.padding = "5px";
        div.style.margin = "5px 0";
        div.innerHTML = `
            <strong>${book.title}</strong> (${book.genre})<br>
            ${book.content.substring(0,50)}...<br>
            <button onclick="approveBook(${index})">Approve</button>
            <button onclick="rejectBook(${index})">Reject</button>
        `;
        container.appendChild(div);
    });
}

function approveBook(index){
    let pending = JSON.parse(localStorage.getItem("pendingBooks") || "[]");
    let approved = JSON.parse(localStorage.getItem("approvedBooks") || "[]");
    approved.push(pending[index]);
    localStorage.setItem("approvedBooks", JSON.stringify(approved));
    pending.splice(index, 1);
    localStorage.setItem("pendingBooks", JSON.stringify(pending));
    displayPendingBooks();
    alert("Book approved! It will appear in the library.");
    updateLibrary();
}

function rejectBook(index){
    let pending = JSON.parse(localStorage.getItem("pendingBooks") || "[]");
    pending.splice(index, 1);
    localStorage.setItem("pendingBooks", JSON.stringify(pending));
    displayPendingBooks();
}

//////////////////////////
// LIBRARY
//////////////////////////

function updateLibrary(){
    const libraryDiv = document.getElementById("books");
    if(!libraryDiv) return;
    let approved = JSON.parse(localStorage.getItem("approvedBooks") || "[]");
    libraryDiv.innerHTML = "";
    if(approved.length === 0){
        libraryDiv.innerHTML = "<p>No books in the library yet.</p>";
        return;
    }
    approved.forEach((book)=>{
        let div = document.createElement("div");
        div.style.border = "1px solid gray";
        div.style.padding = "5px";
        div.style.margin = "5px 0";
        div.innerHTML = `<strong>${book.title}</strong> (${book.genre})<br>${book.content}`;
        libraryDiv.appendChild(div);
    });
}

// Run library update on page load
updateLibrary();
