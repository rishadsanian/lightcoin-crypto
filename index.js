//nod
// Allow multiple accounts to be created
// Each account can have many transactions
// Allow withdrawals and deposits into accounts
// Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
// Allow us to retrieve the current balance of the account at any time
// Don't allow withdrawals that exceed the remaining balance of the account}
class Account {
  constructor(name) {
    this.name = name;
    this.balance = 0;
    this.transactions = [];
    this.transactionCount = 0;
  }
  getBalance() {
    return this.balance;
  }
}

class Transaction {
  constructor(amount, account, activity) {
    this.activity = activity;
    this.account = account;
    this.amount = amount;
    this.transactionID = "T";
  }

  isAllowed() {
    return true;
  }

  post() {
    this.account.balance += this.value;
  }

  generateTransactionID() {
    this.account.transactionCount++;
    this.transactionID += this.account.transactionCount;
  }

  recordTransaction() {
    this.generateTransactionID();
    const transaction = {
      id: this.transactionID,
      account: this.account.name,
      activity: this.activity,
      amount: this.amount,
      date: new Date(),
    };

    this.account.transactions.push(transaction);
  }

  commit() {
    if (!this.isAllowed()) {
      this.activity = "Withdrawal Failed - Insufficient funds";
    }
    if (this.isAllowed()) {
      this.post();
    }
    this.recordTransaction();
  }
}

class Withdrawal extends Transaction {
  get value() {
    this.activity = "Withdrawal";
    return this.amount * -1;
  }
  isAllowed() {
    return this.account.balance >= this.amount;
  }
}
class Deposit extends Transaction {
  get value() {
    this.activity = "Deposit";
    return this.amount;
  }
}

// DRIVER CODE

const myAccount = new Account("Chequing");

console.log(myAccount.name);
console.log("Starting Balance:", myAccount.balance);
const t1 = new Deposit(100.0, myAccount);
t1.commit();
const t2 = new Withdrawal(50.0, myAccount);
t2.commit();
const t3 = new Withdrawal(1000, myAccount);
t3.commit();
const t4 = new Withdrawal(0, myAccount);
t4.commit();

console.log(myAccount.transactions);

console.log("Ending Balance:", myAccount.balance);
