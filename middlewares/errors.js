module.exports = function (err, req, res, next) {
    return res.status(500).json({ status: "error", err })
} 