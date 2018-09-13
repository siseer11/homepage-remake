

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
		document.getElementById('success-message').style.display = 'block';
    }).fail(function (data) {
        console.log(data);
		document.getElementById('error-message').style.display = 'block';
    });
  }); 
});