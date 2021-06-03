const mysql = require('mysql2');

const client = mysql.createPool({
	user: 'root',
	host: 'localhost',
	database: 'db',
	port: 3306
});

client.query('SELECT NOW()', (err, res) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log('Connection successful');
});

const getUsers = (request, response) => {
	// console.log(client);
	client.query('SELECT * FROM users', (err, rows) => {
		if (err) throw err;

		console.log('Data received from Db:');
		response.json(rows);
	});
};

const getUserById = (request, response) => {
	const id = parseInt(request.params.id);
	client.query('SELECT * FROM users WHERE id = ?', [ id ], (err, result) => {
		if (err) throw err;

		response.status(200).json(result);
	});
};

const createUser = (request, response) => {
	const { name, email } = request.body;
	const user = { name, email };
	client.query('INSERT INTO users SET ?', user, (err, res) => {
		if (err) throw err;

		console.log('Last insert ID:', res.insertId);
	});
};

const deleteUser = (request, response) => {
	const id = parseInt(request.params.id);

	client.query('DELETE FROM users WHERE id = ?', [ id ], (err, result) => {
		if (err) throw err;

		response.status(204);
	});
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	deleteUser
};
