const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require('./models/ReactDataSchema')

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/reactdata', { useNewUrlParser: true });

app.get("/insert", async (req, res) => {
    const db_users = await User.find({})
    return res.json(db_users);
})

app.post('/insert', async (req, res) => {
    const fullName = req.body.fullName
    const CompanyRole = req.body.companyRole

    const formData = new User({
        name: fullName,
        role: CompanyRole
    })

    try {
        await formData.save();
        res.send("inserted data..")
    } catch (err) {
        console.log(err)
    }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});