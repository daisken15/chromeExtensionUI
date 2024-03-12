const fs = require('fs');
const path = require('path');

const photosDirectory = 'src/assets/photos';

function getPhotoPaths(directory) {
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg'))
    .map((file) => path.join('/assets', 'photos', file).replace(/\\/g, '/')); // Replace backslashes with forward slashes
}

const photoPaths = getPhotoPaths(photosDirectory);

const jsonContent = JSON.stringify(photoPaths, null, 2);

fs.writeFileSync('src/assets/photo-paths.json', jsonContent);

console.log('JSON file with photo paths has been generated.');