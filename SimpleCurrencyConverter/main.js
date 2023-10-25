const readline = require('readline');

const exchangeRates = {
    USD: 1,
    JPY: 113.5,
    EUR: 0.89,
    RUB: 74.36,
    GBP: 0.75,
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function checkCurrency(callback) {
    rl.question("From: ", (fromCurrency) => {
        fromCurrency = fromCurrency.toUpperCase();
        const fromRate = exchangeRates[fromCurrency];
        if (fromRate === undefined) {
            console.log("Unknown currency");
            askUserConversionOptions(); // Continue asking for user action
        }
        rl.question("To: ", (toCurrency) => {
            toCurrency = toCurrency.toUpperCase();
            const toRate = exchangeRates[toCurrency];
            if (toRate === undefined) {
                console.log("Unknown currency");
                askUserConversionOptions(); // Continue asking for user action
            }
            callback(fromCurrency, toCurrency);
        });
    });
}

function checkAmount(callback) {
    rl.question("Amount: ", (amountStr) => {
        let amount = parseFloat(amountStr);
        if (Number.isNaN(amount)) {
            console.log("The amount has to be a number");
            askUserConversionOptions(); // Continue asking for user action
        }else if (amount < 1) {
            console.log("The amount cannot be less than 1");
            askUserConversionOptions(); // Continue asking for user action
        }
        callback(amount);
    });
}

function convertCurrency(fromCurrency, toCurrency, amount) {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const convertedAmountUSD = amount/fromRate;
    const convertedAmount = convertedAmountUSD*toRate;
    console.log(`Result: ${amount} ${fromCurrency} equals ${convertedAmount.toFixed(4)} ${toCurrency}`);
}

function askUserConversionOptions(){
    console.log("What do you want to convert?");
    checkCurrency((fromCurrency, toCurrency) => {
        checkAmount((amount) => {
            convertCurrency(fromCurrency, toCurrency, amount);
            askUserAction(); // Continue asking for user action
        });
    });
}
function askUserAction() {
    console.log("What do you want to do?");
    console.log("1-Convert currencies 2-Exit program");

    rl.question("", (choice) => {
        if (choice === '1') {
            askUserConversionOptions();
        } else if (choice === '2') {
            console.log("Have a nice day!");
            rl.close();
            process.exit();
        } else {
            console.log("Unknown input");
            askUserAction(); // Continue asking for user action
        }
    });
}

console.log("Welcome to Currency Converter!");
console.log("1 USD equals 1 USD")
console.log("1 USD equals 113.5 JPY")
console.log("1 USD equals 0.89 EUR")
console.log("1 USD equals 74.36 RUB")
console.log("1 USD equals 0.75 GBP")

askUserAction();
