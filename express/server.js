const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let students = [
    { id: 1, name: 'divyansh' },
    { id: 2, name: 'dipu' },
];

// Home Page
app.get('/', (req, res) => {
    res.render('Home', { students });
});

// Insert Data
app.post('/insertData', (req, res) => {
    const { id, name } = req.body;

    students.push({
        id: Number(id),
        name: name,
    });

    res.redirect('/');
});

// Delete
app.get('/delete/:id', (req, res) => {
    const id = Number(req.params.id);

    students = students.filter(el => el.id !== id);

    res.redirect('/');
});

// Edit Page
app.get('/edit/:id', (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(el => el.id === id);

    res.render('Edit', { student });
});

// Update Data
app.post('/update/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    students = students.map(el => {
        if (el.id === id) {
            el.name = name;
        }
        return el;
    });

    res.redirect('/');
});

app.listen(8990, () => {
    console.log('Server running on port 8990');
});