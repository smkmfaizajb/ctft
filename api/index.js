const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk menyajikan file statis (CSS)
app.use(express.static(path.join(__dirname, "public")));

const USERNAME = "admin";
const PASSWORD = "admin1234";
const FLAG = "CTFT{345yyy_login_bypass}";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/", (req, res) => {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
        res.send(`<h2 class="success">Yeayy! Login berhasil!</h2><p>Flag: ${FLAG}</p>`);
    } else {
        res.send(`<h2 class="error">Yahh! Login gagal!</h2>`);
    }
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});