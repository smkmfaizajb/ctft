const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const USERNAME = "admin";
const PASSWORD = "admin1234";
const FLAG = "CTFT{345yyy_login_bypass}";

app.get("/", (req, res) => {
    res.send(`
        <h2>Login</h2>
        <form method="post">
            Username: <input type="text" name="username"><br>
            Password: <input type="password" name="password"><br>
            <input type="submit" value="Login">
        </form>
    `);
});

app.post("/", (req, res) => {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
        res.send(`yeayy Login berhasil! Flag: ${FLAG}`);
    } else {
        res.send("yahh Login gagal!");
    }
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});
