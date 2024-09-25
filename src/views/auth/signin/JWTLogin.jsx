// react-bootstrap
import { Alert, Button, Col, Row } from 'react-bootstrap';

// third party
import axios from 'axios';
import { LOGIN_API_URL } from 'config/api';
import { Formik } from 'formik';
import * as Yup from 'yup';

const JWTLogin = () => {
  const handleLogin = async (values, { setErrors, setSubmitting }) => {
    try {
      let request = {
        user: values.email,
        pass: values.password,
        role: values.role,
      };
      // console.log(LOGIN_API_URL, request);
      const response = await axios.post(LOGIN_API_URL, request);

      console.log('Login successful', response.data);

      if (response.data.status) {
        if(response.data.auth){
        sessionStorage.setItem('authToken', JSON.stringify(response.data.data));
        window.location.href = '/phintexAdmin/dashboard';
        }else{
          setErrors({ submit: response.data.msg });
        }
      } else {
        setErrors({ submit: 'Invalid email or password. Please try again.' });
      }
    } catch (error) {
      console.error('Login error', error);
      setErrors({ submit: 'An error occurred. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          role: Yup.string().max(255).required('Role is required'),
        })}
        onSubmit={handleLogin}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
              <select
                className="form-control"
                name="role"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.role}
              >
                <option value={''}>Select Role</option>
                <option value={'0'}>Super Admin</option>
                <option value={'1'}>Staff</option>
                <option value={'2'}>Admin</option>
              </select>
              {touched.role && errors.role && <small className="text-danger form-text">{errors.role}</small>}
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                name="email"
                placeholder="Enter your email address"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
              />
              {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                name="password"
                placeholder="Enter your password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
              />
              {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

            <Row>
              <Col>
                <Button className="btn-block mb-4" disabled={isSubmitting} size="large" type="submit" variant="primary">
                  Sign in
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>

      <hr />
    </>
  );
};

export default JWTLogin;
