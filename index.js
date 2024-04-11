#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk"; // Import chalk
const currency = {
    //object jis mein currency ki key and value hai
    USD: 1,
    EUR: 0.91,
    GBP: 0.76,
    INR: 74.57,
    PKR: 288,
};
async function convertCurrency() {
    try {
        let userAnswer = await inquirer.prompt([
            {
                name: "from",
                type: "list",
                message: "What currency do you want to convert from?",
                choices: Object.keys(currency), //kis currency say krna hai
            },
            {
                name: "to",
                type: "list",
                message: "What currency do you want to convert to?",
                choices: Object.keys(currency), //or kis mein currenvy mein convert krna hai
            },
            {
                name: "amount",
                type: "number",
                message: "How much currency do you want to convert?",
                validate: function (value) {
                    //check kren k  koi number negative na ho or koi alphabets na ho
                    if (isNaN(value) || value <= 0) {
                        return "Please enter a valid positive number.";
                    }
                    return true;
                },
            },
        ]);
        let fromCurrency = currency[userAnswer.from]; //value le rahe hai from ki
        let toCurrency = currency[userAnswer.to]; //value lee rahai hai to ki
        let amount = userAnswer.amount; //phr amount ki vlue
        let baseAmount = amount / fromCurrency; //
        let convertedAmount = baseAmount * toCurrency;
        console.log(`Conversion rate: 1 ${chalk.blue(fromCurrency)} = ${chalk.blue(toCurrency / fromCurrency)} ${chalk.blue(toCurrency)}`);
        console.log(`Converted amount: ${chalk.blue(convertedAmount.toFixed(2))} ${chalk.blue(toCurrency)}`);
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
}
convertCurrency();
