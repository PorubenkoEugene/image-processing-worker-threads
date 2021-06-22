const { Worker } = require('worker_threads');
const fs = require('fs');

function runService(imagesFilePath, thread_index) {
  console.log(thread_index, 'thread_index')
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/workers/fileProcessor.worker.js', {
      workerData: {
        imagesFilePath,
        thread_index,
      },
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

const getFiles = (dir = 'images') => {
  let distFolder = process.cwd() + '/' + dir;
  return fs.readdirSync(distFolder).map((e) => {
    return distFolder + '/' + e;
  });
};

async function run() {
  // LIST OF ALL FILES
  let allFiles = getFiles('images');
  console.log('Files to process:', allFiles.length);
  let workerIndex = 0;
  allFiles.map(async (e, i) => {
    if (i%100===0){
      workerIndex++;
      await runService(allFiles.slice(i, i+100), workerIndex);
    }
  });
}

run().catch((err) => console.error(err));
