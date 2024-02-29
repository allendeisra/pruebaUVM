import React, { useState, useEffect } from 'react'
import './App.css';
import { Formik, Form, Field, ErrorMessage} from 'formik'

//Globales
var JSONdata = []
var count = 0

function App() {
  //Constantes de control 
  const url = `Url: ${window.location}`
  const device = `UA: ${window.navigator.userAgent}`
  const [options, setOptions] = useState([]);
  
  /*Funcion que obtiene la oferta educativa vigente de la API*/
  function getData (){
    fetch('https://uvm.mx/suitev3/get_ofertando_vigente')
          .then(response => response.json())
          .then(data => {
            JSONdata = data
            setOptions([])
            count = 2;
            //console.log(JSONdata.message)
          });
  
  }
  /* Hook que controla el estado del select para que se comporte como async*/ 
  useEffect(() => { 
    if(count == 0 ){
      
      getData() 
      
    }
  }, [options]);
 
   
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <center>
       <h1>Registrar aspirante</h1>
       <Formik
          initialValues={{
              nombre: '', apaterno: '',  email: '', celular: '' , 
              urlreferrer: url, dispositivo: device,
              banner: 'israel',
              CID: '2016705784.1697574806',
              verify_token: 'UVM.G0-24',
              marcable: 1,
              selectValue: '',
              campusLargo : '',
              carrera:'',
              carreraInteres:'',
              subNivelInteres:8,
              nivelInteres:'',
              ciclo:'',
              gclid:'',
              utm_campaign: ''
            
            }}
          validate={values => {
            const errors = {};
            if (!values.nombre) {
              errors.nombre = 'Requerido';
            }
            if (!values.apaterno) {
              errors.apaterno = 'Requerido';
            }
            if (!values.email) {
              errors.email = 'Requerido';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Correo inválido';
            }
            if (!values.celular) {
              errors.celular = 'Requerido';
            } else if (
              !/^[0-9]{10,}$/i.test(values.celular)
            ) {
              errors.celular = 'Teléfono inválido';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            
            values.campusLargo = JSONdata.message[values.selectValue].nombrelargo_campus
            values.carrera = JSONdata.message[values.selectValue].ofertando_crmit_name
            values.carreraInteres = JSONdata.message[values.selectValue].carrerainteres
            values.nivelInteres = JSONdata.message[values.selectValue].crmit_nivelcrm
            values.ciclo = JSONdata.message[values.selectValue].crmit_ciclo
            
            delete values.selectValue

            console.log(values)
            fetch('https://webhooksqa.uvm.mx/proc-leads/lead/medios.php', {
              method: 'POST',
              mode: 'no-cors', 
              body: JSON.stringify(values),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
               .then((response) => response.json())
               .then((data) => {
                  console.log(data);
                  // Handle data
               })
               .catch((err) => {
                  console.log(err.message);
               });

            setSubmitting(false)
          }}       
       >
         {({ 
          values,
          setFieldValue,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
           <Form>
            <div className='FieldBox'>
             <Field
               type="text"
               name="nombre"
               className="Field"
               placeholder="Nombre"
               onChange={handleChange}
               onBlur={handleBlur}
               value={values.nombre}
             />
             <ErrorMessage name="nombre" component="label" />
             </div>
             <br />
             <div className='FieldBox'>
              <Field
               type="text"
               name="apaterno"
               className="Field"
               placeholder="Apellido paterno"
               onChange={handleChange}
               onBlur={handleBlur}
               value={values.apaterno}
             />
             <ErrorMessage name="apaterno" component="label" />
             </div>
             <br />
             <div className='FieldBox'>
              <Field
               type="email"
               name="email"
               className="Field"
               placeholder="Correo electrónico"
               onChange={handleChange}
               onBlur={handleBlur}
               value={values.email}
             /> 
             <ErrorMessage name="email" component="label" />
             </div>
             <br />
             <div className='FieldBox'>
             <Field
               type="celular"
               name="celular"
               className="Field"
               placeholder="Teléfono celular"
               onChange={handleChange}
               onBlur={handleBlur}
               value={values.celular}
             />
             <ErrorMessage name="celular" component="label" />
             </div>
             <br />
             
             <select name="selectValue" value={values.selectValue} 
                onChange={handleChange}
                onBlur={handleBlur}
                className='FieldSelect'
              >
                <option value="">Selecciona la carrera de tu interés</option>
                {JSONdata.message ? JSONdata.message.map((obj, key) => (
                  <option key={obj.rs_id} value={key}>
                    {obj.nombrelargo_campus + ' - ' + obj.ofertando_crmit_name + ' - ' + obj.crmit_modalidad}
                  </option>
                )): null}
              </select>
            

             <br />
             
              <button class="btn" type="submit" disabled={isSubmitting}>
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
