# React Todo (mini exercise)


A small React Todo example used for learning component design and testing with Jest + React Testing Library.

Contents

- A simple `TodoList` component with add / toggle / delete behavior.
- `AddTodoForm` small controlled form used by the list.
- Unit tests using Jest and React Testing Library located under `src/__tests__/`.

Quick start

1. Install dependencies:

```bash
npm install
```

1. Run the dev server:

```bash
npm run dev
```

1. Run tests:

```bash
npm test
```

What to look for

- `src/components/TodoList.jsx`: main component. It exposes the UI and internal state for todos and is the subject of the tests.
- `src/components/AddTodoForm.jsx`: small form with `data-testid` attributes used by tests to add new todos.
- `src/__tests__/TodoList.test.jsx`: tests cover initial render, adding an item, toggling a checkbox, and deleting an item.

Notes

- Tests run with Jest (v29) and rely on Babel transform config (`babel.config.js`) and `jest.config.cjs` to provide a jsdom environment and JSX support.
- If tests fail with JSX parsing errors, check that `babel-jest`, `@babel/preset-react`, and `jest-environment-jsdom` are installed and that versions are compatible with `jest`.
