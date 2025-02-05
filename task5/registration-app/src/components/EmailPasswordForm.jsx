import React from 'react';
import { useForm } from 'react-hook-form';

const EmailPasswordForm = ({ goToNextStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);

    if (data.email && data.password) {
      goToNextStep();
    } else {
      alert('Please fill in all fields');
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
        ...register('email', { required: 'Email is required' })
      }),
      errors.email && React.createElement('span', null, errors.email.message),
      React.createElement(
        'label',
        { htmlFor: 'password' },
        'Enter your password'
      ),
      React.createElement('input', {
        type: 'password',
        id: 'password',
        placeholder: '********',
        ...register('password', { required: 'Password is required' })
      }),
      errors.password && React.createElement('span', null, errors.password.message),
      React.createElement(
        'button',
        { type: 'submit' },
        'Next'
      )
    )
  );
};

export default EmailPasswordForm;
