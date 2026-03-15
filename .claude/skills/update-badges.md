# Update README Badges

Update the version badges in README.md to match the current versions in package.json.

## Instructions

1. Read the `package.json` file to get the current versions of dependencies
2. Read the `README.md` file
3. Update the shields.io badge URLs with the new versions for these libraries:
   - **React**: from `dependencies.react` (remove ^ prefix)
   - **TypeScript**: from `devDependencies.typescript` (remove ~ or ^ prefix)
   - **Vite**: from `devDependencies.vite` (remove ^ prefix)
   - **Leaflet**: from `dependencies.leaflet` (remove ^ prefix)
   - **React Leaflet**: from `dependencies.react-leaflet` (remove ^ prefix)

4. Also update the versions in the "Tech Stack" table in the README

## Badge Format

Badges use this format:
```
![Name](https://img.shields.io/badge/Name-VERSION-COLOR?logo=LOGO&logoColor=white)
```

Colors:
- React: 61DAFB
- TypeScript: 3178C6
- Vite: 646CFF
- Leaflet: 199900
- React Leaflet: 61DAFB

## Example

If package.json has:
```json
{
  "dependencies": {
    "react": "^20.0.0",
    "leaflet": "^2.0.0",
    "react-leaflet": "^6.0.0"
  },
  "devDependencies": {
    "typescript": "~6.0.0",
    "vite": "^9.0.0"
  }
}
```

Update README badges to:
```markdown
![React](https://img.shields.io/badge/React-20.0.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-9.0.0-646CFF?logo=vite&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-2.0.0-199900?logo=leaflet&logoColor=white)
![React Leaflet](https://img.shields.io/badge/React_Leaflet-6.0.0-61DAFB?logo=react&logoColor=white)
```

And update the Tech Stack table accordingly.

After updating, confirm the changes made.
