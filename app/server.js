const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // This disables strict SSL verification
      },
    },
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/learning1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'learning1.html'));
});

app.get('/learning2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'learning2.html'));
});

app.get('/learning3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'learning3.html'));
});

app.get('/learning4', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'learning4.html'));
});

app.get('/learning5', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'learning5.html'));
});

app.get('/level1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'level1.html'));
});

app.get('/level2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'level2.html'));
});

app.get('/level3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'level3.html'));
});

app.get('/level4', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'level4.html'));
});

app.post('/register-user', (req, res) => {
    const { username, email, password } = req.body;

    if (!username.length || !email.length || !password.length) {
        res.json('fill all the fields');
    } else {
        db("users").insert({
            username: username,
            email: email,
            password: password
        })
        .returning(["username", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            console.error("Error details:", err);
            res.status(500).json('Something went wrong');
        });
    }
});

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('username', 'email')
    .from("users")
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if (data.length) {
            res.json(data[0]);
        } else {
            res.json('email or password is incorrect');
        }
    })
});

app.post('/login-level-1', async (req, res) => {
    var { email, password } = req.body;

    email = String(email).replace(/\s*/g, '').toLowerCase();
    password = String(password).replace(/\s*/g, '').toLowerCase();
    email = String(email).replace(`"`, `'`).toLowerCase();
    password = String(password).replace(`"`, `'`).toLowerCase();

    const emailParts = email.split("'");
    const passwordParts = password.split("'");
    if (emailParts[6] || passwordParts[6]) {
        res.json("invalid input");
        return;
    }
    const isEmailValid = (emailParts[2] = emailParts[4]) && emailParts[1] === "or"
        && emailParts[3] === "=" && emailParts[5] === "--";
    const isPasswordValid = (passwordParts[2] = passwordParts[4]) && passwordParts[1] === "or"
        && passwordParts[3] === "=" && passwordParts[5] === "--";

    if (isEmailValid) {
        const query = `SELECT email, password FROM level1 WHERE email = '${email}'`;
        db.raw(query)
        .then(data => {
            if (data.rows.length > 0) {
                res.json(data.rows[0]);
            } else {
                res.json('email or password is incorrect');
            }
        })
        return;
    } else if (isPasswordValid) {
        const query = `SELECT email, password FROM level1 WHERE password = '${password}'`;
        db.raw(query)
        .then(data => {
            if (data.rows.length > 0) {
                res.json(data.rows[0]);
            } else {
                res.json('email or password is incorrect');
            }
        })
        return;
    } else {
        const evilsqli = /(delete|select|alter|truncate|drop|insert|update|union|and|create|from|where|values|into)/gi;
        while (evilsqli.test(email) || evilsqli.test(password)) {
            email = email.replace(evilsqli, '');
            password = password.replace(evilsqli, '');
        } 

        email = email.replace(/[^a-zA-Z0-9]/g, '');
        password = password.replace(/[^a-zA-Z0-9]/g, '');

        try {
            const query = `SELECT email, password FROM level1 WHERE email = '${email}' AND password = '${password}'`;
            const data = await db.raw(query);

            if (data && data.rows.length > 0) {
                res.json(data.rows[0]);
            } else {
                res.json(`SELECT email, password FROM level1 WHERE email = '${email}' AND password = '${password}'`);
            }
        } catch {
            console.error("Database error:", error);
            res.status(500).json("One or more of the SQL commands are used incorrectly.");
        }
    }
});

app.post('/login-level-2', async (req, res) => {
    var { email, password } = req.body;

    const allowed = "'or'1'='1'--";
    email = String(email).replace(/\s*/g, '').toLowerCase();
    password = String(password).replace(/\s*/g, '').toLowerCase();
    email = String(email).replace(`"`, `'`).toLowerCase();
    password = String(password).replace(`"`, `'`).toLowerCase();
    email = email.replace("or", '');
    password = password.replace("or", '');

    const emailParts = email.split("'");
    const passwordParts = password.split("'");
    if (emailParts[6] || passwordParts[6]) {
        res.json("invalid input");
        return;
    }
    const isEmailValid = (emailParts[2] = emailParts[4]) && emailParts[1] === "or"
        && emailParts[3] === "=" && emailParts[5] === "--";
    const isPasswordValid = (passwordParts[2] = passwordParts[4]) && passwordParts[1] === "or"
        && passwordParts[3] === "=" && passwordParts[5] === "--";

    if (isEmailValid) {
        const query = `SELECT email, password FROM level1 WHERE email = '${email}'`;
        db.raw(query)
        .then(data => {
            if (data.rows.length > 0) {
                res.json(data.rows[0]);
            } else {
                res.json('email or password is incorrect');
            }
        })
        return;
    } else if (isPasswordValid) {
        const query = `SELECT email, password FROM level1 WHERE password = '${password}'`;
        db.raw(query)
        .then(data => {
            if (data.rows.length > 0) {
                res.json(data.rows[0]);
            } else {
                res.json('email or password is incorrect');
            }
        })
        return;
    } else {
        const evilsqli = /(delete|select|alter|truncate|drop|insert|update|union|and|create|from|where|values|into)/gi;
        while (evilsqli.test(email) || evilsqli.test(password)) {
            email = email.replace(evilsqli, '');
            password = password.replace(evilsqli, '');
        }

        email = email.replace(/[^a-zA-Z0-9]/g, '');
        password = password.replace(/[^a-zA-Z0-9]/g, '');

        try {
            const query = `SELECT email, password FROM level1 WHERE email = '${email}' AND password = '${password}'`;
            const data = await db.raw(query);

            if (data && data.rows.length > 0) {
                res.json(data.rows[0]);
            } else {
                res.json(`SELECT email, password FROM level1 WHERE email = '${email}' AND password = '${password}'`);
            }
        } catch {
            console.error("Database error:", error);
            res.status(500).json("One or more of the SQL commands are used incorrectly.");
        }
    }
});

app.post('/login-level-3', async (req, res) => {
    var { email, password } = req.body;

    email = String(email).toLowerCase();
    password = String(password).toLowerCase();

    const evilsqli = /(delete|alter|truncate|drop|update|union|create|")/gi;
    while (evilsqli.test(email) || evilsqli.test(password)) {
        email = email.replace(evilsqli, '');
        password = password.replace(evilsqli, '');
    }

    if (!email.includes("insert") || !email.includes("select") || !email.includes("and") ||
        !email.includes("into") || !email.includes("values") || !email.includes("from") ||
        !email.includes("where")) {
        res.json("one or more required SQL commands are missing");
        return;
    }

    if (email.split("'").length - 1 != 9 && email.split("'").length - 1 != 0) {
        res.json("Incorrect number of '. There should be 9 meaningful quotation marks.");
        return;
    }
    try {
        const query = `SELECT email, password FROM level1 WHERE email = '${email}' AND password = '${password}'`;
        const data = await db.raw(query);

        if (data && data.length > 2 && data[2].rows.length > 0) {
            res.json(data[2].rows[0]);
        } else {
            res.json(`SELECT email, password FROM level1 WHERE email = '${email}' AND password = '${password}'`);
        }
    } catch(error) {
        console.error("Database error:", error);
        res.status(500).json("One or more of the SQL commands are used incorrectly.");
    }
    
});

app.post('/login-level-4', async (req, res) => {
    var { email, password } = req.body;

    email = String(email).toLowerCase();
    password = String(password).toLowerCase();
    email = String(email).replace(`"`, `'`).toLowerCase();
    password = String(password).replace(`"`, `'`).toLowerCase();

    const evilsqli = /(delete|alter|truncate|drop|insert|update|and|create|where|values|into)/gi;
    while (evilsqli.test(email) || evilsqli.test(password)) {
        email = email.replace(evilsqli, '');
        password = password.replace(evilsqli, '');
    }

    if (!email.includes("union") || !email.includes("select") || !email.includes("from")) {
        res.json("one or more required SQL commands are missing");
        return;
    }

    const allowed = `'union select email,password from level1--`;

    if (email == allowed) {
        const query = `SELECT email, password FROM level1 WHERE email = '${email}'`;
        db.raw(query)
        .then(data => {
            if (data.rows.length > 0) {
                res.json(data.rows[0]);
            } else {
                res.json('email or password is incorrect');
            }
        })
    } else if (password == allowed) {
        const query = `SELECT email, password FROM level1 WHERE password = '${password}'`;
        db.raw(query)
        .then(data => {
            if (data.rows.length > 0) {
                res.json(data.rows[0]);
            } else {
                res.json('email or password is incorrect');
            }
        })  
    } else {
        try {
            const query = `SELECT email, password FROM level1 WHERE email = '${email}' AND password = '${password}'`;
            const data = await db.raw(query);
            
            if (data && data.rows.length > 0) {
                res.json(data.rows[0]);
            } else {
                res.json(`SELECT email, password FROM level1 WHERE email = '${email}' AND password = '${password}'`);
            }
        } catch(error) {
            console.error("Database error:", error);
            res.status(500).json("One or more of the SQL commands are used incorrectly.");
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});