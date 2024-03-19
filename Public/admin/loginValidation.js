document.getElementById("admin-log-submit").addEventListener("click", function (e) {
    e.preventDefault();
    const email = document.getElementById("username").value;
    const password = document.getElementById("userpassword").value;
    const alertBox = document.querySelector(".alert");
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email.trim() === "") {
      alertBox.style.display = "block";
      alertBox.textContent = "Oh snap! Email is required.";
    } else if (password.trim() === "") {
      alertBox.style.display = "block";
      alertBox.textContent = "Oh snap! Password is required.";
    } else if (!emailPattern.test(email)) {
      alertBox.style.display = "block";
      alertBox.textContent = "Oh snap! Enter the valid Email Address.";
    } else {
      axios.post("/admin/verifyLogin", {
          email: email,
          password: password,
        })
        .then(function (response) {
          if (response.data.wrongPass) {
            alertBox.style.display = "block";
            alertBox.textContent = "Oh snap! Enter the valid Password.";
          }else if(response.data.blocked){
            alertBox.style.display = "block";
            alertBox.textContent = "Oh snap! You dont have entry.";
          } else {
            window.location.href = "/admin/home";
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  });
