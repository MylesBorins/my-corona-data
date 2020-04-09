async function main() {
  console.log('NYC Corona Data\n');
  // await import('./testing.mjs');
  await import('./new-york-city-data.mjs');
}

main().catch(e => console.error(e));
