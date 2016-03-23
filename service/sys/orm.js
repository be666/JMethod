/**
 * Created by bqxu on 16/3/23.
 */
'use strict';
let mysqldesc = require('mysqldesc');
let fs = require('fs');
let crypto = require('crypto');

let config = {
    user: 'wx',
    password: '123456',
    host: 'localhost',
    database: 'wx'
};

let tables = (config)=> {
    mysqldesc(config, function (err, data) {
        for (let entityName in data) {
            fs.appendFileSync(`tableName`, entityName + "\n", {encoding: "utf-8"});
        }
    });
};

tables(config);