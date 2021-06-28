const sqlite3 = require("sqlite3");
const { open } = require ("sqlite");
// uso de {} na variavel permite puschar no require apenas a função requerida


module.exports = () => open ({
            filename: "./database.sqlite",
            driver: sqlite3.Database,
        })
    // open precisa estar dentro de uma função
