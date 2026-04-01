## How to connect my web app with Algorand smart contracts?

The following folder is reserved for the Algorand Application Clients. The clients are used to interact with deployed Algorand Smart Contracts (ASC1s) from frontend code.

To generate typed clients into this folder:

1. Run `algokit generate client -l typescript -o {path/to/this/folder}` or use `algokit project link` from the workspace root.
2. Import the generated client into your frontend code when you extend or replace the current `projects/algohack-frontend/index.html` implementation.

> The current frontend entrypoint is `projects/algohack-frontend/index.html`, which is implemented as a standalone static page. Generated typed clients can be added later if you migrate to a more advanced contract integration.

## How to interact with the smart contract

A generated typed client provides functions that map to ABI methods on your smart contract. For example, if the contract exposes `hello`, the generated client will expose a corresponding `hello` function for use in the frontend.

Refer to [AlgoKit documentation](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/project/link.md) for details on the `link` command.
