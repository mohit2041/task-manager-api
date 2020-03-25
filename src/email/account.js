const sgmail=require("@sendgrid/mail")

sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const sendwelcomeEmail=(email,name)=>{
    sgmail.send({
        to:email,
        from:"andrew@mead.io",
        subject:"thanks for joining in",
        text:`welcome to the app,${name},let me know you`
    })
}
const sendcancelemail=(email,name)=>{
    sgmail.send({
        to:email,
        from:"andrew@mead.io",
        subject:"thanks for joining in",
        text:`goodbye ,${name},hope you enjoy`
    })
}

module.exports = {
    sendwelcomeEmail,
    sendcancelemail
}