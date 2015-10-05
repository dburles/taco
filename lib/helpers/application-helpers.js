ApplicationHelpers = {
    Profiles: function(){
        return [
            'Mortgage',
            'Purchase',
            'Refinance',
            'Grant',
            'Guarantor',
            'Construction'
        ]
    },
    Groups: function(){
        return [
            'Clients',
            'Agents',
            'Solicitors',
            'Collegues',
            'Suppliers',
            'Supplier Contacts'
        ]
    },
    Roles: function(){
        return this.Groups().map(function(value){
            return {name: pluralize(value,1)};
        })
    }
}
