const { Client } = require('pg')

const client = new Client({
    user: 'test',
    host: 'localhost',
    database: 'test',
    password: 'test',
    port: 5432,
});

client.connect()

client.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connection successful');
});

const getUsers = (request, response) => {
  // console.log(client);
	client.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if (error) {
			console.log(error);
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getUserById = (request, response) => {
	const id = parseInt(request.params.id);

	client.query('SELECT * FROM users WHERE id = $1', [ id ], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const createUser = (request, response) => {
	const { name, email } = request.body;

	client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [ name, email ], (error, results) => {
		if (error) {
			throw error;
		} else if (!Array.isArray(results.rows) || results.rows.length < 1) {
			throw error;
		}
		response.status(201).send(`User added with ID: ${results.rows[0].id}`);
	});
};

const updateUser = (request, response) => {
	const id = parseInt(request.params.id);
	const { name, email } = request.body;

	client.query(
		'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
		[ name, email, id ],
		(error, results) => {
			if (error) {
				throw error;
			}
			if (typeof results.rows == 'undefined') {
				response.status(404).send(`Resource not found`);
			} else if (Array.isArray(results.rows) && results.rows.length < 1) {
				response.status(404).send(`User not found`);
			} else {
				response.status(200).send(`User modified with ID: ${results.rows[0].id}`);
			}
		}
	);
};

const deleteUser = (request, response) => {
	const id = parseInt(request.params.id);

	client.query('DELETE FROM users WHERE id = $1', [ id ], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`User deleted with ID: ${id}`);
	});
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
};
