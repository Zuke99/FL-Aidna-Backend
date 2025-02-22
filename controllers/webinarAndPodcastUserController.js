const sendMail = require("../utils/sendMail");
const WebinarAndPodcastUser = require("../models/WebinarAndPodcastUser");

const webinarAndPodcastUserController = async (req, res) => {
  try {
    const {firstName, lastName}  = req.body;
    const name = `${firstName} ${lastName}`;
    
    const { email, type, organization, industry, phone, subject, message } = req.body;

    const existingUser = await WebinarAndPodcastUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Already subscribed" });
    }

    const subsribedUser = new WebinarAndPodcastUser({
      name,
      email,
      type,
      organization,
      industry,
      phone,
      subject,
      message,
    });

    await subsribedUser.save();

    await sendMail('muzammilk7866@gmail.com', 'Interest in Joining Podcast & Webinar Sessions!', 
      `
      Dear Team,
      A new user has subscribed to the Webinars & Podcasts.

      Subscriber Details:
      - Name: ${name}
      - Email: ${email}
      - Type: ${type}
      - Organization: ${organization}
      - Industry: ${industry}
      - Phone: ${phone}

      Message:
      "${message}"

      You may follow up with the subscriber for further engagement.

      Best regards,  
      AI Corp
      `
    )

    res.status(200).json({ message: "User subscribed successfully" });

  } catch (error) {
    console.error("Error managing users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { webinarAndPodcastUserController };