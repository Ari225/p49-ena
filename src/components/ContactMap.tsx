
import React from 'react';

const ContactMap = () => {
  return (
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4056.758616049439!2d-3.7546455015293687!3d5.219927686999032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1f9f7da70fe47%3A0xd7100a80304d386f!2sP49%20ENA!5e0!3m2!1sfr!2sci!4v1751476544164!5m2!1sfr!2sci" 
      width="100%" 
      height="100%" 
      style={{ border: 0 }} 
      allowFullScreen 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade"
      title="Siège de la P49 ENA"
      className="w-full h-full"
    />
  );
};

export default ContactMap;
