# Literate Programming Workflow

All framework code in `packages/eda-core` is generated from the Org-mode files in this directory.

To build the source code, run the following command from the root of the project:

```bash
pnpm tangle
```

This will tangle the `.org` files and generate the TypeScript source code in the `packages/eda-core/src` directory.
