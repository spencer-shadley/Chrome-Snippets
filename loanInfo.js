// get array of strings representing each loan's information
function getRawLoanInfo(title, separator) {
    var loanInfo = $($($('ul[title="' + title + '"]')).children()).text();
    return loanInfo.split(separator);
}

// parses loanInfo to pull out a specific collection of strings from the loan
function parseLoanInfo(loanInfo, begIndex, endIndexStr) {
    var infos = [];
    $.each(loanInfo, function() {
        var endIndex = this.indexOf(endIndexStr);
        var info = this.substring(begIndex, endIndex);
        info = info.replace(',', '');
        if (info) {
            infos.push(info);
        }
    });
    return infos;
}

var loanBalances = getRawLoanInfo('Loan Balance', 'Original Balance: $');
loanBalances = parseLoanInfo(loanBalances, 0, 'Unpaid Interest');

var loanInterests = getRawLoanInfo('Interest Rate Information', 'Interest Rate:');
loanInterests = parseLoanInfo(loanInterests, 29, '%');

var loanTotal = loanBalances.reduce((pv,cv)=>{
   return pv + (parseFloat(cv)||0);
},0);

console.log('Loan total: $' + loanTotal.toLocaleString()); // localeString to add commas :)

var weightedInterest = 0;
for(var i = 0; i < loanBalances.length; ++i) {
    var balance = loanBalances[i];
    var fractionOfTotalBalance = balance / loanTotal;

    var interest = loanInterests[i];
    weightedInterest += interest * fractionOfTotalBalance;
}

console.log('Weighted average interest: ' + weightedInterest.toFixed(2) + '%');

var remainingLoans = [];
var paidLoans = [];

for(var i = 0; i < loanBalances.length; ++i) {
    var balance = loanBalances[i];
    var interest = loanInterests[i];
    (balance == 0 ? paidLoans : remainingLoans).push({
        balance: loanBalances[i],
        interest: loanInterests[i]
    });
}

remainingLoans.sort(function(a, b) {
    return b.interest - a.interest;
});

console.log('remaining loans');
console.table(remainingLoans);

console.log('paid loans');
console.table(paidLoans);