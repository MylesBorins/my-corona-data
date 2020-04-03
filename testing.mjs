import { createWindows, getData } from './lib/util.mjs';
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

  const testingWindows = createWindows(tested);
  const positiveWindows = createWindows(positive);

  console.log(`Tested: ${testedTotal}`);
  console.log(`Positive: ${positiveTotal}`);
  console.log();
  console.log(`Most Tested: ${mostTested} on ${mostTestedDate}`);
  console.log(`Average Tested: ${averageTested}`);
  console.log();
  console.log(`Most Positive: ${mostPositive} on ${mostPositiveDate}`);
  console.log(`Average Positive: ${averagePositive}`);
  console.log();
  console.log(`Precentage Positive: ${percentagePositive}`);
  console.log();
  console.log(`Average daily tested two weeks ago: ${average(testingWindows[0])}`);
  console.log(`Average daily tested week and a half ago: ${average(testingWindows[1])}`);
  console.log(`Average daily tested last week: ${average(testingWindows[2])}`);
  console.log(`Average daily tested half a week ago: ${average(testingWindows[3])}`);
  console.log(`Average daily tested this week: ${average(testingWindows[4])}`);
  console.log();
  console.log(`Average daily postive two weeks ago: ${average(positiveWindows[0])}`);
  console.log(`Average daily postive week and a half ago: ${average(positiveWindows[1])}`);
  console.log(`Average daily postive last week: ${average(positiveWindows[2])}`);
  console.log(`Average daily postive half a week ago: ${average(positiveWindows[3])}`);
  console.log(`Average daily postive this week: ${average(positiveWindows[4])}`);
  console.log();
}

main().catch(e => console.error(e));
