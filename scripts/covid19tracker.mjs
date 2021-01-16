import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';

const baseUrl = `https://api.covid19tracker.ca/`;
const ontarioRoute = 'reports/province/on/';
const query = '?';
  // 'county==%27Richmond%27';

const outputPathOntario = '../third_party/api.covid19tracker.ca/covidtracker.ca-ontario-data.json';
const outputPathToronto = '../third_party/api.covid19tracker.ca/covidtracker.ca-toronto-data.json'

const req = await fetch(`${baseUrl}${ontarioRoute}${query}`);
const json = await req.json();
await writeFile(new URL(outputPathOntario, import.meta.url), JSON.stringify(json, undefined, 1));
