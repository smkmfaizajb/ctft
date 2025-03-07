const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const FLAG = "CTFT{fake_sql_injection_bypass}";

// Data user hardcoded (simulasi database)
const USERNAME = "admin";
const PASSWORD = "admin1234";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

app.post("/", (req, res) => {
    const { username, password } = req.body;

    // 🔴 Simulasi SQL Injection (Rentan)
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    console.log("Fake SQL Query:", query);

    // Jika input mengandung ' OR '1'='1, anggap sukses login
    if (query.includes("' OR '1'='1") || (username === USERNAME && password === PASSWORD)) {
        res.send(`<h2 class="success">Yeayy! Login berhasil!</h2><p>Flag: ${FLAG}</p>`);
    } else {
        res.send(`<h2 class="error">Yahh! Login gagal!</h2>`);
    }
});

// Ekspor app untuk Vercel
module.exports = app;
