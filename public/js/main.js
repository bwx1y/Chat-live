document.getElementById("buttonNavbar").innerHTML == "Login"
  ? document.getElementById("buttonNavbar").addEventListener("click", (e) => {
      e.preventDefault();
      window.location = "/login";
    })
  : document.getElementById("buttonNavbar").addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("id");
      window.location = "/login";
    });
