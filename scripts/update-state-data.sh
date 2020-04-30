set -e
curl -L https://health.data.ny.gov/resource/xdss-u53e.json > third_party/nys-doh-testing-data/testing.json
git add -A
git diff-index --quiet HEAD || git commit -m 'update state data'
