// Signup Function
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

// Login Function
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
