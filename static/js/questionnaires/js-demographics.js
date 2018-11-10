$(document).ready(function(){
  $('#demographicsGender-Male').click(() => {changeGender('Male')})
  $('#demographicsGender-Female').click(() => {changeGender('Female')})
  $('#demographicsGender-Other').click(() => {changeGender('Other')})
  $('#demographicsGender-PreferNotToSay').click(() => {changeGender('Prefer not to say')})

  function changeGender(val){
    g = "Gender: "
    g = g.concat(val)
    $('#demographicsGenderButton').html(g)
  }
})
