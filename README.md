# Product Demo Split Workspace

This workspace has been separated into 2 independent projects so you can move each one into its own Git repository:

- [web/README.md](/Users/11482452/Demo-automation/product-demo/web/README.md)
- [automation/README.md](/Users/11482452/Demo-automation/product-demo/automation/README.md)

## Structure

```text
product-demo/
├── web/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── README.md
└── automation/
    ├── tests/
    ├── playwright.config.ts
    ├── package.json
    └── README.md
```

## Suggested Repository Split

- Web repository: `product-demo-web`
- Automation repository: `product-demo-automation`

## How To Move Each Folder To A New Repository

### Web

```bash
cd web
git init
git add .
git commit -m "Initial commit: product demo web"
git branch -M main
git remote add origin <your-web-repository-url>
git push -u origin main
```

### Automation

```bash
cd automation
git init
git add .
git commit -m "Initial commit: product demo automation"
git branch -M main
git remote add origin <your-automation-repository-url>
git push -u origin main
```

## Local Development Flow After Split

1. Start the Angular app from `web`
2. Run Playwright tests from `automation`

Example:

```bash
cd web
npm install
npm start
```

Open another terminal:

```bash
cd automation
npm install
npm run playwright:install
npm test
```
