

exports.checkJwt = (req, res, next) => {
    console.log('checking jwt authentication')
    return next()
}