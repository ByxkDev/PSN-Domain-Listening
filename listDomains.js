const { spawn } = require('child_process');
const fs = require('fs');

const updnsPath = './updns.exe'; 

const logFile = fs.createWriteStream('log.txt', { flags: 'a' });

const updnsProcess = spawn(updnsPath);

updnsProcess.stdout.on('data', (data) => {
    logFile.write(`updns: ${data}`);
    console.log(`updns: ${data}`);
});

updnsProcess.stderr.on('data', (data) => {
    logFile.write(`updns error: ${data}`);
    console.error(`updns error: ${data}`);
});

updnsProcess.on('close', (code) => {
    logFile.write(`updns process exited with code ${code}\n`);
    console.log(`updns process exited with code ${code}`);
    logFile.end(); 
});

updnsProcess.on('error', (err) => {
    logFile.write(`Failed to start updns: ${err.message}\n`);
    console.error(`Failed to start updns: ${err.message}`);
    logFile.end();
});
