const orm = require("../config/orm");

const burger = {
    selectAll: function () {
        return orm.selectAll("burgers");
    },

    insertOne: function (vals) {
        return orm.insertOne(vals);
    },
    updateOne: function (objColVals, condition) {
        return orm.updateOne(objColVals, condition);
    },
    deleteOne: function (condition) {
        return orm.deleteOne(condition);
    }
};


module.exports = burger;