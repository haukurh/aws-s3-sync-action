const core = require('@actions/core');
const exec = require('@actions/exec');

let stdout = '';
let stderr = '';

const options = {};
options.listeners = {
    stdout: (data) => {
        stdout += data.toString();
    },
    stderr: (data) => {
        stderr += data.toString();
    }
};
options.cwd = '.';


const directory = core.getInput('directory');
const s3Bucket = core.getInput('s3-bucket');
let path = core.getInput('s3-path');
const optionalArgs = core.getInput('args');

// Add slash to start of path if it's not given
if (path[0] !== '/') {
    path = '/' + path;
}

const args = [
    's3',
    'sync',
    directory,
    `s3://${s3Bucket}${path}`,
    '--no-progress',
];

if (optionalArgs) {
    args.push(...optionalArgs.trim().split(' '));
}

exec.exec('aws', args, options).then((r) => {
    if (stderr) {
        core.setFailed(stderr);
    } else {
        core.setOutput('stdout', stdout);
    }
}).catch((e) => {
    core.setFailed(stderr);
});
