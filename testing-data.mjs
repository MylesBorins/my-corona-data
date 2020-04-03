import { getData } from './lib/data.mjs';
import { sum, average, percentage } from './lib/math.mjs';

async function main() {
  const data = await getData();
  
  const tested = [];
  const positive = [];
  
  let mostTested = 0;
  let mostTestedDate = '';
  
  data.forEach(day => {
    if (day.tested > mostTested) {
      mostTested = day.tested;
      mostTestedDate = day.date
    }
    tested.push(day.tested);
    positive.push(day.positive);
  });

  const testedTotal = sum(tested);
  const positiveTotal = sum(positive);
 
  const averageTested = average(tested);
  const percentagePositive = percentage(positiveTotal, testedTotal);

  const testedTwoWeeksAgo = tested.slice(tested.length - 21, tested.length - 14);
  const testedWeekAndAHalf = tested.slice(tested.length - 17, tested.length - 10);
  const testedLastWeek = tested.slice(tested.length - 14, tested.length - 7);
  const testedHalfAWeek = tested.slice(tested.length - 11, tested.length - 4);
  const testedThisWeek = tested.slice(tested.length - 7, tested.length);
 
  console.log(`\nPositive: ${positiveTotal}`);
  console.log(`Tested: ${testedTotal}`);
 
  console.log(`\nMost Tested: ${mostTested} on ${mostTestedDate}`);
  console.log(`Average Tested: ${averageTested}`);
  console.log(`Precentage Positive: ${percentagePositive}`);

  console.log(`\nAverage two weeks ago: ${average(testedTwoWeeksAgo)}`);
  console.log(`Average week and a half ago: ${average(testedWeekAndAHalf)}`);
  console.log(`Average last week: ${average(testedLastWeek)}`);
  console.log(`Average half a week ago: ${average(testedHalfAWeek)}`);
  console.log(`Average this week: ${average(testedThisWeek)}\n`);
}

main().catch(e => console.error(e));
