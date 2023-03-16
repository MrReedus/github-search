const searchInput = document.querySelector(".input-search");
const searchButton = document.querySelector(".search-btn");
const resultsList = document.querySelector(".results");
const inputContainer = document.querySelector(".input-container");

let errorSpan = null;

searchButton.addEventListener("click", searchRepositories);
searchInput.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    searchButton.style.transition = "background-color 0.25s ease";
    searchButton.style.backgroundColor = "#85b6a3";
    setTimeout(() => {
      searchButton.style.backgroundColor = "";
    }, 1000);
    searchRepositories();
  }
});

function searchRepositories() {
  const query = searchInput.value;

  if (!query.trim()) {
    if (!errorSpan) {
      errorSpan = document.createElement("span");
      errorSpan.classList.add("none");
      errorSpan.textContent = "Поле должно быть заполнено";
      searchInput.classList.add("error");
      inputContainer.appendChild(errorSpan);
    }
    return;
  } else {
    searchInput.classList.remove("error");
    if (errorSpan) {
      inputContainer.removeChild(errorSpan);
      errorSpan = null;
    }
  }

  const url = `https://api.github.com/search/repositories?q=${query}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resultsList.innerHTML = "";

      if (data.items && data.items.length > 0) {
        data.items.slice(0, 10).forEach((item) => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = item.html_url;
          link.textContent = item.name;
          link.target = "blank";

          li.appendChild(link);
          resultsList.appendChild(li);

          const description = document.createElement("span");
          description.textContent = item.description;

          li.appendChild(description);
          const whatchers = document.createElement("span");
          whatchers.innerHTML = `Просмотры: <b>${item.watchers}</b>`;

          li.appendChild(whatchers);
        });
      } else {
        const li = document.createElement("li");
        li.classList.add("none");
        li.textContent = "Ничего не найдено :(";
        resultsList.appendChild(li);
      }
    })
    .catch((error) => console.error(error));
}
