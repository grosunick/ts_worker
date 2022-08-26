import {AsyncPool} from "../AsyncPool";
import {ArrayFetcher} from "../fetcher/ArrayFetcher"
import {PromiseId} from "../Interfaces";

const initQueue = () => {
    let queue: Promise<PromiseId>[] = [];
    for (let i = 0; i < 100; i++)
        queue.push(Promise.resolve(i));

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