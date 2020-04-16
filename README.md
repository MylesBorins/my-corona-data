#  My Corona Data

This is a small local dashboard I've been using to track coronavirus + COVID-19
statistics in NYC, where I live.

## Where is the data from?

This repo vendors both state and city data.

The city data can be found at `third_party/coronavirus-data` which is a git subtree
tracking https://github.com/nychealth/coronavirus-data

The state data can be found at `third_party/nys-doh-testing-data` which is an archive
of JSON data fetched regularly with the command `curl -L https://health.data.ny.gov/resource/xdss-u53e.json > third_party/nys-doh-testing-data/testing.json`

Both data source are regularly updated via `npm run update-data`

## Are you a scientist?

No

## Is this scientific research?

No

## Is this meant for anything other than personal use

No

## Is there a really cool implementation of CSV parsing using async iterators

Yes
