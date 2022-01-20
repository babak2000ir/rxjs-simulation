//import fetch from 'node-fetch';
import process from 'process';

var stdin = process.openStdin();
stdin.resume();
/* const observable = {
    subscribe: observer => {

    },
    pipe: operator => {

    },
} */
const observer = {
    next: x => {
        console.log(x)
    },
    error: err => {
        console.log(err)
    },
    complete: () => {
        console.log("done")
    }
}

const observable = {
    subscribe: observer => {
        stdin.on('data', data => {
            observer.next({ data });
        })
    },
    pipe: function (operator) {
        return operator(this)
    }
}

const map = function (f) {
    return observable => {
        return {
            subscribe: observer => {
                observable.subscribe({
                    next: x => {
                        observer.next(f(x))
                    },
                    error: err => {
                        console.error(err)
                    },
                    complete: () => {
                        console.log("finished")
                    }
                })
            },
            pipe: function (operator) {
                return operator(this)
            },
        }
    }
}

//observable.subscribe(observer);
observable
    .pipe(map(data => { return {...data, pipe1: true} }))
    .pipe(map(data => { return {...data, pipe2: true} }))
    .subscribe(observer)