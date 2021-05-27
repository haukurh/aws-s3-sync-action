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

//SYNC_OUTPUT=$(aws s3 sync ${{ inputs.directory }} s3://${{ inputs.s3-bucket }}${{ inputs.path }} --no-progress ${{ inputs.args }}) && echo "::set-output name=stdout::$SYNC_OUTPUT"

const directory = core.getInput('directory');
const s3Bucket = core.getInput('s3-bucket');
const path = core.getInput('path');
const optionalArgs = core.getInput('args');

const args = [
    's3',
    'sync',
    directory,
    `s3://${s3Bucket}${path}`,
    '--no-progress',
];

if (optionalArgs) {
    args.push(optionalArgs.trim());
}

exec.exec('aws', args, options).then((r) => {
    if (stderr) {
        core.setFailed(stderr);
    } else {
        core.setOutput('stdout', stdout);
    }
}).catch((e) => {
    console.error(stderr);
    core.setFailed('AWS command failed');
});
