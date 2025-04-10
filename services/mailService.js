const sendMail = require("../utils/sendMail");

const contactMail = async (data) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    jobLevel,
    company,
    query,
    message,
  } = data;

  const name = `${firstName} ${lastName}`;

  try {
    await sendMail(
      process.env.NODEMAILER_EMAIL,
`New Contact Form submission`,
`You have recieved a new contact form submission.
      
Please find the details below:

Full Name: ${name}
Email Address: ${email}
Phone Number: ${phone}
Company: ${company}
Job Level: ${jobLevel}
Query Type: ${query}

Message:
${message}

`
    );
  } catch (error) {
    throw new Error('An error occured while sending the message'+ error.message)
  }
};

const subscribeMail = async (email) => {
  try {
    await sendMail(
      process.env.NODEMAILER_EMAIL,
      "New Subscriber F or Event Updates",
      `You have received a new event subscription.

Details:
Email: ${email}

`
    );
  } catch (error) {
    throw new Error('An error occurred while sending the subscription email: ' + error.message);
  }
};

const sponsorshipRequestMail = async (data) => {
  const { firstName, lastName, email, phone, company, jobTitle, website, interests, targetIndustries, targetJobFunctions, technicality, budget, source,sharingPlan, contactPreference }= data
  try {
    await sendMail(
      process.env.NODEMAILER_EMAIL,
      "New Sponsorship Form Request",
      `Hi Team,

You have received a new sponsorship request. Please find the details below:

Name: ${firstName} ${lastName}  
Email: ${email}  
Phone: ${phone}  
Company: ${company}  
Job Title: ${jobTitle}  
Website: ${website}  

Interests:
${interests.map(item => `- ${item}`).join('\n')}

Target Industries:
${targetIndustries.map(item => `- ${item}`).join('\n')}

Target Job Functions:
${targetJobFunctions.map(item => `- ${item}`).join('\n')}

Technicality: ${technicality}  
Budget: ${budget}  
How did they hear about us: ${source}  
What will they be sharing at the summit?: ${sharingPlan}  
Preferred Contact Method: ${contactPreference}

`
    );
  } catch (error) {
    throw new Error('An error occurred while sending the subscription email: ' + error.message);
  }
};



module.exports = {
  contactMail,
  subscribeMail,
  sponsorshipRequestMail
}