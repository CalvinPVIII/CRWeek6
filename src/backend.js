export class DoctorService {

  async findDoctors(name,search){
    console.log('searchapi');
    try {
      let response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${search}&location=45.523062%2C-122.676482%2C25&user_location=45.523062%2C-122.676482&skip=0&limit=1&user_key=631223502727a3f5d14acbe9cc462f25`)
        let jsonifiedResponse = await response.json();
        return jsonifiedResponse;
    }catch (error){
      console.error("There was an error handling your request: " + error.message);
    }
  }
}
