# Update Version Badge

Update the version badge in README.md to match the current version in package.json.

## Instructions

1. Read `package.json` and extract the `version` field
2. Read `README.md`
3. Update the version badge URL with the new version

## Badge Format

The version badge uses this format:
```
![Version](https://img.shields.io/badge/Version-X.X.X-blue?style=flat-square)
```

## Example

If package.json has:
```json
{
  "version": "1.2.0"
}
```

Update the README badge to:
```markdown
![Version](https://img.shields.io/badge/Version-1.2.0-blue?style=flat-square)
```

## When to Run

Run this skill after:
- Incrementing the version in package.json
- Running `npm version` or `pnpm version` commands

After updating, confirm the version change was applied.

## Auto Release

When the version in package.json is higher than the latest GitHub release, a new release is automatically created on push to main. The release includes:
- Built distribution zip file
- Auto-generated release notes from commits
