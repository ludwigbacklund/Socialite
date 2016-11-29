function timedCount() {
    postMessage(Date.now());
    setTimeout("timedCount()", 1000);
}

timedCount();