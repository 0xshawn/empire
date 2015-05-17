child = child_process.spawn('ls', ['-lh', '/usr']);
child.stdout.setEncoding('utf8');
child.stdout.on('data', function(data) {
    console.log(data);
});
