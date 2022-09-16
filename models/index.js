const models = {
    usersModel: require('./nosql/users'),
    tracksModel: require('./nosql/tracks'),
    storageModel: require('./nosql/storage'),
    categoryModel: require('./nosql/category'),
    templateModel: require('./nosql/template'),
    tierModel: require('./nosql/tier'),
    itemModel: require('./nosql/items'),
}

module.exports = models;