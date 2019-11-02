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
    sendEmailJS({'name': name, 'email': email, 'message': message}, 'nuevo_contacto', sendFeedbackContactEmail, spinner, contact_form)
  }
}

var sendCoachingEmail = function() {
  var contact_form = $('form.formulario-coaching')
  var email, name, message, data

  email = contact_form.find('.email').val()
  name = contact_form.find('.name').val()
  phone = contact_form.find('.phone').val()
  message = contact_form.find('.message').val()

  if (formValidation([email, name, message, phone], email, contact_form)) {
    var spinner = contact_form.find('.send-spinner')
    sendEmailJS({'service': 'Coaching', 'name': name, 'email': email, 'phone': phone, 'message': message}, 'service_email', sendFeedbackContactEmail, spinner, contact_form)
  }
}

var sendCourseEmail = function(title, el) {
  event.preventDefault()
  var contact_form = $(el.parentElement.parentElement)
  var email, name, phone, city, region, quantity, inst_name
  name = contact_form.find('.name').val()
  inst_name = contact_form.find('.inst-name').val()
  email = contact_form.find('.email').val()
  phone = contact_form.find('.phone').val()
  city = contact_form.find('.city').val()
  region = contact_form.find('.region').val()
  quantity = contact_form.find('.quantity').val()

  var html = "<p>Hey Admin, un cliente te ha solicitado información sobre el curso <b>" + title + "</b>:</p> <p>Nombre : " + name + " </p> <p>Nombre Institución : " + inst_name + " </p> <p>Email : " + email + " </p> <p>Teléfono : " + phone + " </p><p>Ciudad : " + city + " </p>  <p>Región : " + region + " </p><p>Cantidad de Asistentes: " + quantity + " </p> "

  if (formValidation([email, name, city, phone, quantity, region, inst_name], email, contact_form)) {
    var spinner = contact_form.find('.send-spinner')
    sendEmailJS({'service': 'Curso', 'curso': title, 'name': name, 'email': email, 'phone': phone, 'inst_name': inst_name, 'city': city, 'region': region, 'quantity': quantity}, 'service_email', sendFeedbackContactEmail, spinner, contact_form)
  }
}

var formValidation = function(data, email, form) {
  let messageElement = form.find('.empty-value')
  let emailFeedback = form.find('.email-error')
  let validate = true
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  messageElement.hide()
  if (emailFeedback) emailFeedback.hide()
  if (email && !emailRegex.test(String(email).toLowerCase())) {
    validate = false
    if (emailFeedback) emailFeedback.show()
  }
  _.each(data, function(value) {
    if (value == "") {
      messageElement.show()
      validate = false;
    }
  })
  function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
  return validate;
}

var sendEmailJS = function (data, template, successCallback, spinner, form) {
  if (spinner) {spinner.show()}
  emailjs.send('zoho', template, data)
  .then(function(response) {
    console.log('SUCCESS. status=%d, text=%s', response.status, response.text);
    var messageElement = form.find('.sent-success .feedback')
    if (spinner) {spinner.hide()}
    messageElement.show()
    if (successCallback) {
      successCallback(form)
    }
  }, function(err) {
    var messageElement = form.find('.send-email-error .feedback')
    messageElement.show()
    if (spinner) {spinner.hide()}
  });
}

// Luego que se envía mensaje a admin se gatilla email para el cliente, en formulario de contactos
var sendFeedbackContactEmail = function (contact_form) {
  return
  // var email, name
  // email = contact_form.find('.email').val()
  // name = contact_form.find('.name').val()
  // var html = "<p>Estimado(a) " + name + ", hemos recibido tu mensaje. En breve contestaremos tu solicitud.</p>"
  // sendEmailJS({'name': name, 'email': email}, 'feedback_contacto', null, null, contact_form)
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
