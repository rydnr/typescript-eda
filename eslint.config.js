import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/node_modules/",
      "**/dist/",
      "**/coverage/",
      "**/temp/",
      "**/.vitepress/cache/",
      "**/.nuxt/",
      "**/.vercel/",
      "**/.changeset/",
      "**/.idea/",
      "**/__snapshots__/",
      "**/po/",
      "**/l10n/",
      "**/assets/",
      "**/public/",
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  ...tseslint.configs.recommended,
];
