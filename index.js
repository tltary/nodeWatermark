const sharp = require('sharp');
const fs = require('fs');
const folder = './src';

const _files = [];
const path = fs.readdirSync(folder);
for (let i in path) {
  const file = path[i].split('.');
  _files.push(
    {
      name: file[0],
      type: file[1],
    }
  );
}

const clear = new Promise((resolve, reject) => {
  fs.readdir('result', (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(`./result/${file}`, err => {
        if (err) throw err;
      });
    }
  });
  resolve();
});

const watermarkImage = (pos) => {
  let index = pos;
  const image = `${folder}/${_files[index - 1].name}.${_files[index - 1].type}`;
  sharp(image)
    .resize(512, 512, {
      fit: 'contain',
      position: 'center',
      background: {
        r: 255,
        g: 255,
        b: 255,
        alpha: 1
      }
    })
    .composite(
      [
        {
          input: './assets/watermark_small.png',
          top: 512 - 40,
          left: 10,
        },
        {
          input: './assets/watermark_big.png',
          top: (512 / 2) - (300 / 2),
          left: (512 / 2) - (300 / 2),
        },
      ]
    )
    .toFile(`./result/${_files[index - 1].name}.jpg`, (err, info) => {
      if (err) throw err;
      console.log(`done - ${index}`);
      index = index + 1;
      if (_files.length > index) {
        watermarkImage(index)
      }
    });
}

clear
  .then(() => {
    watermarkImage(1);
  },
  (error) => {
    if (error) throw err;
  });
