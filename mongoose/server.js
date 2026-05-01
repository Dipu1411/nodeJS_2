const express = require('express');
const path = require('path');
const db = require('./config/db');
const User = require('./model/userModel');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async(req, res) => {
    const users = await User.find();
    res.render('user', { users });
});

app.post('/user', async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();

        const users = await User.find();
        res.render('user', { users });

    } catch (error) {
        res.status(400).send(error.message);
    }
});


// delete route

app.get('/delete/:id', async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        const users = await User.find();
        res.render('user', { users });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// edit route 
app.get('/edit/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const users = await User.find();

        res.render('user', { users, editUser: user });

    } catch (error) {
        res.status(400).send(error.message);
    }
});

// update user route
app.post('/update/:id', async(req, res) => {
    try {
        const { username, password } = req.body;
        await User.findByIdAndUpdate(req.params.id, { username, password });
        const users = await User.find();
        res.render('user', { users });
    } catch (error) {
        res.status(400).send(error.message);
    }
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});