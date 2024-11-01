const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const cors = require('cors');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const app = express();

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    resumePath: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('user', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/registration_form', (req, res) => {
    res.sendFile(__dirname + '/registration_form.html');
});

app.post('/registration_form', upload.single('resume'), async (req, res) => {
    const { name, email, password } = req.body;
    const resume = req.file;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            resumePath: resume.path
        });

        await newUser.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
