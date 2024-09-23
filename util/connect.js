const mongoose = require('mongoose')
const openConnection = async () => {
    await mongoose.connect(process.env.URI);

};

module.exports = openConnection;
