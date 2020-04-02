import { createReadStream } from 'fs';
import parse from 'csv-parse';

async function parseData() {
  
}

function sum(acc, num) {
  return acc + num;
}

async function main() {
  const csvPath = await import.meta.resolve('./coronavirus-data/testing.csv');
  const readStream = createReadStream(new URL(csvPath));
  const parser = readStream.pipe(parse());
  let mostTested = 0;
  let mostTestedDate = '';
  let count = 0;
  const tested = [];
  const positive = [];
  for await (const record of parser) {
    if (count !== 0) {
      tested.push(Number(record[2]));
      positive.push(Number(record[3]))
      if (tested[count - 1] > mostTested) {
        mostTested = tested[count - 1];
        mostTestedDate = record[1];
      }
    }
    count++;
  }

  const testedTotal = tested.reduce(sum, 0);
  const positiveTotal = positive.reduce(sum, 0);
  
  const avgTested = testedTotal / tested.length;
  const percentagePositive = ((positiveTotal / testedTotal) * 100).toFixed(2);
  console.log(`\nPositive: ${positiveTotal}\nTested: ${testedTotal}`);
  console.log(`\nMost Tested: ${mostTested} on ${mostTestedDate}\nAverage Tested: ${avgTested}\nPrecentage Positive: ${percentagePositive}\n`)
}

main().catch(e => console.error(e));
