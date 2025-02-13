const yup = require('yup')


const passwordregex =  `^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$`

const uservalidation = yup.object({
    username:yup.string().min(3,"username cannot be less than three characters").required("Username is required"),
    email:yup.string().email("Invalid email address").required("emal is required"),
    password:yup.string().min(8,"password cannot be less than 8 characters").matches(passwordregex, "password must contain at least one letter ,one number and a specail character") .required("password is required")
})


module.exports = uservalidation