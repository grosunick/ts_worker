import {JobFetcher} from "../AsyncPool";
import {PromisePool} from "../PromisePool";
import {PromiseId} from "../Interfaces";

export class ArrayFetcher implements JobFetcher
{
    private arr: Promise<PromiseId>[];

    constructor(arr: Promise<PromiseId>[]) {
        this.arr = arr;
    }

    nextJob(pool: PromisePool): boolean {
        if (this.arr.length === 0)
            return false

        let id = this.arr.length - 1;
        let promise = this.arr.pop()

        if (promise)
            pool.add(id, promise);

        return true
    }
}
