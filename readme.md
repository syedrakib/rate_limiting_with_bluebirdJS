You have a list/array of items on which you want to perform some processing.

But you do not want to process ALL of them at the SAME time to avoid hitting any rate-limit/throttling etc.

You want to process all of those items - but **in batches** of 4 items at a time.

You want to ensure there is a pause/delay of at least 500 milliseconds **between each batch** being processed.

You want to ensure a batch is sent **only after** the previous batch of items has completed returning the results.

    git clone <git_repo_url>
    cd rate_limiting_with_bluebirdJS
    npm install
    node index.js
