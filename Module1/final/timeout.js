
var myTimeout = (what, seconds) => {
    console.log(what + ' rocks after ' + seconds + ' seconds');
}

setTimeout(myTimeout, 4000, 'Node.Js', 4);
setTimeout(myTimeout, 2000, '.NET', 2);