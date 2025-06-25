document.addEventListener('DOMContentLoaded', function(){

    var username;
    var password;

    var myForm = document.querySelector('form');

    if (myForm){
        myForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            localStorage.clear();

            username = document.getElementById('username').value;
            password = document.getElementById('password').value;

            if(!validate_username(username)){
                document.getElementById('usernameError').innerHTML = 'Invalid username';
                document.getElementById('passwordError').innerHTML = '';
            }
            else if(!validate_password(password)){
                document.getElementById('passwordError').innerHTML = 'Invalid password';
                document.getElementById('usernameError').innerHTML = '';
            }
            else{
                window.location.href = "./welcome.html"
            }
        });
    }
    else{
        console.error("Form element not found");
    }

    function validate_username(username){
        if(username === "admin"){
            return true;
        }
        else{
            return false;
        }
    }

    function validate_password(password){
        if(password ==="12345"){
            return true;
        }
        else{
            return false;
        }
    }
})