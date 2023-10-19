console.log(document.documentElement);// тег <html>
console.log(document.body);//тег <body>
console.log(document.head);//тег <head>

console.log(document.body.firstChild);
console.log(document.body.lastChild);
console.log(document.body.childNodes);
console.log(document.body.children);

//сделаем в переборе коллекции вывод проверки, является ли он div
for (let val of document.body.children) {
    console.log(val.localName === 'div' ? "Это DIV" : "Это не DIV");
}
for (let val of document.body.childNodes) {
    console.log(val.nodeType);
}
for (let val of document.body.childNodes) {
    console.log(val.nodeValue);
}