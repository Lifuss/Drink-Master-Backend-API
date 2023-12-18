const { sendEmail } = require("../../services");
const { BASE_URL } = process.env;

const subscribeEmail = async (req, res) => {
  const { email } = req.body;

  const mail = {
    to: email,
    subject: "Subscribe",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/signup">You have subscribed to the drink Master service</a>`,
  };
  await sendEmail(mail);

  res.json({
    message: "Email send success",
  });
};

module.exports = subscribeEmail;
