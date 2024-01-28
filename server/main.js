import { Meteor } from 'meteor/meteor';
import { LoansCollection } from '../imports/api/loans.js';
import { Accounts } from 'meteor/accounts-base';

const SEED_USERNAME_SUFFIX = '@mailbox.com';
const SEED_PASSWORD = '123456';
const SEED_ROLES = ['admin', 'lender', 'borrower'];

async function insertLoan({ amount, user, paidOff = false, approvedBy = undefined }) {
  await LoansCollection.insertAsync({ amount, user, paidOff, approvedBy, createdAt: new Date() });
}

Meteor.startup(async () => {

  Meteor.publish("loans", function () {
    const loansCollection = LoansCollection.find({}, { sort: { createdAt: -1, updatedAt: 1 }, limit: 50 });
    return loansCollection;
  });

  console.groupEnd();

  Meteor.publish("users", function () {
    const usersCollection = Meteor.users.find({}, { sort: { createdAt: -1, updatedAt: -1 }, limit: 50, fields: { _id: 1, username: 1, profile: 1 } });
    return usersCollection;
  });
});
