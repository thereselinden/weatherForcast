import { loadFile } from './cities/citites';
import { getLocation } from './geoLocation/geoLocation';

(async () => {
  getLocation();
  await loadFile();
})();
