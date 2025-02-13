const mailer = require("nodemailer")


const sendmail = async (email, username) =>{
   const messageTemplate = `<div>
        <h2>Welcome message</h2>
        <ul>
            <li>Name: ${username}</li>
            <li>Email: ${email}</li>
        </ul>
        <div>
            <p>Dear ${username}, </p>
            <p>Welcome to Sqi Alumni Association , You are highly welcome.</p>
        </div>
    </div>`

  const transporter = mailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASS
    }
   })


   const mailOptions ={
    from:process.env.USER_EMAIL,
    to:email,
    subject:`Welcome to ${username}!`,
    html: messageTemplate
   }

   try {
    const sentmail = await transporter.sendMail(mailOptions)
    if (sentmail) {
        return true
    }
   } catch (error) {
    throw new Error(error.message)
   }
   


}



module.exports = sendmail