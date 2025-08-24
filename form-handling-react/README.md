# Form Handling in React

Simple demo for the assignment: Routers, Data handling, Forms and Testing in React.

```bash
npm install formik yup --save
```

2. Start dev server

```bash
npm run dev
```

Open the app at [http://localhost:5173/](http://localhost:5173/) and try both forms.

## Controlled vs Formik (short)

- Controlled components: you use `useState` and handle input updates and validation manually. Good for small forms and when you want full control.
- Formik + Yup: Formik manages form state and submit flow; Yup provides declarative validation. Better for larger or more complex forms.
