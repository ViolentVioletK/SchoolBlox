// Admin Button
document.getElementById("adminBtn").addEventListener("click", function() {
    let password = prompt("Enter admin password:");
    if (password === "Aug.29201215!") {
        alert("Access granted! You can now edit the site.");
        showAdminPanel();
    } else {
        alert("Wrong password! Access denied.");
    }
});

// Show Admin Panel
function showAdminPanel() {
    let panel = document.getElementById("adminPanel");
    if (!panel) {
        panel = document.createElement("div");
        panel.id = "adminPanel";
        panel.style.border = "1px solid black";
        panel.style.padding = "10px";
        panel.style.margin = "10px";
        panel.innerHTML = `
            <h3>Admin Panel</h3>
            <button onclick="addBook()">Add Book</button>
            <button onclick="removeBook()">Remove Book</button>
            <button onclick="addGame()">Add Game</button>
            <button onclick="approveBook()">Approve Submitted Book</button>
        `;
        document.body.prepend(panel);
    } else {
        panel.style.display = "block";
    }
}

// Placeholder Admin Functions
function addBook() { alert("Add Book clicked"); }
function removeBook() { alert("Remove Book clicked"); }
function addGame() { alert("Add Game clicked"); }
function approveBook() { alert("Approve Book clicked"); }

// Book Form Submission
const bookForm = document.getElementById("bookForm");
if(bookForm) {
    bookForm.addEventListener("submit", function(e) {
        e.preventDefault();
        document.getElementById("submissionMessage").innerText = "Sending to creator to verify the book before adding to the library...";
        alert("Simulated email sent to creator!");
        bookForm.reset();
    });
}
