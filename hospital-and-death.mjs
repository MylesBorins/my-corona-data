import { createWindows, getData, printWindows } from './lib/util.mjs';
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
  
  const averageHospitalized = average(hospitalized);
  const averageDeaths = average(deaths);
  
  console.log(`Total Hospitalized: ${hospitalizedTotal}`);
  console.log(`Total Deaths: ${deathTotal}`);
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
