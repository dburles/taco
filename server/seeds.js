if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
        username: 'matt@ireland.mx',
        email: 'matt@ireland.mx',
        password: 'maver1ck'
    });
}


if(Contacts.find().count() == 0){

    console.log("Seeding Contacts...")

    var tempUser;
    for(var n=1;n<500;n++){
        tempUser = Fake.user();
        Contacts.insert({
            firstName: tempUser.name,
            lastName: tempUser.surname,
            email: tempUser.email,
            mobile: "04" + NumberHelpers.randomNumber(11,99) + " " + NumberHelpers.randomNumber(100, 999).toString() + " " + NumberHelpers.randomNumber(100, 999).toString(),
            home: Fake.fromArray(["02", "03", "07", "08"]) + " " + NumberHelpers.randomNumber(1000, 9999).toString() + " " + NumberHelpers.randomNumber(1000, 9999).toString(),
            work: Fake.fromArray(["02", "03", "07", "08"]) + " " + NumberHelpers.randomNumber(1000, 9999).toString() + " " + NumberHelpers.randomNumber(1000, 9999).toString(),
            updatedAt: new Date()
        })
    }

    var contactId = Contacts.insert({
        firstName: "John",
        lastName: "Citizen",
        email: "john@gmail.com",
        updatedAt: new Date()
    })

    //add 2 transactions...

    var transactionId = Transactions.insert({
        contactId: contactId,
        title: 'Purchase first home with guarantor',
        client: 'John Citizen'
    })

    Members.insert({
        role:'Client',
        contactId:contactId,
        transactionId:transactionId
    })

    var stageId = Activities.insert({
        transactionId:transactionId,
        type:['Stage'],
        text: 'Client Checklist'
    })

    //steps...

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step','Section'],
        text: 'Identification'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step'],
        text: 'Drivers license'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step','Section'],
        text: 'Income'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step'],
        text: 'Last 2 payslips'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step'],
        text: 'Most recent group certificate'
    })








    Activities.insert({
        transactionId:transactionId,
        type:['Stage'],
        text: 'Pre Submission'
    })

    Activities.insert({
        transactionId:transactionId,
        type:['Stage'],
        text: 'Submitted'
    })

    //second transaction...

    var transactionId = Transactions.insert({
        contactId: contactId,
        title: 'Increase existing lending to buy caravan',
        client: 'John Citizen'
    })

    Members.insert({
        role: 'Client',
        contactId:contactId,
        transactionId:transactionId
    })




}
