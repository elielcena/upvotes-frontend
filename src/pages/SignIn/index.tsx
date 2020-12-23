import React, { useState, useContext } from 'react';
import { MdPeople } from 'react-icons/md';
import { Form, FormikProps, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/AuthContext';

interface Values {
  name: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
});

const SignIn: React.FC = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
  });
  const [loading, setLoading] = useState(false);

  const { user, signIn } = useAuth();

  async function handleSubmit(values: Values) {
    try {
      setLoading(true);
      const { name } = values;
      await signIn({ name });
    } catch (err) {
      const error = err.response.data.message;
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Content>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<Values>) => (
            <Form>
              <h3>Faça seu login</h3>

              {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
              <label htmlFor="name">Nome</label>
              <Input id="name" icon={MdPeople} name="name" maxLength={11} />

              <Button width={340} loading={loading} type="submit">
                Entrar
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
