const ScoreEntry = require("../../models/ScoreEntry");

const deleteScore = async (req, res, next) => {
  const { objectId } = req.body;
  console.log(objectId);
  await ScoreEntry.findByIdAndDelete(objectId);
  res.send({ msg: `Succesfully deleted entry with objectId: ${objectId}` });
};

module.exports = deleteScore;
