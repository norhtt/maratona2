const Database = require('../db/config')


module.exports = {
    async get(){
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return jobs.map((job) => ({  //arrow function com "()" entende-se que dentro dela possui return
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at,
        }));
    },

    // jobId/WHERE id= necessario para saber quem sera alterado
    async update(updateJob, jobId) {
      const db = await Database()  

      await db.run(`UPDATE jobs SET
        name = "${updateJob.name}",
        daily_hours = ${updateJob["daily-hours"]},
        total_hours = ${updateJob["total-hours"]},
        created_at = ${updateJob.created_at},
        WHERE id = ${jobId} 
    `)

      await db.close()
    },


   async delete(id) {
       const db = await Database()

       await db.run(`DELETE FROM jobs WHERE id = ${id}`)
       // deletar de job o aquivo com o mesmo id que esta sendo chamado 

       await db.close()
    },


    async create(newJob){
      const db = await Database()


      await db.run(`INSERT INTO jobs (
          name,
          daily_hours,
          total_hours,
          created_at
        ) VALUES (
          "${newJob.name}",
           ${newJob["daily-hours"]},  
           ${newJob["total-hours"]},
           ${newJob.created_at}
        )`) //necessario [""] para nomes que possuem algum tipo de marcação

        await db.close()
     }
}
// proposito de trabalhar os dados de job