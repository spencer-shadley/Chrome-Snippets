var sum = 0;
var amounts  = document.getElementsByClassName('smvalue NUMSTR');

Array.from(amounts).forEach(v => {
    var rawText = v.innerText;

    if(rawText === "--") return; // pending transactions

    var text = rawText
        .replace("−", "")
        .replace("$", "")
        .replace(",", "");
    var amount = parseFloat(text);
    sum += amount;
});

console.log(sum);
