import {AsyncPool} from "../AsyncPool";
import {IterableFetcher} from "../IterableFetcher"
import {Job} from "../Interfaces";

const initQueue = () => {
    let queue: Job[] = [];
    for (let i = 0; i < 100; i++)
        queue.push(() => {return {id: i, promise: Promise.resolve(i)}});

    return queue
}

describe('AsyncPool tests', () => {
    let queue = initQueue();

    test('run', async () => {
        const pool = new AsyncPool();
        await pool.run(
            {threadsCount: 25},
            new IterableFetcher(queue)
        );

        expect(pool.getStat().maxThread).toBe(25);
    });
});