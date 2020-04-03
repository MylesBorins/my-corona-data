import { createReadStream } from 'fs';
import parse from 'csv-parse';

const CSV_PATH = '../third_party/coronavirus-data/testing.csv';

async function getTestingData() {
  const csvPath = await import.meta.resolve(CSV_PATH);
  const readStream = createReadStream(new URL(csvPath));
  const parser = readStream.pipe(parse());
  const data = [];
  let count = 0;
  for await (const record of parser) {
    if (count !== 0) {
      data.push({
        date: record[1],
        tested: Number(record[2]),
        positive: Number(record[3])
      });
    }
    count++;
  }
  return data;
}

export {
  getTestingData
}
