
exports.path = '/provas'
exports.method = 'get'
exports.middlewares = []
exports.handler = (_req, res) => {
    return res.status(200).json({ title: 'provas' })
} 