/**
 * @function getLocation() - Attempt to retrieve current user location. Safe / doesn't throw. 
 * @returns Promise<[number, number] | null>
 */
export function getLocation() {
  return new Promise(resolve => {
    try {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        resolve([lat, long]);
      });
    } catch (e) {
      resolve(null);
    }
  });
}
