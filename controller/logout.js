const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next();
        }
    });
    res.redirect('/loginForm');
}

module.exports = { logout }; 