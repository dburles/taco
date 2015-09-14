AdminConfig = {
    name: 'Snap CRM',
    collections: {
        Contacts: {
            icon: 'user',
            omitFields: ['updatedAt'],
            tableColumns: [
                { label: 'First Name', name: 'firstName' },
                { label: 'Last Name', name: 'lastName' },
                { label: 'Email', name: 'email' }
            ],
            showEditColumn: true, // Set to false to hide the edit button. True by default.
            showDelColumn: true, // Set to false to hide the edit button. True by default.
            showWidget: true,
            color: 'blue'
        }
    }
};