module.exports = function(errors, cb){
    var errContent = [];
    for( var property in errors){
        var value = errors[property];
          console.log("value", value);
        value.map( (i,index)=>{
            if(i.rule==="required"){ errContent.push(""+property+" must be fill. It is required!!") }
            else if(i.rule==="email"){ errContent.push("Please enter correct email like xxx@gmail.com") }
            else if(i.rule==="unique"){ errContent.push("This email already exitst! Please choose other email") }
            else if(i.rule==="minLength"){ errContent.push("Your password is too short. Try again >6 characters!!")}

        })

    }
    cb(errContent);
}