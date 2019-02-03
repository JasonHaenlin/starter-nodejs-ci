
/**
 * It was just to test with and error
 */
module.exports = async (req, res) => {
  // Since we are not passing username,
  // any operation on undefined will result in error
  const { username } = req.body;
  const lengthOfSUername = username.length;
  res.json({ status: true, length: lengthOfSUername });
};
