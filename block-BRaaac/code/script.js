let input = document.querySelector('input[type="text"]');
let rootEle = document.querySelector(".movie-list");

let defaultSelected = "all";

let all = document.querySelector(".all");
let active = document.querySelector(".active");
let completed = document.querySelector(".completed ");
let clearCompleted = document.querySelector(".clear");

let allMOvies = [];

let allMovies = input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    // console.log(event.target.value);

    allMOvies.push({ name: event.target.value, watched: false });
    event.target.value = "";
    createLayoutUi();
  }
});

function handleChange(event) {
  let id = event.target.id;

  allMOvies[id].watched = !allMOvies[id].watched;
}

function elm(type, attr = {}, ...children) {
  let element = document.createElement(type);
  for (let key in attr) {
    if (key.startsWith("data-")) {
      element.setAttribute(key, attr[key]);
    } else if (key.startsWith("on")) {
      let eventType = key.replace("on", " ").toLocaleLowerCase();
      element.addEventListener;
      eventType, attr[key];
    } else {
      element[key] = attr[key];
    }
  }
  children.forEach((child) => {
    if (typeof child === "object") {
      element.append(child);
    }
    if (typeof child === "string") {
      let node = document.createTextNode(child);
      element.append(node);
    }
  });
  return element;
}

function createLayoutUi(data = allMOvies) {
  rootEle.innerHTML = "";
  allMOvies.forEach((movie, i) => {
    let li = elm(
      "li",
      {},
      elm("input", {
        type: "checkbox",
        id: i,
        checked: movie.watched,
      }),
      elm("label", { id: i, innerText: movie.name }),
      elm(
        "span",
        {
          "data-Id": i,
          onClick: (event) => {
            let id = event.target.dataset.id;
            allMOvies.splice(id, 1);
            createLayoutUi();
          },
        },
        "X"
      )
    );

    input.addEventListener("change", handleChange);

    // span.addEventListener("click", (event) => {
    //   let id = event.target.dataset.id;
    //   allMOvies.splice(id, 1);
    //   createLayoutUi();
    // });

    rootEle.append(li);
  });
}
createLayoutUi();

clearCompleted.addEventListener("click", () => {
  allMOvies = allMOvies.filter((movie) => !movie.watched);
  createLayoutUi();
});
