import {Job, PromiseId, PromiseJob, PromiseMap} from './Interfaces'

export class PromisePool
{
    private readonly promiseMap: PromiseMap
    private promiseJobs: PromiseJob[]

    constructor() {
        this.promiseMap = {};
        this.promiseJobs = [];
    }

    private rebuild() {
        this.promiseJobs = [];
        for (const key in this.promiseMap)
            this.promiseJobs.push(this.promiseMap[key])
    }

    add(id: PromiseId, job: Job) {
        this.promiseMap[id] = job();
        this.promiseJobs.push(this.promiseMap[id]);
    }

    delete(id: PromiseId) {
        delete this.promiseMap[id]
        this.rebuild()
    }

    length() {
        return this.promiseJobs.length
    }

    getJobs() {
        return this.promiseJobs
    }

    getPromises() {
        return this.promiseMap
    }
}