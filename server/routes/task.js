const express = require('express');
const pg = require('pg');
const router = express.Router();


// pg setup
const Pool = pg.Pool;
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}
const pool = new Pool(config);
// end pg setup

//Routes
router.post('/', (req, res) => {
    let taskData = req.body;
    console.log('in POST route', taskData);
    let query = `INSERT INTO "todo" ("task", "priority", "completed")
    VALUES ($1, $2, $3);`;
    pool.query(query, [taskData.task, taskData.priority, false])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            res.sendStatus(500);
            console.log('Error in POST route', error);
        })
}); // end POST route

router.get('/', (req, res) => {
    console.log('In GET route');
    let query = `SELECT * FROM todo ORDER BY priority ASC;`;
    pool.query(query).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error in GET', error);
        res.sendStatus(500);
    })
}); // end GET route

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log('delete route called with id of:', id);
    pool.query(`DELETE FROM "todo" WHERE id = $1;`, [id])
        .then((results) => {
            res.sendStatus(204);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
}); // end DELETE route

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let query = `UPDATE "todo" SET priority = $1, completed = $2 WHERE id = $3;`;
    pool.query(query, [4, true, id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error in PUT', error);
            res.sendStatus(500);
        })
}); // end PUT route

// end Routes

pool.on('connect', () => {
    console.log('Postgres connected!');
}); // end connect success log

pool.on('error', () => {
    console.log('Error connecting to DB', error);
}); // end connect error log

module.exports = router;