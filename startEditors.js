const { exec } = require('child_process');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const vscode = argv.v;
const frontend = argv.f;
const backend = argv.b;

const editor = vscode ? 'code' : 'webstorm';
const jobs = [];

if(frontend){
    jobs.push(() => start('frontend', editor));
} else if(backend){
    jobs.push(() => start('backend', editor));
} else {
    jobs.push(() => start('backend', editor));
    jobs.push(() => start('frontend', editor));
}

jobs.forEach(job => job());

function start(project, editor){
    exec(editor + ' ' + path.resolve(__dirname, project), (err, stdout) => {
        if(err) {
            console.log(err)
        }
        else console.log(stdout);
    });
}
