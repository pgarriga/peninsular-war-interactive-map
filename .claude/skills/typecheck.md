# TypeScript Check

Ensure TypeScript is correctly configured and all code passes type checking.

## Instructions

1. **Run TypeScript compiler check**
   ```bash
   pnpm tsc --noEmit
   ```

2. **If there are errors**, fix them one by one:
   - Read the file with the error
   - Understand the type issue
   - Fix the type error (add types, fix mismatches, etc.)
   - Re-run the check until all errors are resolved

3. **Common fixes**:
   - Add missing type annotations to function parameters
   - Add return types to functions
   - Fix `any` types with proper types
   - Add missing interface properties
   - Fix type mismatches in props

4. **Verify no `.js` files exist in `src/`** that should be `.ts` or `.tsx`:
   ```bash
   find src -name "*.js" -o -name "*.jsx"
   ```
   If found, rename them to `.ts`/`.tsx` and add proper types.

5. **Check for `@ts-ignore` or `@ts-nocheck` comments** and remove them by fixing the underlying type issues:
   ```bash
   grep -r "@ts-ignore\|@ts-nocheck" src/
   ```

6. **Ensure strict mode** is enabled in `tsconfig.json`:
   - `"strict": true`
   - `"noImplicitAny": true`
   - `"strictNullChecks": true`

Report all fixes made and confirm the final typecheck passes.
