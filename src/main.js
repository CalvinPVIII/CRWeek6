import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorService } from './../src/backend.js'

const addDocToUi = (number, response) => {

if (typeof response == 'string' && response.includes("There was an error handling your request")) {
  $("#error").text(response);
  $(".noResult").show();
  $(".results").hide();

}else {
  if (response.data[0] === undefined) {
    $(".noResult").show();
    $(".results").hide();
  }else {
    if (response.data[number] === undefined) {
      $(`.doc${number}`).hide();

    }else {
      $(".results").fadeIn();
      $(".noResult").hide();

      $(`.doc${number}`).show();
      $(`#docImage${number}`).attr('src', response.data[number].profile.image_url)
      $(`#docName${number}`).text(`${response.data[number].profile.first_name}  ${response.data[number].profile.last_name}`)
      $(`#workplace${number}`).text(response.data[number].practices[0].name)
      $(`#address${number}`).text(`${response.data[number].practices[0].visit_address.street}, ${response.data[number].practices[0].visit_address.city}, ${response.data[number].practices[0].visit_address.state_long}, ${response.data[number].practices[0].visit_address.zip}`)
      $(`#number${number}`).text(response.data[number].practices[0].phones[0].number)
      if (response.data[number].practices[0].website === undefined) {
        $(`#website${number}`).text('')
        $(`#website${number}`).attr('')
      }else {
        $(`#website${number}`).text(response.data[number].practices[0].website)
        $(`#website${number}`).attr('href', response.data[number].practices[0].website)
      }
      if (response.data[number].practices[0].accepts_new_patients === true) {
        $(`#acceptingPatients${number}`).text(`${response.data[number].profile.first_name} ${response.data[number].profile.last_name} is accepting new patients.`)
      }else {
        $(`#acceptingPatients${number}`).text(`${response.data[number].profile.first_name} ${response.data[number].profile.last_name} is not accepting new patients.`)
      }
    }
    }
}
}


$(document).ready(function(){
  let docService = new DoctorService;
  $(".docSearch").submit(function(e){
    $(".results").fadeOut();
    e.preventDefault();
    let name = $("#docName").val();
    let symptom = $("#symptom").val();
    (async function docSearch() {
      let response = await docService.findDoctors(name, symptom);
      addDocToUi(0, response)
      addDocToUi(1, response)
      addDocToUi(2, response)
      addDocToUi(3, response)
      addDocToUi(4, response)
  })();
});
});
