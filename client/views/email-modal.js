Template.emailModal.helpers({
    emailSending: function () {
        return emailSending;
    },
    formType: function(){
        var editingContact = Session.get("editingContact");
        if(editingContact)
            return "update"
        else
            return "insert"
    },
    s2Opts: function () {
        return {
            placeholder: ' To',
            tags: true,
            selectOnBlur: true,
            createSearchChoice:function(term, data) {
                if ($(data).filter(function() {
                        return this.text.localeCompare(term)===0;
                    }).length===0)
                {return {id:term, text:term};}
            }
        };
    }
});


Template.emailModal.events({
    'click #cancelEmail': function (e, t) {
        event.preventDefault();
        AutoForm.resetForm('emailForm');
        $('.redactor').html('');
        Modal.hide("emailModal");
    },
    'click #sendEmail': function (e, t) {
        //Session.set("editingContact");
    }
});

Template.emailModal.rendered = function(){
    $('.redactor').redactor({
        minHeight:200
    });
};