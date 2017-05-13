function getLoanInfos(title, splitStr) {
    var str = $($($("ul[title=\"" + title + "\"]")).children()).text();
    return str.split(splitStr);
}

function getLoanInfo(loanInfos, begIndex, endIndexStr) {
    var infos = [];
    $.each(loanInfos, function() {
        var endIndex = this.indexOf(endIndexStr);
        var info = this.substring(begIndex, endIndex);
        info = info.replace(",", "");
        if(info != "") {
            infos.push(info);
        }
    });
    return infos;
}

var loanBalances = getLoanInfos("Loan Balance", "Original Balance: $");
loanBalances = getLoanInfo(loanBalances, 0, "Unpaid Interest");

var loanInterests = getLoanInfos("Interest Rate Information", "Interest Rate:");
loanInterests = getLoanInfo(loanInterests, 29, "%");

var loanTotal = loanBalances.reduce((pv,cv)=>{
   return pv + (parseFloat(cv)||0);
},0);

console.log("Loan total: $" + loanTotal.toLocaleString()); // localeString to add commas :)

var weightedInterest = 0;
for(var i = 0; i < loanBalances.length; ++i) {
    var balance = loanBalances[i];
    var fractionOfTotalBalance = balance / loanTotal;

    var interest = loanInterests[i];
    weightedInterest += interest * fractionOfTotalBalance;
}

console.log("Weighted interest: " + weightedInterest.toFixed(2) + "%");