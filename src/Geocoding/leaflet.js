// import
import { OpenStreetMapProvider } from 'leaflet-geosearch';

// setup
const provider = new OpenStreetMapProvider();

// search
const results = await provider.search({ query: input.value });
console.log(results)