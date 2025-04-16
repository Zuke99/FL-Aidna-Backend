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

    await sendMail(
      email,
      "Thanks for contacting Media2AI",
`Hi ${firstName},

Thank you for reaching out to Media2AI!

We've received your message and our team will get back to you as soon as possible. If your inquiry is urgent, feel free to follow up by replying to this email.

We appreciate your interest and will be in touch shortly.

Best regards,  
The Media2AI Team`
    );
    
  } catch (error) {
    throw new Error('An error occured while sending the message'+ error.message)
  }
};

const subscribeMail = async (email) => {
  try {
    await sendMail(
      process.env.NODEMAILER_EMAIL,
      "New Subscriber For Event Updates",
      `You have received a new event subscription.

Details:
Email: ${email}

`
    );
    await sendMail(
      email,
      "You're Subscribed to Event Updates",
`Hi there,

Thank you for subscribing to our event updates!

We're excited to keep you informed about our latest and upcoming events.

Stay tuned!

Best regards,  
The Media2AI Team`
    );
    
  } catch (error) {
    throw new Error('An error occurred while sending the subscription email: ' + error.message);
  }
};

const subscribeNewsMail = async (email) => {
  try {
    
    await sendMail(
      process.env.NODEMAILER_EMAIL,
      "New Subscriber For AI News",
      `You have received a new AI news subscription.

Details:
Email: ${email}

`
    );

    await sendMail(
      email,
      "You're Subscribed to AI News Updates",
`Hi there,

Thank you for subscribing to our AI news updates!

We're excited to keep you informed about our latest and upcoming AI news.

Stay tuned!

Best regards,  
The Media2AI Team`
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

    await sendMail(
      email,
      "We've received your sponsorship request – Media2AI",
`Hi ${firstName},

Thank you for submitting your sponsorship request to Media2AI!

We’ve received your request and our team will be reviewing your proposal shortly. We're excited about the opportunity to collaborate with you. You can expect to hear from us soon via your preferred contact method (${contactPreference}).

If you have any updates or additional information, feel free to reply to this email.

Thanks again,  
The Media2AI Team`
    );
    
  } catch (error) {
    throw new Error('An error occurred while sending the subscription email: ' + error.message);
  }
};



module.exports = {
  contactMail,
  subscribeMail,
  sponsorshipRequestMail,
  subscribeNewsMail
}