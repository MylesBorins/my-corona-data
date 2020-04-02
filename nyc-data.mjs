import { createReadStream } from 'fs';
import parse from 'csv-parse';

async function main() {
  const csvPath = await import.meta.resolve('./coronavirus-data/testing.csv');
  const readStream = createReadStream(new URL(csvPath));
  const parser = readStream.pipe(parse());
  let tested = 0;
  let positive = 0;
  let count = 0;
  for await (const record of parser) {
    if (count !== 0) {
      tested += Number(record[2]);
      positive += Number(record[3]);
    }
    count++;
  }
  console.log(`\nPositive: ${positive}\nTested: ${tested}\n`);
}

main().catch(e => console.error(e));
