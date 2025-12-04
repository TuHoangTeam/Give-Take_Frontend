## 🧪 Testing Guide

This project utilizes **Jest** and **React Native Testing Library** to ensure the reliability of UI components and application logic. The testing pipeline is also integrated with **SonarCloud** for static code analysis.

> **Note:** Ensure you are in the `App` directory before running these commands.
> ```bash
> cd App
> ```

### 1. Run Unit Tests

Execute all test suites to verify functionality.

```bash
npm run test
```


This command will:


- Execute all test files inside the `__tests__/` directory
- Display pass/fail results in the terminal
- Automatically watch file changes in development mode


### 2. Run tests with coverage report


```bash
npm run test:coverage
```


This command will:


- Generate a **coverage report**
- Export results to:


```
coverage/
└── index.html
```


You can open `coverage/index.html` in your browser to view a detailed coverage dashboard (statements, branches, functions, lines).
