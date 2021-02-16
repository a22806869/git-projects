// const form = document.getElementById("form");
// const username = document.getElementById("username");
// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const password2 = document.getElementById("password2");

// // Show input error message
// function showError(input, message) {
//   const formControl = input.parentElement;
//   formControl.className = "form-control error";
//   const small = formControl.querySelector("small");
//   small.innerText = message;
// }

// // Show success outline
// function showSuccess(input) {
//   const formControl = input.parentElement;
//   formControl.className = "form-control success";
// }

// // Check email is valid
// function checkEmail(input) {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (re.test(input.value.trim())) {
//     showSuccess(input);
//   } else {
//     showError(input, "Email is not valid");
//   }
// }

// //Check required fields
// function checkRequired(inputArr) {
//   inputArr.forEach(function (input) {
//     if (input.value.trim() === "") {
//       console.log(input.id);
//       showError(input, `${getFieldName(input)} is required`);
//     } else {
//       showSuccess(input);
//     }
//   });
// }

// //check input length
// function checkLength(input, min, max) {
//   if (input.value.length < min) {
//     showError(
//       input,
//       `${getFieldName(input)} must be at least ${min} characters`
//     );
//   } else if (input.value.length > max) {
//     showError(
//       input,
//       `${getFieldName(input)} must be less than${max} characters`
//     );
//   } else {
//     showSuccess(input);
//   }
// }

// //check passwords match
// function checkPasswordMatch(input1, input2) {
//   if (input1.value !== input2.value) {
//     showError(input2, "Password do not match");
//     // console.log("if");
//   } else {
//     showSuccess(input2);
//     // console.log("else");
//   }
// }

// function getFieldName(input) {
//   return input.id.charAt(0).toUpperCase() + input.id.slice(1);
// }

// username.addEventListener("keyup", function (e) {
//   e.preventDefault();
//   checkLength(username, 3, 15);
// });

// email.addEventListener("keyup", function (e) {
//   e.preventDefault();
//   checkEmail(email);
// });

// password.addEventListener("keyup", function (e) {
//   e.preventDefault();
//   checkLength(password, 8, 16);
// });

// password2.addEventListener("keyup", function (e) {
//   e.preventDefault();
//   checkPasswordMatch(password, password2);
// });

// // Event listeners
// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   checkRequired([username, email, password, password2]);
//   checkLength(username, 3, 15);
//   checkLength(password, 8, 16);
//   checkEmail(email);
//   checkPasswordMatch(password, password2);
// });

// function inputEmpty(input) {
//   const inputSelf = document.querySelectorAll("input");
//   const inputValue = inputSelf.value;

//   if (inputSelf === "") {
//     inputValue === "";
//   }
// }


let username = $('#username');
let email = $('#email');
let password = $('#password');
let password2 = $('#password2');



function getFieldName(input) {

  return input.charAt(0).toUpperCase() + input.slice(1)
}



function showError(input, message) {
  let parent = $(input[0]).parentElement;
  parent.attr('class', 'form-control error')

  let small = $('small').text();
  small = message;
};

function showSuccess(input) {
  let parent = $(input[0]).parentElement;
  parent.attr('class', 'form-control success')
};


function checklength(input, min, max) {

  let checknum = input[0].value
  console.log(input[0].parentElement);

  if (checknum.length < min) {
    showError(input, `${input.value} must be at least ${min} characters`);
    console.log('123');

  } else if (checknum.length > max) {
    showError(input, `${input} must be less than ${min} characters`);
    console.log('sdfsd');
  } else {
    showSuccess(checknum);
    console.log('sdf123');


  }
}

$('#form').submit(((e) => {

  e.preventDefault();
  checklength(username, 3, 15);
  // checklength(password, 10, 16);

  // console.log(username.val());
}))