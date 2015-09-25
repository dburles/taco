Meteor.publish("communications", function(){
    return Communications.find();
})
