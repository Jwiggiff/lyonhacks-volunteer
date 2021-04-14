import {
  registerVolunteer,
  registerOrganization,
  registerSchool,
  login,
  logout,
} from "./firebase.js";

function registerEvents() {
  const loginForm = document.getElementById("loginForm");
  const volunteerForm = document.getElementById("volunteerRegisterForm");
  const orgForm = document.getElementById("orgRegisterForm");
  const schoolForm = document.getElementById("schoolRegisterForm");

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = e.target.querySelector("#email");
    let pasword = e.target.querySelector("#password");

    login(email, password);
  });
  volunteerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstName = e.target.querySelector("#f_name").value;
    let lastName = e.target.querySelector("#l_name").value;
    let email = e.target.querySelector("#email").value;
    let password = e.target.querySelector("#password").value;
    let age = e.target.querySelector("#age").value;
    let postalCode = e.target.querySelector("#p_code").value;
    let interests = Array.from(
      e.target.querySelectorAll("#interests option:checked")
    ).map((el) => el.value);
    let timeFrame = e.target.querySelector("#time_frame").value;
    let timeCommitment = e.target.querySelector("#time_commitment").value;
    let hideEmail = e.target.querySelector("#hide_email").checked;
    let school = e.target.querySelector("#school").value;

    registerVolunteer(
      age,
      email,
      password,
      firstName,
      lastName,
      interests,
      postalCode,
      timeCommitment,
      timeFrame
    );
  });
  orgForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = e.target.querySelector("#name").value;
    let email = e.target.querySelector("#email").value;
    let phoneNumber = e.target.querySelector("#phone").value;
    let password = e.target.querySelector("#password").value;
    let address = e.target.querySelector("#addr").value;
    let website = e.target.querySelector("#website").value;
    let fields = Array.from(
      e.target.querySelectorAll("#fields option:checked")
    ).map((el) => el.value);
    let description = e.target.querySelector("#desc").value;
    let logo = e.target.querySelector("#logo").files[0];
    let bg_img = e.target.querySelector("#bg_img").files[0];

    registerOrganization(
      name,
      email,
      password,
      website,
      address,
      fields,
      description,
      logo,
      bg_img,
      phoneNumber
    );
  });
  schoolForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = e.target.querySelector("#name").value;
    let email = e.target.querySelector("#email").value;
    let password = e.target.querySelector("#password").value;
    let phoneNumber = e.target.querySelector("#phone").value;
    let website = e.target.querySelector("#website").value;
    let address = e.target.querySelector("#addr").value;
    let logo = e.target.querySelector("#logo").files[0];
    let bg_img = e.target.querySelector("#bg_img").files[0];

    registerSchool(
      name,
      email,
      password,
      website,
      address,
      phoneNumber,
      logo,
      bg_img
    );
  });
}

registerEvents();
