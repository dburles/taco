if (Meteor.users.find().count() === 0) {
    var userId = Accounts.createUser({
        username: 'matt@ireland.mx',
        email: 'matt@ireland.mx',
        password: 'maver1ck'
    });

    var contactId = Contacts.insert({
        _id: userId,
        firstName: "Matt",
        lastName: "Ireland",
        email: "matt@ireland.mx",
        mobile: "0413 999951",
        profiles: ['User'],
        updatedAt: new Date(),
        team: 'Mortgage Choice Buderim',
        user:{
            teams:['Mortgage Choice Buderim','Mortgage Choice Miami']
        }
    })

    console.log("Seeding Contacts...")

    Teams.insert({
        name: 'Mortgage Choice Buderim',
        contactProfiles:[
            {name:'User', transactionRole:true},
            {name:'Client', transactionRole:true},
            {name:'Solicitor', transactionRole:true},
            {name:'Agent', transactionRole:true},
            {name:'Guarantor', transactionRole:true},
            {name:'Supplier', transactionRole:true}
        ],
        transactionProfiles:[
            {name:'Mortgage', category:'Mortgage'},
            {name:'Purchase', category:'Mortgage'},
            {name:'Refinance', category:'Mortgage'},
            {name:'First Home', category:'Mortgage'},
            {name:'Guarantor', category:'Mortgage'},
            {name:'Construction', category:'Mortgage'}
        ],
        leadSourceTypes:['Client Referral','Business Referral','Personal Referral','Local Marketing','Head Office']
    })

    Teams.insert({
        name: 'Mortgage Choice Miami',
        contactProfiles:[
            {name:'User', transactionRole:true},
            {name:'Client', transactionRole:true},
            {name:'Solicitor', transactionRole:true},
            {name:'Agent', transactionRole:true},
            {name:'Guarantor', transactionRole:true},
            {name:'Supplier', transactionRole:true}
        ],
        transactionProfiles:[
            {name:'Mortgage', category:'Mortgage'},
            {name:'Purchase', category:'Mortgage'},
            {name:'Refinance', category:'Mortgage'},
            {name:'First Home', category:'Mortgage'},
            {name:'Guarantor', category:'Mortgage'},
            {name:'Construction', category:'Mortgage'}
        ],
        leadSourceTypes:['Client Referral','Business Referral','Personal Referral','Local Marketing','Head Office']
    })

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
            profiles:['Client'],
            updatedAt: new Date()
        })
    }



    //add 2 transactions...

    var transactionId = Transactions.insert({
        contactId: contactId,
        title: 'Purchase first home with guarantor',
        client: 'John Citizen'
    })

    var contactId = Contacts.insert({
        email: "assessmentmail@anz.com",
        profiles: ['Supplier'],
        company: 'ANZ'
    })

    var contactId = Contacts.insert({
        email: "tpbpaperless@cba.com.au",
        profiles: ['Supplier'],
        company: 'CBA'
    })

    var contactId = Contacts.insert({
        email: "brokerdocs@westpac.com.au",
        profiles: ['Supplier'],
        company: 'Westpac'
    })

    var contactId = Contacts.insert({
        firstName: "Sally",
        lastName: "Solicitor",
        email: "sally.solicitor@gmail.com",
        profiles: ['Solicitor'],
        updatedAt: new Date()
    })

    Members.insert({
        role:'Solicitor',
        contactId:contactId,
        transactionId:transactionId
    })

    var contactId = Contacts.insert({
        firstName: "Ronald",
        lastName: "Realtorman",
        email: "ronald.realtorman@gmail.com",
        profiles: ['Agent'],
        updatedAt: new Date()
    })

    Members.insert({
        role:'Agent',
        contactId:contactId,
        transactionId:transactionId
    })

    var contactId = Contacts.insert({
        firstName: "John",
        lastName: "Citizen",
        email: "john@gmail.com",
        mobile: "0413 999951",
        profiles: ['Client'],
        updatedAt: new Date()
    })

    Members.insert({
        role:'Client',
        contactId:contactId,
        transactionId:transactionId
    })

    //first stage...

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

    var stepId = Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step'],
        text: 'Last 2 payslips',
        taskCount: 3,
        taskCompletedCount: 0
    })

    //tasks and comments...

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        stepId: stepId,
        type:['Task'],
        text: 'Must be consecutive'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        stepId: stepId,
        type:['Task'],
        text: 'Must be ledgible'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        stepId: stepId,
        type:['Task'],
        text: 'Within 4 weeks old'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step'],
        text: 'Most recent group certificate'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step','Section'],
        text: 'Contribution'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step'],
        text: 'Last 3 months bank statements'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step'],
        text: 'Gifted Funds'
    })

    //stage 2...

    var stageId = Activities.insert({
        transactionId:transactionId,
        type:['Stage'],
        text: 'Pre Submission'
    })

    //steps...

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step'],
        text: 'Step One'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step'],
        text: 'Step Two'
    })

    Activities.insert({
        transactionId:transactionId,
        stageId: stageId,
        type:['Step'],
        text: 'Step Three'
    })

    //other stages


    Activities.insert({
        transactionId:transactionId,
        type:['Stage'],
        text: 'Submitted'
    })

    Activities.insert({
        transactionId:transactionId,
        type:['Stage'],
        text: 'Conditional'
    })

    Activities.insert({
        transactionId:transactionId,
        type:['Stage'],
        text: 'Approved'
    })

    Activities.insert({
        transactionId:transactionId,
        type:['Stage'],
        text: 'Settled'
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

    //communications...

    Communications.insert({
        name: 'Conditional - Email Client with Conditions',
        role: 'Client',
        type: 'Mortgage',
        stage: 'Conditional',
        subject: 'Congratulations - Conditionally Approved',
        body: 'Hi [Client],\n\nYour loan has been approved subject to the following conditions:'
    })

    Communications.insert({
        name: 'Initial Enquiry - Welcome Email',
        role: 'Client',
        type: 'Mortgage',
        stage: 'Presubmission',
        subject: 'Welcome to Mortgage Choice',
        body: 'Hi [Client],\n\nThank you for your enquiry...'
    })

}
