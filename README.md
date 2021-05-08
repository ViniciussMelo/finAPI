## FinApi - For finances
> - Api developed during the classes of the Ignite NodeJS course.

> - The intention of the project is to demonstrate knowledge about Node JS || Javascript ||Typescript , creating an API to control finances.
---

### How to run this project

```bash
    # Clone this repository in your computer
    $ git clone https://github.com/ViniciussMelo/finAPI

    # Enter in the project folder
    $ cd FinApi

    # Install the dependencies
    $ yarn install

    # Run the migrations
    $ yarn typeorm migration:run

    # Start the project
    $ yarn start
```

### Tests

```bash
    # Run tests
    $ yarn test
```

### Requirements

- [x] Should be able to create an account
- [x] Should be able to retrieve the customer's bank statement
- [x] Should be able to make a deposit
- [x] Should be able to make a withdraw
- [x] Should be possible to retrieve the customer's bank statement by date
- [x] Should be able to update a cusomer account data
- [x] Should be able to obtain a customer acoount data
- [x] Should be able to delete an customer account
- [x] Should be able to obtain the balance sheet

---

### Business rules

- [x] Should be not able to register an account with an existing CPF
- [x] Should be not able to get a statment from a non-existent account
- [x] Should be not able make a deposit in a non-existent account
- [x] Should be not able make a withdraw to a non-existent account
- [x] Should be not able make a withdraw when the balance is insufficient
- [x] Should be not able delete a non-existent account