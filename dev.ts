import { default as chokidar } from "chokidar";

function spawn_log_stdout(pipe, cmd:string, options: string[]) {
    var spawn = require('child_process').spawn,
        ls    = spawn(cmd, options);

    ls.stdout.pipe(logStream);
    // ls.stderr.pipe(logStream);

    ls.on('close', function (code) {
      console.log('child process exited with code ' + code);
    });
}


var logStream = fs.createWriteStream(logfile, {flags: 'w'});


chokidar.watch([
    'includes',
    'mollbe-theme.ts',
], { persistent: true })
.on('change', (path, stats) => {
    if (stats) console.log(`File ${path} changed size to ${stats.size}`);
});


var fs = require('fs');
fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});