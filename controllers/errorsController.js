module.exports.PageNotFound = (req, res, next) => {
    res.status(404);
    res.render("404View", {
        isLoggedIn: req.session.isLoggedIn
    });
}