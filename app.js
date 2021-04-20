const express = require('express');
const app = express();
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')

// static files
app.use(express.static(`${__dirname}static`));
app.use('/static', express.static(path.join(__dirname, '/static')));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

// connect 
let db = null;
async function connectDB() {
	const uri = process.env.DB_URI;
	const options = { useUnifiedTopology: true };
	const client = new MongoClient(uri, options);
	await client.connect();
	db = await client.db(process.env.DB_NAME);
}
connectDB();
try {
	console.log('We have made a connection to Mongo!');
} catch (error) {
	console.log(error);
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


app.get('/', async (req, res) => {
	const friet = await db.collection('friet').find().toArray();
	const snacks = await db.collection('snacks').find().toArray();
	const broodjes = await db.collection('broodjes').find().toArray();
	const dranken = await db.collection('dranken').find().toArray();
	const handijs = await db.collection('handijs').find().toArray();
	const sausjes = await db.collection('sausjes').find().toArray();

	const products = await db.collection('products').find().toArray();
	const productCategories = await db.collection('product-categories').find().toArray();
	const categories = await db.collection('categories').find().toArray();


    res.render('index', {
		friet: friet,
		snacks: snacks,
		broodjes: broodjes,
		dranken: dranken,
		handijs: handijs,
		sausjes: sausjes,

		products: products,
		productCategories: productCategories,
		categories: categories	
	})
});
// app.post('/', async (req, res) => {
// 	const clickedItem = (req.body.subject)

// 	res.render('/', {
// 		test: clickedItem
// 	})
// })


//404
app.use((req, res) => {
	res.status(404).send('this page does not exist.');
});

// listen on port 3000
app.listen(3000, () => {
	console.log('example app listening at 3000!');
});