var Requester = /** @class */ (function () {
    function Requester(method, uri, version, message) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
        this.response = undefined;
        this.fulfilled = false;
    }
    return Requester;
}());
var myData = new Requester('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);
