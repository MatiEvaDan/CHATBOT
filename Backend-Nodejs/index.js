const mongoose = require('mongoose');
const app = require('./app');

const PORT = 3000;

mongoose.connect('mongodb+srv://matildedanielsen_db_user:hej1234@bookapi.1qv6zk6.mongodb.net/?appName=BookAPI')
.then(() => {
    console.log("Forbundet til MongoDB");

    app.listen(PORT,'0.0.0.0', () => {
        console.log(`Server kører på port ${PORT}`);
    });

})
.catch(err => {
    console.error("MongoDB forbindelse fejlede:", err);
});