const Promise = require('bluebird');
const transformationDelay = 2000; // in milliseconds
const batchIntervalDelay = 500; // in milliseconds
const batchSize = 4;

function getAccountIdsFromDb(){
    return Promise.resolve([1,2,3,4,5,6,7,8,9,10]);
}

function transformAccountId(accountId){
    return new Promise((resolveCallback, rejectCallback) => {
        // simulate that transformation of an accountId takes about `transformationDelay` milliseconds
        setTimeout(() => {
            const transformedAccount = `The account ID: ${accountId}`;
            console.log(transformedAccount);
            resolveCallback(transformedAccount);
        }, transformationDelay)
    })
}

// this is where we make our rate-limited calls
const result = getAccountIdsFromDb()
    .map(
        (accountId) => {
            // ensure a delay of `batchIntervalDelay` milliseconds between subsequent calls to transformAccountId()
            return transformAccountId(accountId).delay(batchIntervalDelay)
        },
        {concurrency: batchSize} // ensure that no more than `batchSize` number of items are processed at a time
    )

result.then((allValues) => {
    console.log(allValues);
})
