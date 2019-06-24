const { exec } = require('child_process');

const searchAndKill = (port) => {
    exec('netstat -ano | findstr ' + port, (err, stdout) => {
        if(err) console.log('no process found');
        else {
            const process_number = stdout.split(' ').find(v => v.includes('\r')).split('\r')[0];
            console.log(`Running process at port: ${port} found. PID: ${process_number}`);
            kill(process_number);
        }
    });
}
const kill = (process_number) => exec(`taskkill /PID ${process_number} /F`, (err, stdout) => err ? console.log(err) : console.log(stdout));

searchAndKill(process.argv[2]);