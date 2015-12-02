ProfileHelpers = {
    initialiseAssets:function(profileId) {
        existingItems = ProfileAssets.find({profileId:profileId});

        existingItems.forEach(function(item){
            ProfileAssets.remove({_id:item._id});
        });

        ProfileAssets.insert({
            profileId: profileId,
            type: 'Savings Account 1',
            descriptionPlaceholder: 'Lender'
        })
        ProfileAssets.insert({
            profileId: profileId,
            type: 'Savings Account 2',
            descriptionPlaceholder: 'Lender'
        })
        ProfileAssets.insert({
            profileId: profileId,
            type: 'Car 1',
            descriptionPlaceholder: 'Make and Year'
        })
        ProfileAssets.insert({
            profileId: profileId,
            type: 'Car 2',
            descriptionPlaceholder: 'Make and Year'
        })
        ProfileAssets.insert({
            profileId: profileId,
            type: 'Home Contents',
            descriptionPlaceholder: 'Insurance Company'
        })
        ProfileAssets.insert({
            profileId: profileId,
            type: 'Other Major Assets',
            descriptionPlaceholder: 'Description eg. Boat, Caravan'
        })
    }
}