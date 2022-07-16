// Declaration of variables  
const toggle = document.querySelector("#toggle");
const navbar = document.querySelector(".navbar");
const nav = document.querySelector(".navbar__wrapper");
const links = document.querySelectorAll(".navbar__links li");
const navHeight = nav.offsetHeight;
const card = document.querySelector(".project-card");

// On click add/remove class on nav
toggle.addEventListener("click", function () {
  this.classList.toggle("active");
  nav.classList.toggle("open");
});


// On mobile check if nav has class open
links.forEach(link => {
  link.addEventListener("click", function () {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.classList.remove("active");
    }
  })
});

// On scroll check nav height and add class when window.scrollY > nav
window.addEventListener("scroll", function() {
  if(Math.floor(this.scrollY) > 0){
    navbar.classList.add("fixed");    
  } else {
    navbar.classList.remove("fixed");
  }
})

// Invoke getData()
getData();

// Fetch data from project.json
function getData() {
  fetch("app/json/projects.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      data.map((element)=> {
        return card.innerHTML += `
          <article id="${element.id}" class="card">
            <div class="card__img">
              <figure>
                <img src="${element.img}" alt="${element.imgAlt}">
              </figure>
            </div>

            <div class="card__description">
              <h3 class="title-line">${element.title}</h3>
              <ul>
                ${element.techstack.map((element) => `<li>${element}</li>`).join('')}
              </ul>
              <p>${element.description}</p>
              <div class="btns">
                <a href="${element.url}" target="_blank" rel="noopener noreferrer">Live Site</a>
                ${(()=> {
                  if(element.githubUrl !== undefined){
                    return `<a href="${element.githubUrl}" target="_blank" rel="noopener noreferrer">Github</a>`
                  } else {
                    return ""
                  }
                })()}
              </div>
            </div>
          </article>
        `
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}