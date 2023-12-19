const { sendEmail } = require("../../services");

const fs = require("fs");
const path = require("path");
const letterPath = path.join(__dirname, "../../letter.html");
const letter = fs.readFileSync(letterPath, "utf8");

const subscribeEmail = async (req, res) => {
  const { email } = req.body;

  const mail = {
    to: email,
    subject: "Subscribe",
    html: letter,
  };
  await sendEmail(mail);

  res.json({
    message: "Email send success",
  });
};

module.exports = subscribeEmail;
