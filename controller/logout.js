const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next();
        }
    });
    res.redirect('/login');
}

module.exports = { logout }; 