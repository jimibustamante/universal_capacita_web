//custom js goes here
$('document').ready(function(){
  // Init shits up
  $( ".submit-contact" ).on( "click", function(e) {
    e.preventDefault()
    sendNotificationEmail() 
  });
});
var sendNotificationEmail = function() {
  var contact_form = $('form.formulario-contacto')
  var email, name, message
  email = contact_form.find('.email').val()
  name = contact_form.find('.name').val()
  message = contact_form.find('.message').val()
  if (!notEmptyValidation([email, name, message])) {
     
  }
}

var notEmptyValidation = function(data) {
  var messageElement = $('.contact-error .empty-value')
  messageElement.hide()
  _.each(data, function(value) {
    if (value == "") {
      messageElement.show()
      return false
    }
  })
  return true
}