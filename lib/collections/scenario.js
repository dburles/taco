

Scenarios = new Meteor.Collection("scenarios");

//Scenarios.initEasySearch('names');

Scenarios.attachSchema(new SimpleSchema({
    names: {
        type: String,
        label: "Names",
        max: 200,
        optional:false
    },
    isBuying: {
        type: Boolean,
        label: "Buying Property"
    },
    investmentPurpose: {
        type: String,
        optional:true,
        label: "Purpose",
        allowedValues: ["Owner Occupied", "Investment"],
        autoform: {
            options: function(){
                return [
                    {label:"Owner Occupied", value:"Owner Occupied"},
                    {label:"Investment", value:"Investment"}
                ]
            },
            noselect:true
        }
    },
    "firstHome": {
        type: Boolean,
        optional:true
    },
    purchasePrice: {
        type: Number,
        decimal:false,
        label: "Purchase Price",
        optional:true
    },
    weeklyRent: {
        type: Number,
        decimal:false,
        label: "Weekly Rent",
        optional:true
    },
    hasProperty: {
        type: Boolean,
        label: "Has Property",
        optional:true
    },
    
    //Properties
    
    property1: {
        type: String,
        label: "Address",
        optional:true,
        autoform:{
            placeholder: "Property 1"
        }
    },
    propertyValue1: {
        type: Number,
        label: "Value",
        optional:true,
        autoform:{
            placeholder: "Value"
        }
    },
    propertyHome1: {
        type: Boolean,
        optional:true,
        label:"Home"
    },
    rent1: {
        type: Number,
        optional:true,
        label:"Rent",
        autoform:{
            placeholder: "Rent Income"
        }
    },
    propertyType1: {
        type: String,
        optional:true,
        label: "Type",
        autoform: {
            options: function(){
                return [
                    {label:"House", value:"House"},
                    {label:"Unit", value:"Unit"},
                    {label:"Land", value:"Land"},
                    {label:"Construct", value:"Construct"}
                ]
            }
        }
    },

    property2: {
        type: String,
        label: "Address",
        optional:true,
        autoform:{
            placeholder: "Property 2"
        }
    },
    propertyValue2: {
        type: Number,
        label: "Value",
        optional:true,
        autoform:{
            placeholder: "Value"
        }
    },
    propertyHome2: {
        type: Boolean,
        optional:true,
        label:"Home"
    },
    rent2: {
        type: Number,
        optional:true,
        label:"Rent",
        autoform:{
            placeholder: "Rent Income"
        }
    },
    propertyType2: {
        type: String,
        optional:true,
        label: "Type",
        autoform: {
            options: function(){
                return [
                    {label:"House", value:"House"},
                    {label:"Unit", value:"Unit"},
                    {label:"Land", value:"Land"},
                    {label:"Construct", value:"Construct"}
                ]
            }
        }
    },

    property3: {
        type: String,
        label: "Address",
        optional:true,
        autoform:{
            placeholder: "Property 3"
        }
    },
    propertyValue3: {
        type: Number,
        label: "Value",
        optional:true,
        autoform:{
            placeholder: "Value"
        }
    },
    propertyHome3: {
        type: Boolean,
        optional:true,
        label:"Home"
    },
    rent3: {
        type: Number,
        optional:true,
        label:"Rent",
        autoform:{
            placeholder: "Rent Income"
        }
    },
    propertyType3: {
        type: String,
        optional:true,
        label: "Type",
        autoform: {
            options: function(){
                return [
                    {label:"House", value:"House"},
                    {label:"Unit", value:"Unit"},
                    {label:"Land", value:"Land"},
                    {label:"Construct", value:"Construct"}
                ]
            }
        }
    },

    property4: {
        type: String,
        label: "Address",
        optional:true,
        autoform:{
            placeholder: "Property 4"
        }
    },
    propertyValue4: {
        type: Number,
        label: "Value",
        optional:true,
        autoform:{
            placeholder: "Value"
        }
    },
    propertyHome4: {
        type: Boolean,
        optional:true,
        label:"Home"
    },
    rent4: {
        type: Number,
        optional:true,
        label:"Rent",
        autoform:{
            placeholder: "Rent Income"
        }
    },
    propertyType4: {
        type: String,
        optional:true,
        label: "Type",
        autoform: {
            options: function(){
                return [
                    {label:"House", value:"House"},
                    {label:"Unit", value:"Unit"},
                    {label:"Land", value:"Land"},
                    {label:"Construct", value:"Construct"}
                ]
            }
        }
    },
    
    
    
    
    
    
    
    


    //existingProperties: {
    //    type: Array,
    //    optional:true
    //},
    //"existingProperties.$": {
    //    type: Object,
    //    label: "",
    //    optional:true
    //},
    //"existingProperties.$.address": {
    //    type: String,
    //    label: "Address",
    //    optional:true
    //},
    //"existingProperties.$.value": {
    //    type: Number,
    //    label: "Value",
    //    optional:true
    //},
    genSavings: {
        type: Number,
        decimal:false,
        optional:true
    },
    giftedFunds: {
        type: Number,
        decimal:false,
        optional:true
    },
    proceedsOfSale: {
        type: Number,
        decimal:false,
        optional:true
    },
    otherContribution: {
        type: Number,
        decimal:false,
        optional:true
    },
    hasKids: {
        type: Boolean,
        optional:true
    },
    agesOfKids: {
        type: String,
        optional:true
    },
    currentRent: {
        type: Number,
        decimal:false,
        optional:true
    }

}));


