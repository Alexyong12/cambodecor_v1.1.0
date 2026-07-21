import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Keep components dumb: no floating promises hiding fetch logic in JSX.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      // Enforce feature encapsulation: import features only via their barrel.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/*"],
              message:
                "Import from the feature barrel (@/features/<name>) instead of reaching into its internals.",
            },
          ],
        },
      ],
    },
  },
  prettier,
);
