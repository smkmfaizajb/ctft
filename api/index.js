const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Pastikan file statis bisa diakses
app.use(express.static("public"));

const USERS = [
    { username: "admin", password: "admin1234" }
];
const FLAG = "CTFT{345yyy_login_bypass}";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

app.post("/", (req, res) => {
    const { username, password } = req.body;

     // Simulasi SQL Query 
    const fakeSQL = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log("Query yang dijalankan:", fakeSQL); // Debug untuk melihat query yang terjadi

    //  payload SQL Injection "membodohi" array USERS
    const user = USERS.find(u => 
        (`${u.username}` === username && `${u.password}` === password) || 
            username.includes("' --") || 
            username.includes("' OR '1'='1") || 
            password.includes("' OR '1'='1")       
    );
    
    if (username === USERNAME && password === PASSWORD) {
        res.send(`<h2 class="success">Yeayy! Login berhasil!</h2><p>Flag: ${FLAG}</p>`);
    } else {
        res.send(`<h2 class="error">Yahh! Login gagal!</h2>`);
    }
});

// Ekspor app untuk digunakan di Vercel
module.exports = app;
