const openConnection = require("../util/connect");
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

mongoose.models = {};

const Admin = mongoose.model("admin", adminSchema);

const addAdmin = async (admin) => {
    await openConnection();
    const checkDuplication = await Admin.findOne({ email: admin.email });
    if (checkDuplication !== null) return { message: "This email already exists", isError: true }
    const result = await Admin.insertMany(admin);
    return result;
}

const selectAdmin = async (condition) => {
    await openConnection();
    const result = await Admin.findOne(condition);
    return result;
}

module.exports = { addAdmin, selectAdmin, Admin };