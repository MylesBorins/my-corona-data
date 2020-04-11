async function main() {
  // await import('./testing.mjs');
  await import('./new-york-city-data.mjs');
}

main().catch(e => console.error(e));
