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

// creates an object representing the loans
// returns { remaining: [], paid: [] }
function createLoans(loanBalances, loanInterests) {
    var remainingLoans = [];
    var paidLoans = [];

    for(var i = 0; i < loanBalances.length; ++i) {
        var balance = loanBalances[i];
        var interest = loanInterests[i];
        (balance ? remainingLoans : paidLoans).push({
            balance: balance,
            interest: interest
        });
    }

    remainingLoans.sort(function(a, b) {
        return b.interest - a.interest;
    });

    return {
        remaining: remainingLoans,
        paid: paidLoans
    }
}

// calculates the weighted average interest of the remaining loans
function getWeightedInterest(loans) {
    var weightedInterest = 0;
    for(var i = 0; i < loans.remaining.length; ++i) {
        var loan = loans.remaining[i];

        var fractionOfTotalBalance = loan.balance / loanTotal;

        weightedInterest += loan.interest * fractionOfTotalBalance;
    }
    return weightedInterest;
}

function analyzeLoans() {
    var loanBalances = getRawLoanInfo('Loan Balance', 'Original Balance: $');
    loanBalances = parseLoanInfo(loanBalances, 0, 'Unpaid Interest');

    var loanInterests = getRawLoanInfo('Interest Rate Information', 'Interest Rate:');
    loanInterests = parseLoanInfo(loanInterests, 29, '%');

    var loanTotal = loanBalances.reduce((pv,cv)=>{
            return pv + (parseFloat(cv)||0);
    },0);

    console.log('Loan total: $' + loanTotal.toLocaleString()); // localeString to add commas :)

    var loans = createLoans(loanBalances, loanInterests);

    console.log('Weighted average interest: ' + getWeightedInterest(loans).toFixed(2) + '%');

    console.table(loans);
}

analyzeLoans();