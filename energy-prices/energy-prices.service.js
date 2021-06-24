const fetch = require('node-fetch');

class EnergyPricesService {
  constructor(repository) {
    this.repository = repository;
  }

  async scrapHourlyPrices() {
    const API = process.env.NORDPOOL_API;
    const url = API + '/api/marketdata/page/47?currency=,,EUR,EUR&entityName=EE';

    const response = await fetch(url);
    const json = await response.json();
    const entities = this.preprocessPricesResponse(json);

    // global.Log(entities);

    this.repository.insertPrices(entities);
  }

  preprocessPricesResponse(json) {
    const rows = json.data.Rows.slice(0, 24);

    const marketPricesToEnergyPricesEntities = (row) => ({
      country_code: 'EE',
      datetime: row.StartTime,
      scale: 'hourly',
      price: row.Columns[0].Value,
    });

    return rows.map(marketPricesToEnergyPricesEntities);
  }
}

module.exports = { EnergyPricesService };
