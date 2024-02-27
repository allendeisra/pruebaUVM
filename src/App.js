import logo from './logo.svg';
import './App.css';
import { Formik, Form, Field, ErrorMessage} from 'formik'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <center>
       <h1>Register a new account</h1>
       <Formik>
         {({ isSubmitting }) => (
           <Form>
             <Field
               type="text"
               name="fullname"
               placeholder="Nombre completo"
             />
             <ErrorMessage name="fullname" component="div" />

             <Field
               type="email"
               name="email"
               placeholder="correo electrónico"
             />
             <ErrorMessage name="email" component="div" />

             

             <button type="submit" disabled={isSubmitting}>
               Enviar
             </button>
           </Form>
         )}
       </Formik>
     </center>
    </div>
  );
}

export default App;
