const models = {
    usersModel: require('./nosql/users'),
    tracksModel: require('./nosql/tracks'),
    storageModel: require('./nosql/storage'),
    categoryModel: require('./nosql/category'),
    tierItemModel: require('./nosql/tieritem'),
    itemModel: require('./nosql/items'),
}

module.exports = models;