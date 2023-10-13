

exports.path = '/aula'
exports.method = 'get'
exports.middlewares = []
exports.auth = true
// ...
exports.handler = (_req, res) => {
    return res.status(200).json({ title: 'aula' })
} 