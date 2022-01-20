const myobj = {
    a: 'herher',
    b: () => {
        console.log(this);
    }
}
myobj.b();