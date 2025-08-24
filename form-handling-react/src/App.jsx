import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Form Handling Demo</h1>

      <section style={{ padding: '1rem', border: '1px solid #ddd', marginBottom: '1rem', borderRadius: 6 }}>
        <h2>1. Controlled Components (RegistrationForm)</h2>
        <RegistrationForm />
      </section>

      <section style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: 6 }}>
        <h2>2. Formik + Yup (formikForm.js)</h2>
        <FormikForm />
      </section>
    </div>
  );
}

export default App;
