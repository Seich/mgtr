const fs = require('fs');
const Mgtr = require('../mgtr');

describe(`Mgtr`, () => {
	const migrations = [
		{
			name: `20180831104425_add_test_table`, //YYYYMMDDHHMMSS
			description: `Add table1`,
			UP: () => /* syntax: sql */ `
					CREATE TABLE table1 (
						tid integer PRIMARY KEY
					);
				`,

			DOWN: () => /* syntax: sql */ `
					DROP TABLE table1;
				`
		},
		{
			name: `20180832104425_add_test_table`, //YYYYMMDDHHMMSS
			description: `Add table2`,
			UP: () => /* syntax: sql */ `
					CREATE TABLE table2 (
						tid integer PRIMARY KEY
					);
				`,

			DOWN: () => /* syntax: sql */ `
					DROP TABLE table2;
				`
		},
		{
			name: `20180832104425_add_test_table`, //YYYYMMDDHHMMSS
			description: `Add table3`,
			UP: () => /* syntax: sql */ `
					CREATE TABLE table3 (
						tid integer PRIMARY KEY
					);
				`,

			DOWN: () => /* syntax: sql */ `
					DROP TABLE table3;
				`
		}
	];

	const config = { connectionString: 'sqlite:///test.sqlite' };

	afterAll(() => {
		fs.unlinkSync('test.sqlite');
	});

	it(`should connect to the database`, async () => {
		expect(() => new Mgtr([], config)).not.toThrow();
	});

	it(`should create the migrations db if it doesn't exist`, async () => {
		const m = new Mgtr(migrations, config);

		await m.init();

		let result = await m.query(/* syntax: sql */ `
			SELECT *
			FROM sqlite_master
			WHERE type='table' AND name='mgtr_migrations';
		`);

		expect(result.length).toBe(1);
	});
});
