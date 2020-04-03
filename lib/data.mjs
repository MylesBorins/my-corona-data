import { createReadStream } from 'fs';
import parse from 'csv-parse';

const CSV_PATH = '../third_party/coronavirus-data/testing.csv';

async function getData() {
  const csvURL = new URL(await import.meta.resolve(CSV_PATH));
  const parser = createReadStream(csvURL).pipe(parse());
  const data = [];

  let first = true;

  for await (const [
    extractDate,
    specimenDate,
    numberTested,
    numberConfirmed,
    numberHospitalized,
    numberDeaths
  ] of parser) {
    if (first) first = false
    else {
      data.push({
        date: specimenDate,
        tested: Number(numberTested),
        positive: Number(numberConfirmed),
        hospitalizaed: Number(numberHospitalized),
        deaths: Number(numberDeaths)
      });
    }
  }
  return data;
}

export {
  getData
}
