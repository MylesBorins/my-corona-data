import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';

const route = 'reports/province/on';
const baseUrl = `https://api.covid19tracker.ca/${route}/`;
const query = '';
  // 'county==%27Richmond%27';

const outputPath = '../third_party/api.covid19tracker.ca/covidtracker.ca-ontario-data.json';

const req = await fetch(`${baseUrl}?${query}`);
const json = await req.json();
await writeFile(new URL(outputPath, import.meta.url), JSON.stringify(json, undefined, 1));
