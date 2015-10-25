MortgageHelpers = {
    InitialTermOptions: function() {
        return [
            {label: 'None', value: 0},
            {label: '1 year', value: 1},
            {label: '2 years', value: 2},
            {label: '3 years', value: 3},
            {label: '4 years', value: 4},
            {label: '5 years', value: 5}
        ]
    },

    ChecklistSections: function(){
        return [
            {name: 'Identification'},
            {name: 'Income'},
            {name: 'Contribution'},
            {name: 'Commitments'},
            {name: 'Security'},
            {name: 'Forms'},
            {name: 'Miscellaneous'}
        ]
    },

    ChecklistSectionOptions: function(){
        return this.ChecklistSections().map(function(item){
            return {label:item.name, value:item.name};
        })
    }
}
