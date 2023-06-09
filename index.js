// Allow multiple accounts to be created -Accounts
// class AllAccounts {
// constructor (name,balance)
// this.name = {balance}

// }

class Account {
  constructor(name) {
    this.name = name;
    this.balance = 0;
    this.transactions = [];
  }
}

class Transaction {
  constructor(amount, account, activity) {
    this.activity = activity;
    this.account = account;
    this.amount = amount;
  }
  commit() {
    this.account.balance += this.value;

    if (this.value > 0) {
      this.activity = "Deposit";
    } else if (this.value < 0) {
      this.activity = "Withdrawal";
    } else this.activity = "Account Check";

    const transaction = {
      activity: this.activity,
      amount: this.amount,
    };

    this.account.transactions.push(transaction);
  }
}
// Each account can have many transactions - transaction object -
// Allow withdrawals and deposits into accounts - Transactions - Done
// Don't allow withdrawals that exceed the remaining balance of the account - Transactors set /function

class Withdrawal extends Transaction {
  get value() {
    return this.amount * -1;
  }

  //this.transaction.type = "Withdrawal";
}
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

// Allow us to retrieve the transaction history of an account (all withdrawals and deposits) get/
// Allow us to retrieve the current balance of the account at any time get

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("Chequing");

console.log("Starting Balance:", myAccount.balance);

const t1 = new Deposit(120.0, myAccount);
t1.commit();
const t2 = new Withdrawal(50.0, myAccount);
t2.commit();

console.log("Ending Balance:", myAccount.balance);
console.log(myAccount.transactions);
