const seedUsers = [{
        username: 'adeorits45',
        email: 'adeorits45@gmail.com',
    },
    {
        username: 'Buky434',
        email: 'buky432@gmail.com',
    },
    {
        username: 'ayowole',
        email: 'ayowole@hotmail.com',
    }
]


const seedThoughts = [{
        thoughtText: 'Today is a good day',
        createdAt: new Date(),
        username: 'adeorits45'
    },
    {
        thoughtText: 'I love a gucci bag',
        createdAt: new Date(),
        username: 'Buky434'
    },
    {
        thoughtText: 'There is joy in helping others',
        createdAt: new Date(),
        username: 'ayowole'
    },
]

module.exports = seedThoughts, seedUsers;