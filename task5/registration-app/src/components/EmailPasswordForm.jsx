import React from 'react';
import { useForm } from 'react-hook-form';

const EmailPasswordForm = ({ goToNextStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
    // Якщо форма пройшла валідацію, переходимо до наступного кроку
    if (data.email && data.password) {
      goToNextStep();
    }
  };

  return React.createElement(
    'div',
    { id: 'email-password-form' },
    React.createElement(
      'form',
      { onSubmit: handleSubmit(onSubmit) },
      React.createElement(
        'label',
        { htmlFor: 'email' },
        'Enter your email'
      ),
      React.createElement('input', {
        type: 'email',
        id: 'email',
        placeholder: 'example@example.com',
        ...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Enter a valid email address',
          },
        }),
      }),
      errors.email &&
        React.createElement('span', { style: { color: 'red' } }, errors.email.message),
      React.createElement(
        'label',
        { htmlFor: 'password' },
        'Enter your password'
      ),
      React.createElement('input', {
        type: 'password',
        id: 'password',
        placeholder: '********',
        ...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        }),
      }),
      errors.password &&
        React.createElement('span', { style: { color: 'red' } }, errors.password.message),
      React.createElement(
        'button',
        { type: 'submit' },
        'Next'
      )
    )
  );
};

export default EmailPasswordForm;
