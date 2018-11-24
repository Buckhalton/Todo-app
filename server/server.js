const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const taskRouter = require('./routes/task');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('server/public'));
app.use('/task', taskRouter);

app.listen(PORT, () => {
    console.log('Server is running on Port', PORT);
}); // end app.listen