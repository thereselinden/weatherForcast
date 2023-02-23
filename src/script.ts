import { loadFile } from './cities/citites.js';
import { getLocation } from './geoLocation/geoLocation.js';

(async () => {
  getLocation();
  await loadFile();
})();
