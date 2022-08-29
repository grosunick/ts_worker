import {from} from "../Factory";

const getJobPromise = (val: number, time: number): Promise<number> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(val);
            resolve(val);
        }, time);
    });
}

const getResult = (val: number, time: number) => {
    return {
        id: val,
        promise: getJobPromise(val, time)
    }
}

(async () => {
    console.log('test 1:');
    await from([
        () => getResult(1, 500),
        () => getResult(2, 500),
        () => getResult(3, 500),
        () => getResult(4, 500),
    ], {threadsCount: 1});

    console.log('test 2:');
    await from([
        () => getResult(1, 2000),
        () => getResult(2, 2000),
        () => getResult(3, 2000),
        () => getResult(4, 2000),
    ], {threadsCount: 2});

    console.log('test 3:');
    await from([
        () => getResult(1, 1000),
        () => getResult(2, 1000),
        () => getResult(3, 1000),
        () => getResult(4, 1000),
        () => getResult(5, 1000),
        () => getResult(6, 1000),
        () => getResult(7, 1000),
        () => getResult(8, 1000),
        () => getResult(9, 1000),
        () => getResult(10, 1000),
        () => getResult(11, 1000),
        () => getResult(12, 1000),
        () => getResult(13, 1000),
        () => getResult(14, 1000),
        () => getResult(15, 1000),
    ], {threadsCount: 10});
})();


