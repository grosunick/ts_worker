import {JobFetcher} from "../AsyncPool";
import {PromisePool} from "../PromisePool";
import {Job} from "../Interfaces";

export class ArrayFetcher implements JobFetcher
{
    private arr: Job[];

    constructor(arr: Job[]) {
        this.arr = arr;
    }

    nextJob(pool: PromisePool): boolean {
        if (this.arr.length === 0)
            return false

        let id = this.arr.length - 1;
        let job = this.arr.pop()

        if (job)
            pool.add(id, job);

        return true
    }
}