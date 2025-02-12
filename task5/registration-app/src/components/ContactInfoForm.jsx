import React, { useState } from 'react';

const ContactInfoForm = ({ goToNextStep }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [socialLinks, setSocialLinks] = useState([{ platform: 'facebook', nickname: '' }]);
  
  // Стейти для повідомлень про помилки
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  // Масив повідомлень про помилки для кожного socialLink
  const [socialErrors, setSocialErrors] = useState(['']);

  const handleAddSocial = () => {
    setSocialLinks([...socialLinks, { platform: 'facebook', nickname: '' }]);
    setSocialErrors([...socialErrors, '']);
  };

  const handleChangeSocial = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);

    // Якщо редагується нікнейм, очищаємо помилку для цього поля
    if (field === 'nickname') {
      const updatedSocialErrors = [...socialErrors];
      updatedSocialErrors[index] = '';
      setSocialErrors(updatedSocialErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    // Валідація номера телефону
    if (!phone) {
      setPhoneError("Enter your phone number.");
      isValid = false;
    } else {
      const digitsOnly = phone.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        setPhoneError("Phone number must contain at least 10 digits.");
        isValid = false;
      } else {
        setPhoneError('');
      }
    }

    // Валідація email
    if (!email) {
      setEmailError("Enter your email address.");
      isValid = false;
    } else {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        setEmailError("Enter a valid email address.");
        isValid = false;
      } else {
        setEmailError('');
      }
    }

    // Валідація кожного socialLink (нікнейм)
    const updatedSocialErrors = [];
    socialLinks.forEach((social, index) => {
      if (!social.nickname || social.nickname.trim() === '') {
        updatedSocialErrors[index] = "Nickname is required.";
        isValid = false;
      } else {
        updatedSocialErrors[index] = "";
      }
    });
    setSocialErrors(updatedSocialErrors);

    if (!isValid) {
      return;
    }

    const formData = {
      phone,
      email,
      socialLinks,
    };

    console.log("Submitted Data:", formData);
    goToNextStep();
  };

  return React.createElement(
    'form',
    { onSubmit: handleSubmit },
    React.createElement('h1', null, 'Profile Info'),
    React.createElement(
      'p',
      { className: 'form-description' },
      'Fill in the data for profile. It will take a couple of minutes. ',
      React.createElement('br'),
      'You only need a passport.'
    ),
    React.createElement('h2', null, 'Contact'),
    React.createElement(
      'p',
      { className: 'form-description' },
      'These contacts are used to inform about orders'
    ),
    React.createElement('input', {
      type: 'tel',
      value: phone,
      onChange: (e) => {
        setPhone(e.target.value);
        if (phoneError) setPhoneError('');
      },
      placeholder: 'Enter your phone number',
      required: true,
    }),
    phoneError &&
      React.createElement(
        'span',
        { style: { color: 'red' } },
        phoneError
      ),
    React.createElement('input', {
      type: 'email',
      value: email,
      onChange: (e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError('');
      },
      placeholder: 'Enter your email',
      required: true,
    }),
    emailError &&
      React.createElement(
        'span',
        { style: { color: 'red' } },
        emailError
      ),
    React.createElement('h2', null, 'Social Media'),
    React.createElement(
      'p',
      null,
      'Indicate the desired communication method'
    ),
    socialLinks.map((social, index) =>
      React.createElement(
        'div',
        { key: index, className: 'social-input' },
        React.createElement(
          'select',
          {
            value: social.platform,
            onChange: (e) =>
              handleChangeSocial(index, 'platform', e.target.value),
            required: true,
          },
          React.createElement('option', { value: 'facebook' }, 'Facebook'),
          React.createElement('option', { value: 'twitter' }, 'Twitter'),
          React.createElement('option', { value: 'instagram' }, 'Instagram')
        ),
        React.createElement('input', {
          type: 'text',
          value: social.nickname,
          onChange: (e) =>
            handleChangeSocial(index, 'nickname', e.target.value),
          placeholder: 'Your nickname',
          required: true,
        }),
        socialErrors[index] &&
          React.createElement(
            'span',
            { style: { color: 'red' } },
            socialErrors[index]
          )
      )
    ),
    React.createElement(
      'button',
      { type: 'button', onClick: handleAddSocial },
      'Add More'
    ),
    React.createElement(
      'button',
      { type: 'submit' },
      'Go Next'
    )
  );
};

export default ContactInfoForm;
