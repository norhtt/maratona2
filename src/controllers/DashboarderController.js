const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')


module.exports = {
    async index(req, res) {   

        const jobs = await Job.get()
        const profile = await Profile.get()
        
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

             // total de horas por cada job em progresso
        let jobTotalHours = 0

        const updatedjobs = jobs.map((job) => {
            // ajustes no jobs
        const remaining = JobUtils.remainingDays(job)
            // remaining recebe as caracteristicas de remainingDays para ser enviar para o job e posteriomente para o jobs
        const status = remaining <= 0 ? 'done' : 'progress'
                    
            //somando a quantidade de status
            statusCount[status] += 1;

            // total de horas por cada job em progresso
            jobTotalHours = status === 'progress' ? jobTotalHours +  Number(job["daily-hours"]) : jobTotalHours  
            // ? (se sim) :(se não)

        return {
            ...job,    //espalhamento, pega tudo que tem no obj e acrecenta novas categorias
            remaining,
            status,
            budget: JobUtils.calculateBudget(job, profile["value-hour"])  //  custo do projeto
                    }
            })  // usado para atualisar os jobs

                // qtd de horas que quero trabalhar
                // MENOS
                // quantidades de horas/dia de cada job em progress 
            const freeHours = profile["hours-per-day"] -  jobTotalHours;
                                                
        return res.render("index", { jobs: updatedjobs, profile: profile, statusCount:statusCount, freeHours: freeHours })  
        // esse profile esta se referindo ao const profile que esta abrigando o Profile.get() que possui todos os dados
        },

}