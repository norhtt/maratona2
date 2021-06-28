module.exports = {
    remainingDays(job) {
        // cálculo de tempo restante
    
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        // referente quantos dias para o job
    
        const createDate = new Date(job.created_at)
        // referido a data q foi criada o projeto 
    
        const dueDay = createDate.getDate() + Number(remainingDays)
        // referindo ao dia do vencimento ex:("dia 30")
    
        const dueDateInMS = createDate.setDate(dueDay)
        //criando a data de vencimento
    
    
        const timeDiffInMS = dueDateInMS - Date.now()
        // transformar milli em dias
    
        const dayInMS = 1000 * 60 * 60 * 24
    
        // ceil necessario para um arendondamento para o teto 
        const dayDiff = Math.ceil(timeDiffInMS / dayInMS)
        // referente aos dias que faltam
    
        // restam x dayInMS
        return dayDiff
     },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    //deixar salvo para ser usado pela operação e caso precise fazer auterações

}