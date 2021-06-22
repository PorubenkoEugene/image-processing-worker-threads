const sharp = require('sharp');

imageAmount = 1000;
function ImageGenerator () {
  for (let i = 1; i <= imageAmount; i++) {
    sharp({
      create: {
        width: 800,
        height: 800,
        channels: 4,
        background: {r: 255, g: 0, b: 0, alpha: 0.5},
      },
    })
        .png()
        .toFile(`images/dummy-${i}.jpg`)
        .then(r => console.log(`Generating image #${i}`))
   }
}

module.exports = { ImageGenerator };
