import React, { useState } from 'react';

const ContactInfoForm = ({ goToNextStep }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [socialLinks, setSocialLinks] = useState([{ platform: 'facebook', nickname: '' }]);

  const handleAddSocial = () => {
    setSocialLinks([...socialLinks, { platform: 'facebook', nickname: '' }]);
  };

  const handleChangeSocial = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      phone,
      email,
      socialLinks,
    };

    console.log("Submitted Data:", formData); 
    
    goToNextStep();
  };

  return React.createElement('form', { onSubmit: handleSubmit },
    React.createElement('h1', null, 'Profile Info'),
    React.createElement('p', { className: 'form-description' },
      'Fill in the data for profile. It will take a couple of minutes. ',
      React.createElement('br'),
      'You only need a passport.'
    ),
    React.createElement('h2', null, 'Contact'),
    React.createElement('p', { className: 'form-description' }, 'These contacts are used to inform about orders'),
    React.createElement('input', { 
      type: 'tel', 
      value: phone, 
      onChange: (e) => setPhone(e.target.value), 
      placeholder: 'Enter your phone number', 
      required: true 
    }),
    React.createElement('input', { 
      type: 'email', 
      value: email, 
      onChange: (e) => setEmail(e.target.value), 
      placeholder: 'Enter your email', 
      required: true 
    }),
    React.createElement('h2', null, 'Social Media'),
    React.createElement('p', null, 'Indicate the desired communication method'),
    socialLinks.map((social, index) =>
      React.createElement('div', { key: index, className: 'social-input' },
        React.createElement('select', { 
          value: social.platform, 
          onChange: (e) => handleChangeSocial(index, 'platform', e.target.value), 
          required: true 
        },
          React.createElement('option', { value: 'facebook' }, 'Facebook'),
          React.createElement('option', { value: 'twitter' }, 'Twitter'),
          React.createElement('option', { value: 'instagram' }, 'Instagram')
        ),
        React.createElement('input', { 
          type: 'text', 
          value: social.nickname, 
          onChange: (e) => handleChangeSocial(index, 'nickname', e.target.value), 
          placeholder: 'Your nickname', 
          required: true 
        })
      )
    ),
    React.createElement('button', { type: 'button', onClick: handleAddSocial }, 'Add More'),
    React.createElement('button', { type: 'submit' }, 'Go Next')
  );
};

export default ContactInfoForm;
