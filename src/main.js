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
  })();
});
});
