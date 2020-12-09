const connection = require("./connection");

class ORM {
    connection;

    constructor(connection) {
        this.connection = connection;
    }

    query = (queryString, vals) => {
        return new Promise((resolve, reject) => {
            this.connection.query(queryString, vals, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        })
    };

    // Helper function for SQL syntax.
    printQuestionMarks(num) {
        const arr = [];

        for (let i = 0; i < num; i++) {
            arr.push("?");
        }

        return arr.toString();
    }


    objToSql(ob) {
        const arr = [];


        for (let key in ob) {
            const value = ob[key];
            // check to skip hidden properties
            if (Object.hasOwnProperty.call(ob, key)) {
                // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
                if (typeof value === "string" && value.indexOf(" ") >= 0) {
                    value = "'" + value + "'";
                }
                // e.g. {sleepy: true} => ["sleepy=true"]
                arr.push(key + "=" + value);
            }
        }


        return arr.toString();
    }


    selectAll() {
        return this.query("SELECT * FROM burgers;");
    }

    insertOne(vals) {
        let queryString = "INSERT INTO burgers";

        queryString += " (";
        queryString += "burger_name";
        queryString += ") ";
        queryString += "VALUES (";
        queryString += `"${vals}"`;
        queryString += ");";

        return this.query(queryString, vals);
    }

    updateOne(properties, condition) {
        let queryString = "UPDATE burgers";

        queryString += ' SET ';
        queryString += this.objToSql(properties);
        queryString += ' WHERE ';
        queryString += condition + ";";

        return this.query(queryString);
    }

    deleteOne(condition) {
        let queryString = 'DELETE FROM burgers';
        queryString += ' WHERE ';
        queryString += condition += ";";

        return this.query(queryString);
    }

}


module.exports = new ORM(connection);
