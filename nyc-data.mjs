import { createReadStream } from 'fs';
import parse from 'csv-parse';

async function parseData() {
  
}

function sum(arr) {
  return arr.reduce((acc, num) => {
    return acc + num;
  });
}

function avg(arr) {
  return (sum(arr) / arr.length).toFixed(2);
}

function percentage(num, den) {
  return ((num / den) * 100).toFixed(2);
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

  const testedTotal = sum(tested);
  const positiveTotal = sum(positive);
  
  const avgTested = avg(tested);
  const percentagePositive = percentage(positiveTotal, testedTotal);
  
  const testedTwoWeeksAgo = tested.slice(tested.length - 21, tested.length - 14);
  const testedWeekAndAHalf = tested.slice(tested.length - 17, tested.length - 10);
  const testedLastWeek = tested.slice(tested.length - 14, tested.length - 7);
  const testedHalfAWeek = tested.slice(tested.length - 11, tested.length - 4);
  const testedThisWeek = tested.slice(tested.length - 7, tested.length);

  console.log(`\nPositive: ${positiveTotal}`);
  console.log(`Tested: ${testedTotal}`);

  console.log(`\nMost Tested: ${mostTested} on ${mostTestedDate}`);
  console.log(`Average Tested: ${avgTested}`);
  console.log(`Precentage Positive: ${percentagePositive}`);
  
  console.log(`\nAverage two weeks ago: ${avg(testedTwoWeeksAgo)}`);
  console.log(`Average week and a half ago: ${avg(testedWeekAndAHalf)}`);
  console.log(`Average last week: ${avg(testedLastWeek)}`);
  console.log(`Average half a week ago: ${avg(testedHalfAWeek)}`);
  console.log(`Average this week: ${avg(testedThisWeek)}\n`);
}

main().catch(e => console.error(e));
