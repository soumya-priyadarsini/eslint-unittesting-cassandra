const server = require('./server/app')
const port = process.env.PORT || 3030;
server.listen(port, () => {
	console.log(`Server listening on ${port}`);
});
