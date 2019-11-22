export class DoctorService {

  async findDoctors(name,search){
    try {
      let response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${search}&location=45.523062%2C-122.676482%2C25&user_location=45.523062%2C-122.676482&skip=0&limit=5&user_key=${process.env.API_KEY}`)
        let jsonifiedResponse = await response.json();
        return jsonifiedResponse;
    }catch (error){
      return "There was an error handling your request: " + error.message;
    }
  }
}
