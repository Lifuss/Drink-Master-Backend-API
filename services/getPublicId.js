const getPublicId = (url) => {
  const startsWith = url.indexOf("OwnDrinksImages/");
  const publicIdWithExpansion = url.slice(startsWith);
  const lastDotIndex = publicIdWithExpansion.lastIndexOf(".");
  const publicId = publicIdWithExpansion.slice(0, lastDotIndex);

  return publicId;
};

module.exports = getPublicId;
