//custom js goes here
$('document').ready(function(){
  // Init shits up
  $( ".submit-contact" ).on( "click", function(e) {
    e.preventDefault()
    sendNotificationEmail() 
  });

  $( ".submit-coaching" ).on( "click", function(e) {
    e.preventDefault()
    sendCoachingEmail() 
  });  
});

var sendNotificationEmail = function() {
  var contact_form = $('form.formulario-contacto')
  var email, name, message, data

  email = contact_form.find('.email').val()
  name = contact_form.find('.name').val()
  message = contact_form.find('.message').val()

  var html = "<p>Hey Admin, un cliente te ha enviado un correo:</p> <p>Nombre : " + name + " </p> <p>Email : " + email + " </p> <p>Mensaje : " + message + " </p>"

  if (formValidation([email, name, message], email, contact_form)) {
    var spinner = contact_form.find('.send-spinner')
    sendMandrillEmail(setParams("jimibustamante@gmail.com", html, "Nuevo Contacto"), sendFeedbackContactEmail, spinner, contact_form)
  }
}

var sendCoachingEmail = function() {
  var contact_form = $('form.formulario-coaching')
  var email, name, message, data

  email = contact_form.find('.email').val()
  name = contact_form.find('.name').val()
  phone = contact_form.find('.phone').val()
  message = contact_form.find('.message').val()

  var html = "<p>Hey Admin, un cliente te ha solicitado información sobre <b>Coaching</b>:</p> <p>Nombre : " + name + " </p> <p>Email : " + email + " </p> <p>Teléfono : " + phone + " </p> <p>Mensaje : " + message + " </p>"

  if (formValidation([email, name, message, phone], email, contact_form)) {
    var spinner = contact_form.find('.send-spinner')
    sendMandrillEmail(setParams("jimibustamante@gmail.com", html, "Solicitud Coaching"), sendFeedbackContactEmail, spinner, contact_form)
  }
}

var formValidation = function(data, email, form) {
  var messageElement = form.find('.empty-value')
  var validate = true
  messageElement.hide()
  _.each(data, function(value) {
    if (value == "") {
      messageElement.show()
      validate = false;
    }
  })
  return validate;
}

var sendMandrillEmail = function (data, successCallback, spinner, contact_form) {
  if (spinner) {spinner.show()}
  $.ajax({
    type: "POST",
    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
    data: data,
    success : function (data) {
      var messageElement = contact_form.find('.sent-success .feedback')
      if (spinner) {spinner.hide()}
      messageElement.show()
      if (successCallback) {
        successCallback()
      }
    },
    error : function (data) {
      var messageElement = contact_form.find('.send-email-error .feedback')
      messageElement.show()
      if (spinner) {spinner.hide()}
    }
  });
}

// Luego que se envía mensaje a admin se gatilla email para el cliente, en formulario de contactos
var sendFeedbackContactEmail = function (argument) {
  var email, name, message
  var contact_form = $('form.formulario-contacto')
  email = contact_form.find('.email').val()
  name = contact_form.find('.name').val()
  message = contact_form.find('.message').val()
  var html = "<p>Estimado(a) " + name + ", hemos recibido tu mensaje. En breve contestaremos tu solicitud.</p>"
  sendMandrillEmail(setParams(email, html, "Hemos recibido tu mensaje."), null, null, contact_form)
}

var setParams = function (email, html, subject) {
  var params = {
      "key" : "zdwPyDieBKVqSIeyYq_iyQ",
      "message": {
        "from_email":"contacto@universalcapacita.cl",
        "to":[{"email": email }],
        "subject": subject,
        "html": html,
        "autotext": true
      }
  };
  return params
}