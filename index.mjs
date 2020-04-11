async function main() {
  await import('./new-york-state-data.mjs');
  await import('./new-york-city-data.mjs');
}

main().catch(e => console.error(e));
