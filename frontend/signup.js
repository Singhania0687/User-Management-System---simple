const form=document.getElementById('signupData')
form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const formData=new FormData(form)
    const fname=formData.get('fname')
    const lname=formData.get('lname')
    const email=formData.get('email')
    const passwd=formData.get('passwd')
    // Now sending the data to the backend
    try{
       const data=await fetch('http://localhost:3000/api/auth/signup',{
        method:'POST',
        headers: { "Content-Type": "application/json" },
         credentials: "include",
        body: JSON.stringify({ fname,lname,email, passwd }) })
    const res=await data.json()
    const message=res.msg
    console.log(message)
    if(res.ok)
    {
         window.location.href='signup.html'

    }
    else{
        console.log("Some error occured:",message)
    }
   

    }
    catch(err){
        console.log("Signup error:",err.message)
    }
   
})
