Meteor.methods({
    insertMortgage: function (transaction) {

        var mortgage = {
            transactionId: transaction._id,
            applications:[
                {loans:[
                    {amount:400000}
                ]}
            ]
        };

        return Mortgages.insert(mortgage);
    },

    getMortgage: function (transaction) {

        var mortgage = Mortgages.findOne({transactionId:transaction._id});
        if(!mortgage){
            mortgage = {
                transactionId: transaction._id,
                applications:[
                    {loans:[
                        {amount:400000}
                    ]}
                ]
            };
            Mortgages.insert(mortgage);
            mortgage = Mortgages.findOne({transactionId:transaction._id});
        }

        return mortgage;
    }



})