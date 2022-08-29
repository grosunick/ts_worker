import {Config} from "./Config";
import {PromisePool} from "./PromisePool";
import {JobFetcher} from "./Interfaces";

class Stat {
    public maxThread = 0
}

export class AsyncPool
{
    private readonly pool: PromisePool;
    private stat: Stat;

    constructor() {
        this.pool = new PromisePool();
        this.stat = new Stat();
    }

    /**
     * Add Jobs to pool map
     *
     * @param config
     * @param fetcher
     */
    public addJobs(config: Config, fetcher: JobFetcher) {
        while (this.pool.length() < config.threadsCount) {
            if (!fetcher.nextJob(this.pool))
                break;
        }
    }

    async run(config: Config, nextJob: JobFetcher) {
        this.addJobs(config, nextJob); // init pool

        while (this.pool.length()) {
            // waiting while the first job is finished
            let id = await Promise.race(this.pool.getJobs());
            // console.log(id, this.pool.getJobs(), this.pool.getPromises())
            this.pool.delete(id) // delete finished job from pool

            this.addJobs(config, nextJob);
            this.calcStat();
        }
    }

    private calcStat() {
        this.stat = {
            maxThread: Math.max(this.stat.maxThread, this.pool.length())
        };
    }

    getStat(): Stat {
        return this.stat;
    }
}
