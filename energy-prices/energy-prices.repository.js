class EnergyPricesRepository {
  constructor(db) {
    this.db = db;
  }

  insertPrices(prices) {
    // TODO: Handle errors from database
    return new Promise((resolve, reject) => {
      const insertPricesQuery = `INSERT INTO energy_prices VALUES (?,?,?,?)`;

      const stmt = this.db.prepare(insertPricesQuery);

      prices.forEach((row) => {
        stmt.run([row.country_code, row.datetime, row.scale, row.price]);
      });

      stmt.finalize(resolve);
    });
  }
}

module.exports = { EnergyPricesRepository };
