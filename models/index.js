const models = {
    usersModel: require('./nosql/users'),
    tracksModel: require('./nosql/tracks'),
    storageModel: require('./nosql/storage'),
    tierModel: require('./nosql/tier'),
    tierItemModel: require('./nosql/tieritem'),
    itemModel: require('./nosql/items'),
}

module.exports = models;