(() => {
  const socket = io();
  socket.on("id", (data) => {
    sessionStorage.setItem("id", data);
  });
  if (sessionStorage.getItem("username")) {
    window.location = `/?id=${sessionStorage.getItem("id")}`;
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          id: sessionStorage.getItem("id"),
          username: sessionStorage.getItem("username"),
        },
      }),
    });
  }
})();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  sessionStorage.setItem("username", document.getElementById("input-username").value);
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        id: sessionStorage.getItem("id"),
        username: sessionStorage.getItem("username"),
      },
    }),
  });

  window.location = `/?id=${sessionStorage.getItem("id")}`;
});
