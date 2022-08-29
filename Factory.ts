import {AsyncPool} from "./AsyncPool";
import {Job} from "./Interfaces";
import {Config} from "./Config";
import {IterableFetcher} from "./IterableFetcher";

export async function from(it: Iterable<Job>, cnf: Config) {
    let threadPool = new AsyncPool();
    return threadPool.run(cnf, new IterableFetcher(it))
}

