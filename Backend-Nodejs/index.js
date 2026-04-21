const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.Port || 3000;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Forbundet til MongoDB");

    app.listen(PORT,'0.0.0.0', () => {
        console.log(`Server kører på port ${PORT}`);
    });

})
.catch(err => {
    console.error("MongoDB forbindelse fejlede:", err);
});