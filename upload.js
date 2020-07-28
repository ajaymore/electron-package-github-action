const { google } = require('googleapis');
const fs = require('fs');
// const token = require('./token.json');
// const credentials = require('./credentials.json');

const token = JSON.parse(process.env.TOKEN);
const credentials = JSON.parse(process.env.CREDENTIALS);

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);
oAuth2Client.setCredentials(token);

function uploadFile() {
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  const fileMetadata = {
    name: 'MiigoDataLogger-1.0.0_32.exe',
    parents: ['1_DM_scA9dKI1qThWzUJOPv2LXlV0l1jw'],
  };
  const media = {
    mimeType: 'text/plain',
    body: fs.createReadStream('dist/MiigoDataLogger-1.0.0_32.exe'),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media,
      fields: 'id',
    },
    (err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log('File Id: ', file.data.id);
      }
    }
  );
  const fileMetadata2 = {
    name: 'MiigoDataLogger-1.0.0_64.exe',
    parents: ['1_DM_scA9dKI1qThWzUJOPv2LXlV0l1jw'],
  };
  const media2 = {
    mimeType: 'text/plain',
    body: fs.createReadStream('dist/MiigoDataLogger-1.0.0_64.exe'),
  };
  drive.files.create(
    {
      resource: fileMetadata2,
      media: media2,
      fields: 'id',
    },
    (err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log('File Id: ', file.data.id);
      }
    }
  );
}

uploadFile();
