module.exports = {
    user : process.env.NODE_ORACLE_USER || "jorgeDBA", 

    password: process.env.NODE_ORACLE_PASSWORD || "linkinpark1999",

    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/XE", 

    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false 
};