
$("#success-message").hide();
$("#error-message").hide();
$(function () {    
  $("#gb-feedback").submit(function (e) {
    e.preventDefault();
    var form_data = $(this).serialize(); 
    $.ajax({
      type: "POST", 
      url: "email-sent.php",
      dataType: "json", // Add datatype
      data: form_data
    }).done(function (data) {
        console.log(data);
		$("#success-message").show();
    }).fail(function (data) {
        console.log(data);
		$("#error-message").show();
    });
  }); 
});