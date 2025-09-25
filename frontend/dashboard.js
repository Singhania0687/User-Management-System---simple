document.addEventListener("DOMContentLoaded", () => {
 
  const token = localStorage.getItem("token");
  function timer(){
    const now=new Date();
     const time = now.toLocaleTimeString(); 
    document.getElementById("timer").textContent = time;
  }
  timer();

  if (!token) {
    // If no user in storage, redirect back to signin
    window.location.href = "signin.html";
    return;
  }

  // Display user info
  fetch("http://localhost:3000/api/auth/profile", {
  method: "GET",
  headers: { "Authorization": `Bearer ${token}` }
})
.then(res => res.json())
.then(user => {
  document.getElementById("fname").textContent = user.fname;
    document.getElementById("fullname").textContent = user.fname;
  document.getElementById("lname").textContent = user.lname;
  document.getElementById("email").textContent = user.email;
  setInterval(timer,1000)
});

});
