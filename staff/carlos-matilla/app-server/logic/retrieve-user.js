const users = require('../data/data')
module.exports = username => users.find(user => user.username === username)