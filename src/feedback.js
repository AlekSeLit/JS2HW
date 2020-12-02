export default function takeFeedback() {
  let button = document.querySelector(".feedback__button"),
    reName = /[A-z]+$/g,
    rePhone = /^\+7\(?\d{3}\)?\d{3}\-\d{4}$/g,
    rePhoneOnlyNumber = /[\d]+/g,
    reEmail = /^\w+[\.\-_]?\w+@mail\.ru$/g,
    reText = /[A-z]+$/g;
  button.addEventListener(`click`, () => {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let text = document.getElementById("message").value;
    let resultName = name.match(reName);
    let resultPhone = "";
    if (phone.match(rePhone) === null) {
      resultPhone = phone.match(rePhoneOnlyNumber);
    } else {
      resultPhone = phone.match(rePhone);
    }
    let resultEmail = email.match(reEmail);
    let resultText = text.match(reText);
    console.log(resultName);
    console.log(resultPhone);
    console.log(resultEmail);
    console.log(resultText);
    console.log(`Clicked!`);
  });
}
