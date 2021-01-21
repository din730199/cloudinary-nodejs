const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const upload = require('./multer');
const cloudinary = require('./cloudinary');
const fs = require('fs');
dotenv.config();

//connect db
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded.');
    } else {
      console.log('Error in DB connection: ' + err);
    }
  }
);

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/user', require('./routes/use'));

app.post('/', upload.array('image'), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, 'Image');

  const urls = [];
  const files = req.files;
  for (const file of files) {
    const {path} = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  res.send(urls);
});

app.listen(3000, () => console.log('Server is running'));
