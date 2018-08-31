const Connection = require('database-js').Connection;

class Mgtr {
	constructor(migrations, { connectionString = '' }) {
		this.migrations = migrations;
		this.connection = new Connection(connectionString);
	}

	async init() {
		try {
			await this.query(/* syntax: sql */ `
				CREATE TABLE IF NOT EXISTS mgtr_migrations(
					tid integer PRIMARY KEY,
					version text NOT NULL,
					description text NOT NULL,
					script text NOT NULL,
					checksum text NOT NULL,
					installed_on text NOT NULL,
					success integer NOT NULL
				);
			`);
		} catch (e) {
			console.log(`Failed to initiate mgtr. ${e.message}`);
		}
	}

	async query(query, ...args) {
		let statement = await this.connection.prepareStatement(query);
		let result = await statement.query(...args);

		return result;
	}
}

module.exports = Mgtr;
