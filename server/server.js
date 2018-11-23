const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('server/public'));

const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}
const pool = new Pool(config);

app.post('/task', (req, res) => {
    let taskData = req.body;
    console.log('in POST route', taskData);
    let query = `INSERT INTO "todo" ("task", "priority", "completed")
    VALUES ($1, $2, $3);`;
    pool.query(query, [taskData.task, taskData.priority, taskData.completed])
    .then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
        console.log('Error in POST route', error);
    })
});

app.get('/task', (req, res) => {
    console.log('In GET route');
    let query = `SELECT * FROM todo ORDER BY priority ASC;`;
    pool.query(query).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error in GET', error);
        res.sendStatus(500);
    })
});


pool.on('connect', () => {
    console.log('Postgres connected!');
});

pool.on('error', () => {
    console.log('Error connecting to DB', error);
});

app.listen(PORT, () => {
    console.log('Server is running on Port', PORT);
});