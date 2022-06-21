// import './index.css'
document.body.innerHTML = "plofile page";

let promise = new Promise(function (fullfill, reject) {
    if (Math.random() >= 0.5) {
        fullfill("yes");
    } else {
        reject("no");
    }
});
try {
    promise.then((res) => {
        console.log(res);
    });
} catch (error) {
    console.log(error);
}
