import {PromisePool} from "./PromisePool";

export type PromiseId = number | string
export type PromiseJob = Promise<PromiseId>
export type Job = () => {id:PromiseId, promise:Promise<PromiseId>}
export type PromiseMap = {[id: PromiseId]: PromiseJob}

export interface JobFetcher {
    nextJob(pool: PromisePool): boolean
}