# About

This is a collection of Chrome Snippets that I've written to make analyzing data on bad websites easier.

More info about Chrome Snippets can be found [here](https://developers.google.com/web/tools/chrome-devtools/snippets).

# loanInfo.js

Checks myfedloan.org for the current loan balances, interest rates, loan total and the overall weighted interest. The script makes it easy to check which loan to payoff next (it prints a table of the remaining loans sorted by interest rate.)

Note: Script assumes you are on the ["Print All Loan Details"](https://accountaccess.myfedloan.org/accountAccess/index.cfm?event=loan.getloanDetails&row=all&loanRegion=FD) page.

# chaseTotal.js

Based on your Chase transactions, this will total all listed transactions.

Note: This can be combined with Chase's "Search" function to get more interesting data.