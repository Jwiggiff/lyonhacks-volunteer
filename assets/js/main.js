import {
  registerVolunteer,
  registerOrganization,
  registerSchool,
  login,
  logout,
  storageRef,
} from "./firebase.js";
import {
  getOpportunities,
  getOpportunityById,
  getOrganizations,
  getSchools,
  getVolunteer,
  getVolunteers,
  queryOpportunities,
} from "./db.js";
import * as orgActions from "./organizationActions.js";
import * as schoolActions from "./schoolActions.js";
import { loadMap } from "./map.js";

function registerEvents() {
  const loginForm = document.getElementById("loginForm");
  const volunteerForm = document.getElementById("volunteerRegisterForm");
  const orgForm = document.getElementById("orgRegisterForm");
  const schoolForm = document.getElementById("schoolRegisterForm");
  const signOutBtn = document.getElementById("signOutBtn");
  const addOppForm = document.getElementById("addOppForm");

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = e.target.querySelector("#email").value;
    let password = e.target.querySelector("#password").value;

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
    // let hideEmail = e.target.querySelector("#hide_email").checked;
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
      timeFrame,
      school
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
  signOutBtn?.addEventListener("click", () => {
    logout();
  });
  addOppForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    let position = e.target.querySelector("#position").value;
    let location = e.target.querySelector("#location").value;
    let timeFrame = e.target.querySelector("#time_frame").value;
    let timeCommitment = e.target.querySelector("#time_commitment").value;
    let requirements = e.target.querySelector("#requirements").value;
    let description = e.target.querySelector("#description").value;
    let contact = e.target.querySelector("#contact").value;

    orgActions.addExperience(
      position,
      location,
      timeFrame,
      timeCommitment,
      requirements,
      description,
      contact
    );

    window.location.hash = "";
  });
}

function loadOpps() {
  getOpportunities().then(async (opps) => {
    document.querySelector(".opportunity-grid").innerHTML = (
      await Promise.all(
        opps.map(async (opp) => {
          return `
      <div class="opportunity">
      <img
        src="${await storageRef.child(opp.organization.logo).getDownloadURL()}"
        alt="${opp.organization.name}"
      />
      <h4>${opp.organization.name}</h4>
      <p class="pos">${opp.position}</p>
      <p class="addr">${opp.location}</p>
      <p class="time">${opp.timeCommitment}</p>
      <a href="more-info?id=${opp.id}">More info</a>
    </div>
      `;
        })
      )
    ).join("");
  });
}

async function loadMoreInfoPage() {
  let id = new URLSearchParams(window.location.search).get("id");
  let data = (await getOpportunityById(id))[0];

  document.querySelector("img.bg").src = await storageRef
    .child(data.organization.bg_img)
    .getDownloadURL();
  document.querySelector("img.logo").src = await storageRef
    .child(data.organization.logo)
    .getDownloadURL();
  document.getElementById("name").innerText = data.organization.name;
  document.getElementById("position").innerText = data.position;
  document.getElementById("location").innerText = data.location;
  document.getElementById("time_frame").innerText = data.timeFrame;
  document.getElementById("time_commitment").innerText = data.timeCommitment;
  document.getElementById("requirements").innerText = data.requirements;
  document.getElementById("description").innerText = data.description;
  document.getElementById("contact").innerText = data.contact;
}

async function loadDashboard() {
  getOpportunities().then(async (opps) => {
    let postal_code = (await getVolunteer(firebase.auth().currentUser.uid))
      .postalCode;

    loadMap(opps, postal_code);

    document.querySelector(".recommended .opportunity-list").innerHTML = (
      await Promise.all(
        opps.map(async (opp) => {
          return `
          <li class="opportunity">
          <img
            src="${await storageRef
              .child(opp.organization.logo)
              .getDownloadURL()}"
            alt="${opp.organization.name}"
          />
          <h4>${opp.organization.name}</h4>
          <p class="pos">${opp.position}</p>
          <p class="addr">${opp.location}</p>
          <p class="time">${opp.timeCommitment}</p>
          <a href="/opportunities/more-info?id=${opp.id}">More info</a>
        </li>
      `;
        })
      )
    ).join("");
  });
}

registerEvents();
if (window.location.pathname == "/opportunities/") loadOpps();
if (window.location.pathname == "/opportunities/more-info/") loadMoreInfoPage();
if (window.location.pathname == "/dashboard/") loadDashboard();
