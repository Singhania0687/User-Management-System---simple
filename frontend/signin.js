const form=document.getElementById('SignIn')
form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const formData= new FormData(form)
    const email=formData.get('email')
    const passwd=formData.get('passwd')
   
    
    // Now sending the data to the backend
    try{
         const res=await fetch('http://localhost:3000/api/auth/signin',{
        method:'POST',
        headers: { "Content-Type": "application/json" },
         credentials: "include",
        body: JSON.stringify({ email, passwd })})
    const data=await res.json()
    if(res.ok)
    {
        localStorage.setItem("token", res.token);
      // localStorage.setItem("user", JSON.stringify(res.fname));
      window.location.href = "./dashboard.html";
    }
    else {
      console.log("Signin failed:", res.msg);
    }

    }
  
  catch (err) {
    console.error("Signin error:", err);
  }
    
})
