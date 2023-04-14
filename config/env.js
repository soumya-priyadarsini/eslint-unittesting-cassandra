const envLocal = require('../env/env.local')

exports.database = envLocal.database
console.log('database connected....');
