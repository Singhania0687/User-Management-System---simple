// const form=document.getElementById('SignIn')
// form.addEventListener("submit",async (e)=>{
//     e.preventDefault();
//     const formData= new FormData(form)
//     const email=formData.get('email')
//     const passwd=formData.get('passwd')
   
    
//     // Now sending the data to the backend
//     try{
//          const res=await fetch('http://localhost:3000/api/auth/signin',{
//         method:'POST',
//         headers: { "Content-Type": "application/json" },
//          credentials: "include",
//         body: JSON.stringify({ email, passwd })})
//     const data=await res.json()
//     if(res.ok)
//     {
//         localStorage.setItem("token", res.token);
//       // localStorage.setItem("user", JSON.stringify(res.fname));
//       window.location.href = "./dashboard.html";
//     }
//     else {
//       console.log("Signin failed:", res.msg);
//     }

//     }
  
//   catch (err) {
//     console.error("Signin error:", err);
//   }
    
// })

const form = document.getElementById("SignIn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const email = formData.get("email");
  const passwd = formData.get("passwd");

  try {
    const response = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, passwd })
    });

    const result = await response.json();

    if (response.ok) {
      // Save token + user in localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      // Redirect to dashboard
      window.location.href = "./dashboard.html";
    } else {
      console.log("Signin failed:", result.msg);
      alert(result.msg);
    }
  } catch (err) {
    console.error("Signin error:", err);
    alert("Something went wrong!");
  }
});
