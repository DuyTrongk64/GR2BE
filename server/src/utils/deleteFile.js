import fs from 'fs';

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).send('Internal Server Error');
    }
    console.log('File deleted successfully');
  });
}

export default deleteFile;
