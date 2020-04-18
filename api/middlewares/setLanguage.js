module.exports = function post(req, res, next) {
    const env = req.body ? req.body.env : {};
    const lang = env.language ? env.language.toLowerCase() : 'en';
    res.setLocale(lang);
    console.log('lang set:', lang);
    next();
}
