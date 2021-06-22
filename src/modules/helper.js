const sharp = require('sharp');
const { size, logo } = require('../../config/keys');


const fileProcessorWorker = async (params, thread_index = 1) => {
      for (const filePath of params.imagesFilePath ) {

          let processedFileName = filePath
              .split('.')
              .map((el,i) => {
                  if(i===0) return el.concat('-128x128');
                  return el
              })
              .join('.');

          console.log(processedFileName, 'processedFileName');

          sharp(filePath)
              .resize(size.width, size.height)
              .composite([{ input: logo, gravity: 'center' }])
              .toFile(processedFileName)
              .catch( err => { console.log(err) });
      }
};

module.exports = {
  fileProcessorWorker,
};
