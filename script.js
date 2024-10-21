const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const createPassword = document.getElementById('createPassword');
const confirmPassword = document.getElementById('confirmPassword');
const registrationContainer = document.getElementById('registrationContainer');
 

form.addEventListener('submit', (event) => {
  event.preventDefault();
  validate();
})



const sendData = (successRate, count) => {
  if(successRate === count){
    alert('Registration Successfull.');
    setTimeout(function() {
    }, 500);
    setTimeout(function() {
      window.localStorage.setItem('loggedInUser', username);
      window.location.href = "home.html"
    }, 500);
  }
}

const successMessage = () => {
  let formControl = document.getElementsByClassName('form-control');

  var count = formControl.length - 1;
  for(var i = 0; i < formControl.length; i++){
    if(formControl[i].className === "form-control success"){
      successRate = 0 + i;
      console.log(successRate);
      sendData(successRate, count);
    }
    else{
      return false;
    }
  }
}

const isEmail = (emailValue) => {
  var adSymbol = emailValue.indexOf('@');
  if(adSymbol < 1) return false;

  var dot = emailValue.lastIndexOf('.');
  if(dot <= adSymbol + 3) return false;
  if(dot === emailValue.length - 2) return false;

  return true;
}

function validatePassword(createPasswordValue){
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^!@#$%_]*[!@#$%_][^!@#$%_]*$)[A-Za-z0-9!@#$%_]{8,}$/;

  if(!regex.test(createPasswordValue)){
    return true;
  }
  else{
    return false;
  }
}

const validate = () => {
  const fullnameValue = fullname.value.trim();
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const mobileValue = mobile.value.trim();
  const createPasswordValue = createPassword.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if(fullnameValue === ''){
    setErrorMessage(fullname, 'Please enter your full name');
  }
  else if(fullnameValue.length <= 5){    
    setErrorMessage(fullname, 'Full name must be a minimum of 6 characters');
  }
  else{
    setSuccessMessage(fullname);
  }

  if(usernameValue === ''){
    setErrorMessage(username, 'Please create your username');
  }
  else if(usernameValue.length <= 5){    
    setErrorMessage(username, 'Username must be a minimum of 6 characters');
  }
  else{
    setSuccessMessage(username);
  }

  if(emailValue === ''){
    setErrorMessage(email, 'Please enter your email');
  }
  else if(!isEmail(emailValue)){    
    setErrorMessage(email, 'Please enter a valid email');
  }
  else{
    setSuccessMessage(email);
  }

  if(mobileValue === ''){
    setErrorMessage(mobile, 'Please enter your mobile number');
  }
  else if(mobileValue.length != 10){    
    setErrorMessage(mobile, 'Please enter a valid mobile number');
  }
  else{
    setSuccessMessage(mobile);
  }

  if(createPasswordValue === ""){
    setErrorMessage(createPassword, 'Please enter a password');
  }
  else if(createPasswordValue.length < 8){    
    setErrorMessage(createPassword, 'Password must be a minimum of 8 characters');
  }
  else if(validatePassword(createPasswordValue)){
    setErrorMessage(createPassword, 'Password must contain atlest one (0-9), (a-z), (A-Z), (!@#$%_)');
  }
  else{
    setSuccessMessage(createPassword);
  }

  if(confirmPasswordValue === ""){
    setErrorMessage(confirmPassword, 'Please confirm your password');
  }
  else if(createPasswordValue != confirmPasswordValue){    
    setErrorMessage(confirmPassword, 'Passwords does not match');
  }
  else{
    setSuccessMessage(confirmPassword);
  }
  successMessage();
}



function setErrorMessage(input, errorMessages){
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = "form-control error";
  small.innerText = errorMessages;
}



function setSuccessMessage(input){
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}