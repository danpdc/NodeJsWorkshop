
var counter = 0;
const timerId = setInterval(
    () => {
        counter++;
        if(counter < 5) {
            console.log('This message gets printed each 2 seconds');
        }
        else {
            console.log('Now it\'s time to break this up');
            clearTimeout(timerId);
        }
    },
    2000
);