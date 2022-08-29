import {PromisePool} from '../PromisePool'

describe('PromisePool tests', () => {
    test('empty', () => {
        const pool = new PromisePool();
        expect(pool.length()).toBe(0)
    });

    test('add', () => {
        const pool = new PromisePool();
        pool.add(1, Promise.resolve(1));
        pool.add(2, Promise.resolve(1));

        expect(pool.length()).toBe(2);
        expect(pool.getPromises()).toEqual({1: Promise.resolve(1), 2: Promise.resolve(1)});
    });

    test('delete', () => {
        const pool = new PromisePool();
        pool.add(1, Promise.resolve(1));
        pool.add(2, Promise.resolve(1));
        pool.add(3, Promise.resolve(1));

        pool.delete(1);

        expect(pool.length()).toBe(2);
        expect(pool.getPromises()).toEqual({2: Promise.resolve(1), 3: Promise.resolve(1)});
    });
});