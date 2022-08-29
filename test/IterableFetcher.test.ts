import {IterableFetcher} from "../IterableFetcher"
import {PromisePool} from "../PromisePool";

describe('IterableFetcher tests', () => {
    const pool = new PromisePool();

    test('nextJob', async () => {
        const fetcher = new IterableFetcher([
            () => {return {id: 1, promise: Promise.resolve(1)}},
            () => {return {id: 2, promise: Promise.resolve(2)}},
            () => {return {id: 3, promise: Promise.resolve(3)}},
        ]);

        expect(fetcher.nextJob(pool)).toBe(true);
        expect(fetcher.nextJob(pool)).toBe(true);
        expect(fetcher.nextJob(pool)).toBe(true);
        expect(fetcher.nextJob(pool)).toBe(false);
        expect(pool.getJobs().length).toBe(3);
    });
});