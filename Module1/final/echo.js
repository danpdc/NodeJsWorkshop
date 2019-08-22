process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    if(chunk !== null) {
        process.stdout.write(chunk);
    }
});