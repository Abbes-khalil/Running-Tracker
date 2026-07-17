import { spawn } from 'child_process';

// Start Vite dev server (which will proxy to PHP on 8000)
const vite = spawn('vite', [], { stdio: 'inherit', shell: true });

// Start PHP backend server on port 8000 serving the frontend directory
const php = spawn('php', ['-S', '127.0.0.1:8000', '-t', 'frontend'], { stdio: 'inherit', shell: true });

// Handle exit
vite.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
  php.kill();
});

php.on('close', (code) => {
  console.log(`PHP process exited with code ${code}`);
  vite.kill();
});