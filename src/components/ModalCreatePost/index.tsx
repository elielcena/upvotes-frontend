import React, { useState, HTMLAttributes } from 'react';
import { toast } from 'react-toastify';
import { Form, FormikProps, Formik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

import IPost from '../../interfaces/posts';

import Input from '../Input';
import Textarea from '../Textarea';
import Button from '../Button';
import { colorPrimary } from '../../styles/colors';

import { Container, Content } from './styles';

interface IProps extends HTMLAttributes<HTMLElement> {
  open: boolean;
  post: IPost[];
}

interface Values {
  titulo: string;
  descricao: string;
}

const validationSchema = Yup.object().shape({
  titulo: Yup.string().required('Nome é obrigatório'),
  descricao: Yup.string().required('Descrição é obrigatório'),
});

const ModalCreatePost: React.FC<IProps> = ({ open, onClick, post }) => {
  const { user } = useAuth();

  const [initialValues, setInitialValues] = useState({
    titulo: '',
    descricao: '',
  });

  const [loadCreatePost, setLoadCreatePost] = useState(false);

  async function handleSubmit(values: Values) {
    try {
      setLoadCreatePost(true);

      const { titulo, descricao } = values;

      const postData = {
        titulo,
        descricao,
        username: user.name,
        upvotes: 1,
      };

      const { data } = await api.post('posts', postData);

      addDataToPost(data);
      values.descricao = '';
      values.titulo = '';
      toast.success('Postagem criada com sucesso!');
    } catch (err) {
      const error = err.response.data.message;
      toast.error(error);
    } finally {
      setLoadCreatePost(false);
    }
  }

  function addDataToPost(data: IPost) {
    const postBkp = [];
    postBkp.push(data);
    let i = 0;
    while (i < post.length) {
      postBkp.push(post[i]);
      i++;
    }
    while (post.length) {
      post.pop();
    }
    i = 0;
    while (i < postBkp.length) {
      post.push(postBkp[i]);
      i++;
    }
  }

  return (
    <Container open={open} id="container" onClick={onClick}>
      <Content>
        <h3>Nova Postagem</h3>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<Values>) => (
            <Form>
              <label>Titulo</label>
              <Input icon={null} name="titulo" />

              <label>Descrição</label>
              <Textarea icon={null} name="descricao" />

              <p style={{ width: '100%', marginBottom: 17, fontSize: 12 }}>
                Utilize {'<br/>'} para fazer quebra linha.
              </p>

              <Button width={340} loading={loadCreatePost} type="submit">
                Ok, quero postar!
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default ModalCreatePost;
