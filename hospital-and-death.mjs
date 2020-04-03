import { createWindows, getData } from './lib/util.mjs';
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
  
  const hospitalizedWindows = createWindows(hospitalized);
  const deathsWindows = createWindows(deaths);
  
  console.log(`Hospitalized: ${hospitalizedTotal}`);
  console.log(`Deaths: ${deathTotal}`);
  console.log();
  console.log(`Most Hospitalized: ${mostHospitalized} on ${mostHospitalizedDate}`);
  console.log(`Average Hospitalized: ${averageHospitalized}`);
  console.log();
  console.log(`Most Deaths: ${mostDeaths} on ${mostDeathsDate}`);
  console.log(`Average Deaths: ${averageDeaths}`);
  console.log();
  console.log(`Average daily hospitalizations two weeks ago: ${average(hospitalizedWindows[0])}`);
  console.log(`Average daily hospitalizations week and a half ago: ${average(hospitalizedWindows[1])}`);
  console.log(`Average daily hospitalizations last week: ${average(hospitalizedWindows[2])}`);
  console.log(`Average daily hospitalizations half a week ago: ${average(hospitalizedWindows[3])}`);
  console.log(`Average daily hospitalizations this week: ${average(hospitalizedWindows[4])}`);
  console.log();
  console.log(`Average daily death two weeks ago: ${average(deathsWindows[0])}`);
  console.log(`Average daily death week and a half ago: ${average(deathsWindows[1])}`);
  console.log(`Average daily death last week: ${average(deathsWindows[2])}`);
  console.log(`Average daily death half a week ago: ${average(deathsWindows[3])}`);
  console.log(`Average daily death this week: ${average(deathsWindows[4])}`);
}

main().catch(e => console.error(e));
