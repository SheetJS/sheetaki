//creates link to download a file. then clicks link automatically. then removes link
module.exports = function (url, filename) {
    var a = document.createElement("a");
    a.download = filename;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (URL.revokeObjectURL && typeof setTimeout !== 'undefined') setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
}