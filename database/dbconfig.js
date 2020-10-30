module.exports = {
    user : process.env.NODE_ORACLE_USER || "system", 

    password: process.env.NODE_ORACLE_PASSWORD || "oracle",

    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/XE", 

    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false 
};