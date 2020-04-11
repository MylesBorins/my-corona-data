import { createWindows, getCityData, printWindows } from './lib/util.mjs';
import { sum, average, percentage } from './lib/math.mjs';

function sanitize(data) {
  const deaths = [];
  const hospitalized = [];
  const positive = [];
  
  let mostPositive = 0;
  let mostPositiveDate = '';
  
  let mostHospitalized = 0;
  let mostHospitalizedDate = '';
  
  let mostDeaths = 0;
  let mostDeathsDate = '';
  
  let mostRecentDate;
  
  data.forEach(day => {
    if (!mostRecentDate) mostRecentDate = day.date;
    else if (new Date(mostRecentDate) < new Date(day.date)) {
      mostRecentDate = day.date;
    }
    
    if (day.positive > mostPositive) {
      mostPositive = day.positive,
      mostPositiveDate = day.date;
    }
    if (day.deaths > mostDeaths) {
      mostDeaths = day.deaths;
      mostDeathsDate = day.date;
    }
    if (day.hospitalized > mostHospitalized) {
      mostHospitalized = day.hospitalized;
      mostHospitalizedDate = day.date;
    }
    positive.push(day.positive);
    deaths.push(day.deaths);
    hospitalized.push(day.hospitalized)
  });

  return [
    hospitalized,
    mostHospitalized,
    mostHospitalizedDate,
    deaths,
    mostDeaths,
    mostDeathsDate,
    positive,
    mostPositive,
    mostPositiveDate,
    mostRecentDate
  ];
}

async function main() {
  const [
    hospitalized,
    mostHospitalized,
    mostHospitalizedDate,
    deaths,
    mostDeaths,
    mostDeathsDate,
    positive,
    mostPositive,
    mostPositiveDate,
    mostRecentDate
  ] = sanitize(await getCityData());
  
  const positiveTotal = sum(positive);
  const hospitalizedTotal = sum(hospitalized);
  const deathTotal = sum(deaths);
  
  const averagePositive = average(positive);
  const averageHospitalized = average(hospitalized);
  const averageDeaths = average(deaths);

  console.log('NYC Corona Data\n');
  console.log(`Data as of: ${new Date(mostRecentDate).toDateString()}\n`);
  console.log(`Total Positive Tests: ${positiveTotal}`);
  console.log(`Total Hospitalized: ${hospitalizedTotal}`);
  console.log(`Total Deaths: ${deathTotal}`);
  console.log();
  console.log(`Most Positive Tests: ${mostPositive} on ${mostPositiveDate}`);
  console.log(`Average Positive Tests: ${averagePositive}`);
  console.log();
  printWindows('daily positive tests', createWindows(positive));
  console.log();
  console.log(`Most Hospitalized: ${mostHospitalized} on ${mostHospitalizedDate}`);
  console.log(`Average Hospitalized: ${averageHospitalized}`);
  console.log();
  printWindows('daily hospitalizations', createWindows(hospitalized));
  console.log();
  console.log(`Most Deaths: ${mostDeaths} on ${mostDeathsDate}`);
  console.log(`Average Deaths: ${averageDeaths}`);
  console.log();
  printWindows('daily deaths', createWindows(deaths));
}

main().catch(e => console.error(e));