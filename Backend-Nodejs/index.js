const mongoose = require('mongoose');
const app = require('./app');
//lille ændringer

console.log("PORT ENV:", process.env.PORT);

const PORT = process.env.PORT;

const MONGO_URI = process.env.MONGO_URI;

app.listen(PORT,'0.0.0.0', () => {
        console.log(`Server kører på port ${PORT}`);
    });

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Forbundet til MongoDB");

   

})
.catch(err => {
    console.error("MongoDB forbindelse fejlede:", err);
});