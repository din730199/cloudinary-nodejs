const router = require('express').Router();
const Users = require('../model/user');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let user = new Users({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  try {
    let user = await Users.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
