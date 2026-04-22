const mongoose = require('mongoose');
const app = require('./app');
//lille ændringer

const PORT = process.env.PORT || 3000;

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