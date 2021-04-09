const express = require('express');
const app = express();
const path = require('path');

// static files
app.use(express.static(`${__dirname}static`));
app.use('/static', express.static(path.join(__dirname, '/static')));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
});

//404
app.use((req, res) => {
	res.status(404).send('this page does not exist.');
});

// listen on port 3000
app.listen(3000, () => {
	console.log('example app listening at 3000!');
});