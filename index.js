import fs from 'fs';

fs.writeFile("message.txt", "Hello Adilet from node", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
});

fs.readFile("message.txt", "utf8",(err, data) =>{
    if (err) throw err;
    console.log(data);
});

const directoryName = 'Drctr1';

fs.mkdir(directoryName, { recursive: true }, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`Directory '${directoryName}' created successfully!`);

        const filePath = `${directoryName}/directory.txt`;
        const fileContent = 'Hello, this is a text for directory.';
        fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
                throw err;
            } else {
                console.log(`File '${filePath}' written successfully!`);

                fs.readdir(directoryName, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log(`Contents of '${directoryName}':`, fileContent);
                    }
                });
            }
        });
    }
});



import inquirer from 'inquirer';
import qr from 'qr-image';
import http from 'http';

inquirer
    .prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Enter URL:',
        },
    ])
    .then((answer) => {
        const url = answer.url;

        const qrImage = qr.imageSync(url, { type: 'png' });
        fs.writeFileSync('qrcode.png', qrImage);
        console.log('QR image successfully created.');

        fs.writeFileSync('qr_url.txt', url);
        console.log('Text file with QR URL successfully created.');

        http
            .createServer((req, res) => {
                fs.readFile('qrcode.png', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error: Could not read QR code image.');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'image/png' });
                        res.end(data);
                    }
                });
            })
            .listen(8081, () => {
                console.log('Server running at http://localhost:8081');
            });
    })
    .catch((error) => {
        console.error(error.message);
    });