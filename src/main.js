import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorService } from './../src/backend.js'


$(document).ready(function(){
  let docService = new DoctorService;
  $(".docSearch").submit(function(e){
    e.preventDefault();
    let name = $("#docName").val();
    let symptom = $("#symptom").val();
    console.log(name, symptom);
    (async function docSearch() {
      let response = await docService.findDoctors(name, symptom);
      console.log(response);
      $("#docImage").attr('src', response.data[0].profile.image_url)
      $("#first").text(response.data[0].profile.first_name)
      $("#middle").text(response.data[0].profile.middle_name)
      $("#last").text(response.data[0].profile.last_name)
      $("#workplace").text(response.data[0].practices[0].name)
      $('#address').text(`${response.data[0].practices[0].visit_address.street}, ${response.data[0].practices[0].visit_address.city}, ${response.data[0].practices[0].visit_address.state_long}, ${response.data[0].practices[0].visit_address.zip}`)
      $("#number").text(response.data[0].practices[0].phones[0].number)
      $("#website").text(response.data[0].practices[0].website)
      $("#website").attr('href', response.data[0].practices[0].website)
      if (response.data[0].practices[0].accepts_new_patients === true) {
        $("#acceptingPatients").text(`${response.data[0].profile.first_name} ${response.data[0].profile.last_name} is accepting new patients.`)
      }
  })();
});
});
