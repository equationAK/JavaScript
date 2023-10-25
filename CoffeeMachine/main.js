const readline = require('readline');
const timers = require("timers");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Coffee {
    constructor(name) {
        switch (name) {
            case "espresso":
                this.water = 250;
                this.milk = 0;
                this.beans = 16;
                this.cost = 4;
                this.ice = 0;
                break;
            case "latte":
                this.water = 350;
                this.milk = 75;
                this.beans = 20;
                this.cost = 7;
                this.ice = 0;
                break;
            case "cappuccino":
                this.water = 200;
                this.milk = 100;
                this.beans = 12;
                this.cost = 6;
                this.ice = 0;
                break;
            case "Fredo Cappuccino":
                this.water = 300;
                this.milk = 100;
                this.beans = 16;
                this.cost = 10;
                this.ice = 4;
                break;
            default:
                break;
        }
    }
}

class Machine {
    constructor(water, milk, beans, ice, disposableCups, balance) {
        this.water = water;
        this.milk = milk;
        this.beans = beans;
        this.ice = ice;
        this.disposableCups = disposableCups;
        this.balance = balance;
        this.machineProcedures = [];
    }

    initMachineProcedures() {
        this.machineProcedures.push("Starting to make a coffee");
        this.machineProcedures.push("Grinding coffee beans");
        this.machineProcedures.push("Boiling water");
        this.machineProcedures.push("Mixing boiled water with crushed coffee beans");
        this.machineProcedures.push("Pouring coffee into the cup");
        this.machineProcedures.push("Pouring some milk into the cup");
        this.machineProcedures.push("Coffee is ready!");
    }

    balanceToString() {
        return `$${this.balance}`;
    }

    buyCoffee(choice) {
        const choices = ["espresso", "latte", "cappuccino", "fredo"];
        const coffee = new Coffee(choices[choice - 1]);
        if(machine.checkResources(coffee)) {
            this.water -= coffee.water;
            this.milk -= coffee.milk;
            this.beans -= coffee.beans;
            this.ice -= coffee.ice;
            this.disposableCups--;
            this.balance += coffee.cost;
        }
    }

    fillMachine() {
        console.log("Write how many ml of water you want to add:");
        rl.question("", (waterInput) => {
            const waterToAdd = parseInt(waterInput);
            this.water += waterToAdd;

            console.log("Write how many ml of milk you want to add:");
            rl.question("", (milkInput) => {
                const milkToAdd = parseInt(milkInput);
                this.milk += milkToAdd;

                console.log("Write how many grams of coffee beans you want to add:");
                rl.question("", (beansInput) => {
                    const beansToAdd = parseInt(beansInput);
                    this.beans += beansToAdd;
                    console.log("Write how many ice cubes you want to add:");
                    rl.question("", (iceInput) => {
                        const iceToAdd = parseInt(iceInput);
                        this.ice += iceToAdd;
                        console.log("Write how many disposable cups you want to add:");
                        rl.question("", (cupsInput) => {
                            const cupsToAdd = parseInt(cupsInput);
                            this.disposableCups += cupsToAdd;
                            askUserAction();
                        });
                    });
                });
            });
        });
    }

    take() {
        console.log(`I gave you ${this.balanceToString()}`);
        this.balance = 0;
    }

    machineState() {
        console.log(`The coffee machine has:\n${this.water} ml of water\n${this.milk} ml of milk\n${this.beans} g of coffee beans\n${this.ice} ice cubes\n${this.disposableCups} disposable cups\n${this.balanceToString()} of money\n`);
    }

    calculateIngredients(cups) {
        const waterNeeded = cups * 200;
        const milkNeeded = cups * 50;
        const beansNeeded = cups * 15;

        console.log(`For ${cups} cups of coffee you will need:
${waterNeeded} ml of water
${milkNeeded} ml of milk
${beansNeeded} g of coffee beans`);
    }

    checkResources(coffee) {
        let isResourcesOk = false;
        const waterNeeded = coffee.water;
        const milkNeeded = coffee.milk;
        const beansNeeded = coffee.beans;
        const iceNeeded = coffee.ice;
        let message = "";
        if (this.water >= waterNeeded && this.milk >= milkNeeded && this.beans >= beansNeeded && this.disposableCups > 1 && this.ice >= iceNeeded) {
            message = `I have enough resources, making you a coffee!`;
            isResourcesOk = true;
        } else if(this.water < waterNeeded) {
            message = "Sorry, not enough water!";
        } else if (this.milk < milkNeeded) {
            message = `Sorry, not enough milk!`;
        } else if (this.beans < beansNeeded) {
            message = `Sorry, not enough beans!`;
        } else if (this.ice < iceNeeded) {
            message = `Sorry, not enough ice cubes!`;
        } else if (this.disposableCups < 1) {
            message = `Sorry, not enough cups!`;
        }
        console.log(message);
        return isResourcesOk;
    }
}

const machine = new Machine(400, 540, 120, 20,9,550);
machine.initMachineProcedures();
//machine.machineState();
let start = true;

const askUserAction = () => {
    console.log("Write action (buy, fill, take, remaining, exit):");
    rl.question("", (choice) => {
        switch (choice) {
            case "buy":
                console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:");
                rl.question("", (optionInput) => {
                    const option = parseInt(optionInput);
                    if ([1, 2, 3].includes(option)) {
                        machine.buyCoffee(option);
                    } else {
                        console.log("Choose the correct option!");
                    }
                    askUserAction();
                });
                break;
            case "fill":
                machine.fillMachine();
                break;
            case "take":
                machine.take();
                askUserAction();
                break;
            case "remaining":
                machine.machineState();
                askUserAction();
                break;
            case "exit":
                start = false;
                console.log("Have a nice day!");
                rl.close();
                break;
            default:
                askUserAction();
                break;
        }
    });
};


askUserAction();