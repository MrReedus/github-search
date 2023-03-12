// let promise = new Promise(function (resolve, reject) {
//   // спустя одну секунду будет сообщено, что задача выполнена с ошибкой
//   setTimeout(() => reject(new Error("Какая то хуйня братан :(")), 1000);
// });

const searchInput = document.querySelector("#search");
const searchButton = document.querySelector("#search-btn");
const resultsList = document.querySelector("#results");

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
  const url = `https://api.github.com/search/repositories?q=${query}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resultsList.innerHTML = "";
      console.log(data);

      if (data.items && data.items.length > 0) {
        data.items.slice(0, 10).forEach((item) => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = item.html_url;
          link.textContent = item.full_name;
          link.target = "blank";

          li.appendChild(link);
          resultsList.appendChild(li);
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
