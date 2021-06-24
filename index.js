require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

global.Log = console.log;

const { EnergyPricesRepository } = require('./energy-prices/energy-prices.repository');
const { EnergyPricesService } = require('./energy-prices/energy-prices.service');
const { EnergyPrices20210624Migration } = require('./energy-prices/migrations/energy-prices.20210624.migration');

scrapHourlyEstonianEnergyPrices();

async function scrapHourlyEstonianEnergyPrices() {
  const db = createDb();

  const migration = new EnergyPrices20210624Migration(db);
  await migration.up();

  const repo = new EnergyPricesRepository(db);
  const service = new EnergyPricesService(repo);

  await service.scrapHourlyPrices();

  db.close();
}

function createDb() {
  return new sqlite3.Database('prices.sqlite3');
}
