import { createReadStream } from 'fs';
import parse from 'csv-parse';

async function main() {
  const csvPath = await import.meta.resolve('./coronavirus-data/testing.csv');
  const readStream = createReadStream(new URL(csvPath));
  const parser = readStream.pipe(parse());
  let tested = 0;
  let positive = 0;
  let mostTested = 0;
  let mostTestedDate = '';
  let avgTested = 0;
  let count = 0;
  for await (const record of parser) {
    if (count !== 0) {
      let numtested = Number(record[2]);
      tested += numtested;
      positive += Number(record[3]);
      if (numtested > mostTested) {
        mostTested = numtested;
        mostTestedDate = record[1];
      }
    }
    count++;
  }
  avgTested = tested / (count - 1);
  console.log(`\nPositive: ${positive}\nTested: ${tested}\n\nMost Tested: ${mostTested} on ${mostTestedDate}\nAverage Tested: ${avgTested}\n`);
}

main().catch(e => console.error(e));
