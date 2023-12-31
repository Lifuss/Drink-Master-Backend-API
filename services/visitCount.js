const { User } = require("../models/user");

const updateVisitCount = async (user) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!user.lastVisit || user.lastVisit < today) {
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      {
        visitCount: user.visitCount + 1,
        lastVisit: today,
      },
      { new: true }
    );
    const sendMotivationalMessage = updateUser.visitCount === 10;

    return sendMotivationalMessage;
  }

  return false;
};

module.exports = updateVisitCount;
