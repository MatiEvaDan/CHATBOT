const mongoose = require('mongoose');
const app = require('./app');
//lille ændringer

const PORT = process.env.PORT || 8080;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Forbundet til MongoDB");

    console.log("🚀 NY VERSION DEPLOYET");

    app.listen(PORT,'0.0.0.0', () => {
        console.log(`Server kører på port ${PORT}`);
    });

})
.catch(err => {
    console.error("MongoDB forbindelse fejlede:", err);
});