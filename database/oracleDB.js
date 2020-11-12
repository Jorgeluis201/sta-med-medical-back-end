const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

class OracleSql {
 
  constructor(){
   this.initialization();
  }

  async initialization(){
    
    this.connection = await oracledb.getConnection( {
      user          : "ADMIN",
      password      : "Stamedicalportafolio2020",
      connectString : "stamed01_high"
    });
  }

  async searchUser(user, pass){
   
    try {

      const { rows } = await this.connection.execute(
        `select * from personas where rut = '${user}' and hash_clave = '${pass}'`,
      );
  
      return rows[0]
    } catch (error) {
      console.log(error)
      return {error: 'el usuario no existe'}
    }
  }

  async getDiagnoses(id){
    try {
      const { rows } = await this.connection.execute(
        `SELECT id_condicion
        FROM personas p JOIN diagnosticos d
        ON p.id_persona=d.personas_id_persona
        JOIN enfermedades e
        ON d.enfermedades_id_enfermedad=e.id_enfermedad
        JOIN condicion_cr c
        ON e.condicion_cr_id_condicion=c.id_condicion
        WHERE p.id_persona=${id}
        GROUP BY c.id_condicion`
      );
  
      return rows
    } catch (error) {
      console.log(error)
    }
  }

  async saberCondicion(id){
    try {
      const result = await this.connection.execute(
        `BEGIN
          :ret := fn_saber_condicion(1);
        END;
        `, {
          ret: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR, maxSize: 40 }
        }
      );
      
      console.log('el result procedure', result.outBinds.ret);
      return result
    } catch (error) {
      console.log('error store procedure', error)
    }
  }
}

module.exports = OracleSql;