import { google } from 'googleapis';
import fs from 'fs';
import config from '../config/config.js';
// const path = require("path");

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = config.env;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

export const googleDriverUpload = {
  setFilePublic: async (fileId) => {
    try {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      const getUrl = await drive.files.get({
        fileId,
        fields: 'webViewLink, webContentLink',
      });

      return getUrl;
    } catch (error) {
      console.error(error);
    }
  },
  uploadFile: async ({ filePath, fileName }) => {
    try {
      const mimeType = 'application/pdf'; // Set MIME type for PDF

      // Check if the folder ITSS2 exists, if not, create it
      let folderId;
      const folderList = await drive.files.list({
        q: "name='ITSS2' and mimeType='application/vnd.google-apps.folder'",
        fields: 'files(id)',
      });

      if (folderList.data.files.length === 0) {
        // Folder doesn't exist, create it
        const folder = await drive.files.create({
          requestBody: {
            name: 'CV',
            mimeType: 'application/vnd.google-apps.folder',
          },
        });
        folderId = folder.data.id;
      } else {
        // Folder exists, use its ID
        folderId = folderList.data.files[0].id;
      }

      // Upload file to the specified folder
      const createFile = await drive.files.create({
        requestBody: {
          name: fileName, // Change the file name as needed
          mimeType: mimeType,
          parents: [folderId], // Set the parent folder ID
        },
        media: {
          mimeType: mimeType,
          body: fs.createReadStream(filePath),
        },
      });

      const fileId = createFile.data.id;

      const getUrl = await googleDriverUpload.setFilePublic(fileId);
      console.log(getUrl.data);
      return getUrl.data.webViewLink;
    } catch (error) {
      console.error(error);
    }
  },
  deleteFile: async (fileId) => {
    try {
      console.log('Delete File:::', fileId);
      const deleteFile = await drive.files.delete({
        fileId: fileId,
      });
      console.log(deleteFile.data, deleteFile.status);
    } catch (error) {
      console.error(error);
    }
  },
};
