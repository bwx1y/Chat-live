window.onload = () => {
  if (!sessionStorage.getItem("username")) window.location = "/login";
};

let socket = io();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!document.getElementById("message-input").value) {
    alert("tidak ada inputan");
  } else {
    let li = document.createElement("li");
    let div = document.createElement("div");
    let h5 = document.createElement("h5");
    let p = document.createElement("p");

    // add class
    li.classList.add("media");
    div.classList.add("media-body");
    div.classList.add("text-end");

    // add text
    h5.innerHTML = "Me";
    p.innerHTML = document.getElementById("message-input").value;

    // making one
    div.append(h5);
    div.append(p);
    li.append(div);

    // broadcast
    document.getElementById("messages").append(li);

    // emit
    socket.emit("message", { id: sessionStorage.getItem("id"), message: document.getElementById("message-input").value });

    // loding button
    setTimeout(() => {
      document.getElementById("loading").classList.toggle("d-none");
      document.querySelector("form").classList.toggle("d-none");
    }, 3000);
    document.querySelector("form").classList.toggle("d-none");
    document.getElementById("loading").classList.toggle("d-none");

    // clear input
    document.getElementById("message-input").value = "";
  }
});

socket.on("message", (data) => {
  let li = document.createElement("li");
  let div = document.createElement("div");
  let h5 = document.createElement("h5");
  let p = document.createElement("p");

  // add class
  li.classList.add("media");
  div.classList.add("media-body");

  // add text
  h5.innerHTML = data.form.username;
  p.innerHTML = data.message;

  // making one
  div.append(h5);
  div.append(p);
  li.append(div);

  // broadcast
  document.getElementById("messages").append(li);
});
