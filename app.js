const express = require('express');
const app = express();
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const { CLIENT_RENEG_WINDOW } = require('tls');

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
	db2 = await client.db('Orders');
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
	const sausjes = await db.collection('extra').find().toArray();
	const products = await db.collection('products').find().toArray();
	const productCategories = await db.collection('product-categories').find().toArray();
	const order = await db2.collection('order-products').find().toArray();
	const categories = await db.collection('categories').aggregate([
		{
			$lookup: {
				from: 'product-categories',
				localField: '_id',
				foreignField: 'category_id',
				as: 'categories.products'
			}
		},
		{
			$unwind: {
				"path": '$products',
				"preserveNullAndEmptyArrays": true
			}
		},
		{
			$lookup: {
				from: 'products',
				localField: 'categories.products.product_id',
				foreignField: '_id',
				as: 'products'
			}
		}
	]).toArray();
	
    res.render('index', {
		sausjes: sausjes,
		products: products,
		productCategories: productCategories,
		categories: categories,
		order: order
		
	})	
});

app.post('/add', (req, res) => {
	db2.collection('order-products').insertOne(req.body, (err, result) => {
	  if (err) return console.log(err)
	  console.log(req.body, {_id: req.body._id})
	  res.redirect('/')
	})
  })
  app.post('/delete/:id', (req, res) => {
	db2.collection('order-products').deleteOne({_id: ObjectId( req.params.id)}, (err, result) => {
	  if (err) return console.log(err)
	  res.redirect('/')
	})
  })

app.use((req, res) => {
	res.status(404).send('this page does not exist.');
});

app.listen(3000, () => {
	console.log('example app listening at 3000!');
});