document.querySelector("#send").addEventListener("click",()=>{
    let email = document.querySelector("#email").textContent;
    if(email==""){
        email="unknown";
    }
    let comment = document.querySelector("#comment").value;
    if(comment==""){
        let toast = new bootstrap.Toast("#toast1");
        toast.show()
    }
    else{
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "proginfo5ia@gmail.com",
            Password : "B9E1E5FB2B4121344918029DC7D212D073B8",
            To : 'proginfo5ia@gmail.com',
            From : "proginfo5ia@gmail.com",
            Subject : `Email by ${email}`,
            Body : comment
        }).then(message => 
            {
                if(message=="OK"){
                    let toast = new bootstrap.Toast("#toast2");
                    toast.show();
                    document.querySelector("#comment").value = "";
                }else{
                    let toast = new bootstrap.Toast("#toast3");
                    toast.show() 
                }
            }
        );
    }
})

