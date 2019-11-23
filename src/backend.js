export class DoctorService {

  async findDoctors(name, search, lat, lon) {
    try {
      let response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${search}&location=${lat}%2C${lon}%2C25&user_location=${lat}%2C${lon}&skip=0&limit=5&user_key=${process.env.API_KEY}`);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch (error) {
      return "There was an error handling your request: " + error.message;
    }
  }
  async getLocationInfo(location) {
    try {
      let response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${process.env.GEO_API_KEY}`);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch (error) {
      return "There was an error handling your request: " + error.message;
    }
  }
}
