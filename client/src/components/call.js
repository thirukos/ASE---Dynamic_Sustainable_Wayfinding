const { spawn } = require('child_process');

// Define the command to run the Python script
const python = spawn("client\\my_venv\\Scripts\\python.exe", ['.\\app.py']);

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
