
function validatePwd(event) {
    event.preventDefault();
    var register=document.forms["register"];
    var pwd = register["password"].value;
    var conPwd = register["confirm_pwd"].value; 
    console.log("password", pwd)
    console.log("confirm pwd",conPwd)
    var checkuser = document.getElementById("douplicate");
    var checkpwd= document.getElementById("checkPwd");
    var checkconPwd = document.getElementById("checkConfirmPwd");
    // var exist= false;
    var username = register["username"].value;
    console.log("username", username)
    
    if (pwd != conPwd) {
      checkconPwd.innerHTML="Password dosn't match !";  
    }
    else if (pwd =="") {
      checkpwd.innerHTML="Password can't be empty !";
    }
    else if(pwd.length<3 && pwd.length>0){
      checkpwd.innerHTML="It requires at least 3 characters !";
    }
    else{
      axios.post("http://localhost:3000/register",{username:username,password:pwd}).then(result=>{
        console.log("res",result.data)
        if(result.data.err){
          checkuser.innerHTML="User already exists !";
          console.log("User already exist")
        }
       else{
          window.location.pathname="/signIn";
          console.log("error!");
        }
      })
  }
};
function checkErr(event){
  console.log("hi")
  event.preventDefault();
  var formData=document.forms["logIn"];
  var username = formData['username'].value
  var pwd = formData['password'].value
  console.log(username)
  console.log(pwd)
  checkuser = document.getElementById("checkusername")
  axios.post("http://localhost:3000/logIn",{username:username,password:pwd}).then(result=>{
    console.log("res",result.data)
    if(result.data.err){
      checkuser.innerHTML=result.data.message;
      console.log("User already exist")
    }
   else{
      window.location.pathname="/books";
    }
  })
}
