class EnergyPrices20210624Migration {
  constructor(db) {
    this.db = db;
  }

  up() {
    return new Promise((resolve, reject) => {
      // Scale to be hourly, monthly
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS energy_prices (
          country_code TEXT,
          datetime TEXT,
          scale TEXT,
          price REAL,
          PRIMARY KEY (country_code, datetime)
        )
      `;
      this.db.run(createTableQuery, resolve);
    });
  }

  down() {
    return new Promise((resolve, reject) => {
      this.db.run('DROP TABLE energy_prices', resolve);
    });
  }
}

module.exports = { EnergyPrices20210624Migration };
