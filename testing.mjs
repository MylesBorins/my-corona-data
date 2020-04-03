import { createWindows, getData, printWindows } from './lib/util.mjs';
import { sum, average, percentage } from './lib/math.mjs';

function sanitize(data) {
  const tested = [];
  const positive = [];
  
  let mostTested = 0;
  let mostTestedDate = '';
  let mostPositive = 0;
  let mostPositiveDate = '';
  
  data.forEach(day => {
    if (day.tested > mostTested) {
      mostTested = day.tested;
      mostTestedDate = day.date;
    }
    if (day.positive > mostPositive) {
      mostPositive = day.positive;
      mostPositiveDate = day.date;
    }
    tested.push(day.tested);
    positive.push(day.positive);
  });

  return [
    tested,
    positive,
    mostTested,
    mostTestedDate,
    mostPositive,
    mostPositiveDate
  ];
}

async function main() {
  const [
    tested,
    positive,
    mostTested,
    mostTestedDate,
    mostPositive,
    mostPositiveDate
  ] = sanitize(await getData());

  const testedTotal = sum(tested);
  const positiveTotal = sum(positive);
 
  const averageTested = average(tested);
  const averagePositive = average(positive);
  const percentagePositive = percentage(positiveTotal, testedTotal);
  console.log(`Total Tested: ${testedTotal}`);
  console.log(`Total Positive: ${positiveTotal}`);
  console.log(`Precentage Positive: ${percentagePositive}`);
  console.log();
  
  console.log(`Average Tested: ${averageTested}`);
  console.log(`Most Tested: ${mostTested} on ${mostTestedDate}`);
  console.log();
  printWindows('daily tested', createWindows(tested));
  console.log();

  console.log(`Average Positive: ${averagePositive}`);
  console.log(`Most Positive: ${mostPositive} on ${mostPositiveDate}`);
  console.log();
  printWindows('daily positive', createWindows(positive));
  console.log();
}

main().catch(e => console.error(e));
