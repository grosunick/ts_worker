import {PromisePool} from "./PromisePool";
import {Job} from "./Interfaces";

export class IterableFetcher implements IterableFetcher
{
    private iter: Iterator<Job>;

    constructor(it: Iterable<Job>) {
        this.iter = it[Symbol.iterator]();
    }

    nextJob(pool: PromisePool): boolean {
        const {value, done} = this.iter.next();
        if (done || !value)
            return false

        if (value) {
            const {id, promise} = value();
            pool.add(id, promise);
        }

        return true
    }
}