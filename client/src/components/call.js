const { spawn } = require('child_process');

// Define the command to run the Python script
const python = spawn('C:\Users\chen\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Python 3.9', ['.\\app.py']);

// Handle standard output from the Python script
python.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// Handle errors from the Python script
python.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Handle the process exit event
python.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
