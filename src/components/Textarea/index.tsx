import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { MdError } from 'react-icons/md';
import { useField, Form, FormikProps, Formik } from 'formik';

import { colorError } from '../../styles/colors';
import { Container, Error } from './styles';

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps> | undefined | null;
}

const Textarea: React.FC<Props> = ({ icon: Icon, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [field, meta, helpers] = useField(rest);

  const handleInpuFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!field.value.length);
  }, [field]);

  return (
    <Container
      isFocused={isFocused}
      isFilled={isFilled}
      isError={!!(meta.touched && meta.error)}
    >
      {Icon && <Icon size={20} />}
      <textarea
        rows={3}
        {...field}
        onFocus={handleInpuFocus}
        onBlur={handleInputBlur}
        {...rest}
      />

      {meta.touched && meta.error ? (
        <Error>
          <MdError color={colorError} size={18} />
          <span>{meta.error}</span>
        </Error>
      ) : null}
    </Container>
  );
};

export default Textarea;
