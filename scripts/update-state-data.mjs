import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';

const baseUrl = 'https://health.data.ny.gov/resource/xdss-u53e.json'
const query = '$where=county==%27New%20York%27%20OR%20' +
  'county==%27Queens%27%20OR%20' +
  'county==%27Kings%27%20OR%20' +
  'county==%27Bronx%27%20OR%20' +
  'county==%27Richmond%27';

const outputPath = '../third_party/nys-doh-testing-data/testing.json';

const req = await fetch(`${baseUrl}?${query}`);
const text = await req.text();
await writeFile(new URL(outputPath, import.meta.url), text);

