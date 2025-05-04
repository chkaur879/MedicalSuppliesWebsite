var firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()
var firestore = firebase.firestore()
let contactInfo = firebase.firestore().collection('request-info')
var form = document.getElementById('contact-form')
form.addEventListener('submit', submitForm)
async function submitForm(e) {
  e.preventDefault()
  let name = document.querySelector('.name').value
  let email = document.querySelector('.email').value
  let phone = document.querySelector('.phone').value
  let subject = document.querySelector('.subject').value
  let message = document.querySelector('.message').value
  var date = new Date()
  var dd = String(date.getDate()).padStart(2, '0')
  var mm = String(date.getMonth() + 1).padStart(2, '0')
  var yyyy = date.getFullYear()
  date = mm + '/' + dd + '/' + yyyy
  saveContactInfo(name, email, phone, subject, message, date)
  var status = document.getElementById('status-form')
  var data = new FormData(e.target)
  fetch(e.target.action, {
    method: form.method,
    body: data,
    headers: { Accept: 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        status.style.visibility = 'visible'
        status.innerHTML = 'Thanks for your submission!'
        form.reset()
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data.errors
              .map((error) => error.message)
              .join(', ')
          } else {
            status.innerHTML = 'Oops! There was a problem submitting your form'
          }
        })
      }
    })
    .catch((error) => {
      status.innerHTML = 'Oops! There was a problem submitting your form'
    })
}
function saveContactInfo(name, email, phone, subject, message, date) {
  contactInfo.doc().set({
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    message: message,
    date: date,
  })
}
