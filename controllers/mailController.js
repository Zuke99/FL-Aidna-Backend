const {contactMail, subscribeMail, sponsorshipRequestMail, subscribeToNewsletterMail} = require("../services/mailService");

const contactUsSubmission = async (req, res) => {
  try {
    const formData = req.body;
    await contactMail(formData);
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong while sending the form." });
  }
};

const subscribeToEventsSubmission = async (req, res) => {
  try {
    const {email} = req.body;
    await subscribeMail(email);
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong while sending the form." });
  }
};

const subscribeToNewsSubmission = async (req, res) => {
  try {
    const {email} = req.body;
    await subscribeNewsMail(email);
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong while sending the form." });
  }
};

const sponsorShipRequestSubmission = async (req, res) => {
  try {
    const data = req.body
    await sponsorshipRequestMail(data);
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong while sending the form." });
  }
}

const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body
    await subscribeToNewsletterMail(email);
    res.status(200).json({message: 'Form submitted successfully'});
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Something went wrong while sending the form.'})
  }
}

module.exports = {
  contactUsSubmission,
  subscribeToEventsSubmission,
  sponsorShipRequestSubmission,
  subscribeToNewsSubmission,
  subscribeToNewsletter
};
