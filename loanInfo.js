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
            infos.push(parseFloat(info));
        }
    });
    return infos;
}

// creates an object representing the loans
// returns {
    // remaining: { loans: [{balance: <number>, interest: <number>}], total: <number> },
    // paid: [{balance: <number>, interest: <number>}]
// }
function createLoans(loanBalances, loanInterests) {
    var remainingLoans = [];
    var paidLoans = [];
    var total = 0;

    for(var i = 0; i < loanBalances.length; ++i) {
        var balance = loanBalances[i];
        var interest = loanInterests[i];
        total += balance;
        (balance == 0 ? paidLoans : remainingLoans).push({
            balance: balance,
            interest: interest
        });
    }

    remainingLoans.sort(function(a, b) {
        return b.interest - a.interest;
    });

    return {
        remaining: {
            loans: remainingLoans,
            total: total
        },
        paid: paidLoans
    }
}

function getWeightedInterest(remainingLoans) {
    var weightedInterest = 0;
    $.each(remainingLoans.loans, function() {
        var fractionOfTotalBalance = this.balance / remainingLoans.total;
        weightedInterest += this.interest * fractionOfTotalBalance;
    });
    return weightedInterest;
}

function analyzeLoans() {
    var loanBalances = getRawLoanInfo('Loan Balance', 'Original Balance: $');
    loanBalances = parseLoanInfo(loanBalances, 0, 'Unpaid Interest');

    var loanInterests = getRawLoanInfo('Interest Rate Information', 'Interest Rate:');
    loanInterests = parseLoanInfo(loanInterests, 29, '%');

    var allLoans = createLoans(loanBalances, loanInterests);

    console.log('Loan total: $' + allLoans.remaining.total.toLocaleString()); // localeString to add commas :)
    console.log('Weighted average interest: ' + getWeightedInterest(allLoans.remaining).toFixed(2) + '%');
    console.table(allLoans.remaining.loans);
    console.table(allLoans.paid);
}

analyzeLoans();