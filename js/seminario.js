let showModal = (event) => {
  let modalContainer = document.createElement('div')
  modalContainer.setAttribute('id', 'seminario-modal')
  modalContainer.classList.add('modal', 'fade')
  document.body.insertBefore(modalContainer, document.body.firstChild)
  let template = () => {
    return `
  <div class='modal-dialog' role='document'>
    <div class='modal-content'>
      <div class='modal-header'>
        <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
      </div>
      <div class='modal-body '>
        <div>
          <h3>SEMINARIO DECRETO 67/2018 Y SUS DEMANDAS EN LA PRÁCTICA EVALUATIVA PARA EL APRENDIZAJE</h3>
          <h4>SÁBADO 9 DE NOVIEMBRE DE 9:00 A 14:00 HORAS</h4>

          <a href='/docs/programa.pdf' target='_blank' class='text-center center-block' aria-pressed='false' autocomplete='off'>
            Ver Programa
          </a>

          <form class='form-horizontal formulario-inscripcion'>
            <h3>Inscripción</h3>
            <div class='contact-error'>
              <p class='empty-value'>Quedan campos por completar.</p>
              <p class='email-error'>El email ingresado es formato incorrecto.</p>
            </div>
            <div class='send-email-error'>
              <p class='feedback'>No hemos podido enviar el correo, por favor verifica tus datos y vuelve a intentar.</p>
            </div>
            <div class='sent-success'>
              <p class='feedback'>Hemos recibido tu mensaje, pronto te responderemos.</p>
            </div>

            <div class='form-group'>
              <label for='inputNombre' class='control-label'>Nombre completo</label>
              <input type='text' class='form-control name' id='inputNombre' placeholder='Nombre'>
            </div>
            <div class='form-group'>
              <label for='inputInstitucion' class='control-label'>Colegio o Institución</label>
              <input type='text' class='form-control institucion' id='inputInstitucion' placeholder='Colegio o Institución'>
            </div>
            <div class='form-group'>
              <label for='inputRut' class='control-label'>RUT</label>
              <input type='text' class='form-control rut' id='inputRut' placeholder='RUT'>
            </div>
            <div class='form-group'>
              <label for='inputTelefono' class='control-label'>Teléfono</label>
              <input type='text' class='form-control telefono' id='inputTelefono' placeholder='Teléfono'>
            </div>
            <div class='form-group'>
              <label for='inputEmail' class='control-label'>Email</label>
                <input type='email' class='form-control email' id='inputEmail' placeholder='Email'>
            </div>
            <div class='form-group'>
              <button type='submit' class='btn btn-default submit-seminario'>Enviar <i style='display:none;' class='send-spinner fa fa-spinner fa-pulse'></i></button>
            </div>

          </form>

        </div>
      </div>
    </div>
  </div>
    `
  }
  modalContainer.innerHTML = template()
}

let showSeminarioModal = () => {
  $('#seminario-modal').modal()
  $('.submit-seminario').on( 'click', function(e) {
    e.preventDefault()
    sendSeminarioEmail()
  })
}

let sendSeminarioEmail = () => {
  let form = $('form.formulario-inscripcion')
  let email, name, message, data

  email = form.find('.email').val()
  name = form.find('.name').val()
  institucion = form.find('.institucion').val()
  rut = form.find('.rut').val()
  telefono = form.find('.telefono').val()

  let html = "<p>Nueva inscripción a SEMINARIO:</p> <p>Nombre : " + name + 
    " </p> <p>Email : " + email + 
    " </p> <p>Colegio/Institución : " + institucion + 
    " </p> <p>RUT : " + rut + 
    " </p> <p>Teléfono : " + telefono + " </p>"

  if (formValidation([email, name, message], email, form)) {
    let spinner = form.find('.send-spinner')
    sendEmailJS({name, email, institucion, rut, telefono}, 'inscripcion_seminario', null, spinner, form)
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  showModal(event)
  showSeminarioModal(event)
})
