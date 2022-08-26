import {AsyncPool} from "../AsyncPool";
import {ArrayFetcher} from "../fetcher/ArrayFetcher"
import {Job} from "../Interfaces";

const initQueue = () => {
    let queue: Job[] = [];
    for (let i = 0; i < 100; i++)
        queue.push(() => {return Promise.resolve(i)});

    return queue
}

describe('AsyncPool tests', () => {
    let queue = initQueue();

    test('run', async () => {
        const pool = new AsyncPool();
        await pool.run(
            {threadsCount: 25},
            new ArrayFetcher(queue)
        );

        expect(pool.getStat().maxThread).toBe(25);
    });
});