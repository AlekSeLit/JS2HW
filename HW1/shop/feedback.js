// const text = `I love JavaScript and TypeScript`;
// const re = /[\S]+Script/g;
// const res = text.match(re)
// console.log(res);

// const a = `2000 league ander the sea`;
// const re = /[\d]+/g;
// const res = a.match(re);
// console.log(res);

// class FeedbackInfo {
//   name = "";
//   phone = "";
//   email = "";
//   message = "";

//   constructor(name, phone, email, message) {
//     this.name = name;
//     this.phone = phone;
//     this.email = email;
//     this.message = message;
//     this.findFeedbackName();
//     this.findFeedbackPhone();
//   }
//   findFeedbackName() {
//     const { name } = this,
//       re = /[a-zA-Z]/g,
//       resultName = name.match(re);
//     console.log(resultName);
//   }
//   findFeedbackPhone() {
//     const { phone } = this,
//       re = /[\D]+/g,
//       resultPhone = phone.match(re);
//     console.log(resultPhone);
//   }
//   takeFeedback() {
//     let button = document.querySelector(".feedback__button"),
//       name = document.querySelector(".name"),
//       phone = document.querySelector(".phone"),
//       email = document.querySelector(".email"),
//       text = document.querySelector(".feedback__control__textarea");
//     button.addEventListener(`click`, () => {
//       let feedbackForm = new FeedbackInfo(name, phone, email, text);
//     });
//   }
// }

// const Feedback = new FeedbackInfo();
function takeFeedback() {
  let button = document.querySelector(".feedback__button"),
    reName = /[a-zA-Z]+$/g,
    rePhone = /^\+7\(?\d{3}\)?\d{3}\-\d{4}$/g,
    rePhoneOnlyNumber = /[\d]+/g,
    reEmail = /^\w+[\.\-_]?\w+@mail\.ru$/g,
    reText = /[a-zA-Z]+$/g;
  button.addEventListener(`click`, () => {
    name = document.getElementById("name").value;
    phone = document.getElementById("phone").value;
    email = document.getElementById("email").value;
    text = document.getElementById("message").value;
    resultName = name.match(reName);
    if (phone.match(rePhone) === null) {
      resultPhone = phone.match(rePhoneOnlyNumber);
    } else {
      resultPhone = phone.match(rePhone);
    }
    resultEmail = email.match(reEmail);
    resultText = text.match(reText);
    console.log(resultName);
    console.log(resultPhone);
    console.log(resultEmail);
    console.log(resultText);
    console.log(`Clicked!`)
  });
}
takeFeedback();
