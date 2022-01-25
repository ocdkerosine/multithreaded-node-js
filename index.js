const { Worker } = require('worker_threads')

// function runService() runs the worker thread and returns a Promise 
const runSerice = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) reject(new Error(` Worker Thread stopped with exit code ${code}`))
        })
    })
}

// function run() is used for calling the function runService() and giving the value for workerData
const run = async () => {
    const result = await runSerice('Tunde Ednut')
    console.log(result)
}

run().catch(err => console.error(err))