import { getData } from './lib/util.mjs';
import { sum, average, percentage } from './lib/math.mjs';

function sanitize(data) {
  const deaths = [];
  const hospitalized = [];
  
  let mostHospitalized = 0;
  let mostHospitalizedDate = '';
  
  let mostDeaths = 0;
  let mostDeathsDate = '';
  
  data.forEach(day => {
    if (day.deaths > mostDeaths) {
      mostDeaths = day.deaths;
      mostDeathsDate = day.date;
    }
    if (day.hospitalized > mostHospitalized) {
      mostHospitalized = day.hospitalized;
      mostHospitalizedDate = day.date;
    }
    deaths.push(day.deaths);
    hospitalized.push(day.hospitalized)
  });

  return [
    hospitalized,
    mostHospitalized,
    mostHospitalizedDate,
    deaths,
    mostDeaths,
    mostDeathsDate
  ];
}

function print(data) {
  const {
    hospitalizedTotal,
    deathTotal,
    // averageTested,
    // percentagePositive,
    // mostTested,
    // mostTestedDate,
    // testingWindows
  } = data;
  console.log(`Hospitalized: ${hospitalizedTotal}`);
  console.log(`Deaths: ${deathTotal}`);
  console.log();
  // console.log(`Most Tested: ${mostTested} on ${mostTestedDate}`);
  // console.log(`Average Tested: ${averageTested}`);
  // console.log(`Precentage Positive: ${percentagePositive}`);
  // console.log();
  // console.log(`Average tested two weeks ago: ${average(testingWindows[0])}`);
  // console.log(`Average tested week and a half ago: ${average(testingWindows[1])}`);
  // console.log(`Average tested last week: ${average(testingWindows[2])}`);
  // console.log(`Average tested half a week ago: ${average(testingWindows[3])}`);
  // console.log(`Average tested this week: ${average(testingWindows[4])}`);
  // console.log();
}

async function main() {
  const [
    hospitalized,
    mostHospitalized,
    mostHospitalizedDate,
    deaths,
    mostDeaths,
    mostDeathsDate
  ] = sanitize(await getData());
  
  const hospitalizedTotal = sum(hospitalized);
  const deathTotal = sum(deaths);
  
  print({
    hospitalizedTotal,
    deathTotal
  })
}

main().catch(e => console.error(e));
