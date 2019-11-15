const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log =`${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err){
			console.log('Unnable to create file');
		}
	});
	next();	
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs'); 
});

app.use(express.static(__dirname + '/public'));*/

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


app.get('/about', (req, res) =>{
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/', (req, res) =>{
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website',
	});
});


app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.get('page/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: Projects
	});
});

app.listen(port, () => {
	console.log(`server is up on port ${port}`);
});


/*app.get('/', (req, res)=> {
	//res.send('<h1>Hello express!</h1>');
	res.send({
		name: 'Yisus',
		likes: [
		'Biking',
		'Cities'
		]
	});
});*/
