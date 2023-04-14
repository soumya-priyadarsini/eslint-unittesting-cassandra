const cassandra = require("cassandra-driver");
const env = require('../config/env')


var PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
const client = new cassandra.Client({ 
 contactPoints: env.database.contactPoints,
 localDataCenter: env.database.localDataCenter,
 keyspace: env.database.keyspace,
 authProvider: new PlainTextAuthProvider(env.database.username, env.database.password),
 protocolOptions:{ port: env.database.port },
});

module.exports = client;