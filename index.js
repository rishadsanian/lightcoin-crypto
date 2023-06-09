// Allow multiple accounts to be created -Accounts
// Allow us to retrieve the transaction history of an account (all withdrawals and deposits) done
// Allow us to retrieve the current balance of the account at any time done
class User {


  
}


class Account {
  constructor(name) {
    this.name = name;
    this.balance = 0;
    this.transactions = [];
  }
  // get balance() {
  //   console.log(this.balance);
  //   return this.balance;
  // }
}

class Transaction {
  constructor(amount, account, activity) {
    this.activity = activity;
    this.account = account;
    this.amount = amount;
  }

  post() {
    this.account.balance += this.value;
  }

  recordTransaction() {
    const transaction = {
      account: this.account.name,
      activity: this.activity,
      amount: this.amount,
      date: this.time,
    };

    this.account.transactions.push(transaction);
  }

  commit() {
    this.time = new Date();
    if (this.amount > this.account.balance && this.value < 0) {
      console.log("Insufficient funds");
      this.activity = "Withdrawal Failed - Insufficient funds";
    } else {
      this.post();
      if (this.value > 0) {
        this.activity = "Deposit";
      } else if (this.value < 0) {
        this.activity = "Withdrawal";
      } else this.activity = "Account Check";
    }
    this.recordTransaction();
  }
}
// Each account can have many transactions - transaction object -done

// Don't allow withdrawals that exceed the remaining balance of the account - Transactors set /function TODO

// Allow withdrawals and deposits into accounts - Transactions - Done
class Withdrawal extends Transaction {
  get value() {
    return this.amount * -1;
  }
}
class Deposit extends Transaction {
  get value() {
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