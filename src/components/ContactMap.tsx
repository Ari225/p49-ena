
import React from 'react';

const ContactMap = () => {
  return (
    <div className="h-48 rounded-lg overflow-hidden border">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.2158425278203!2d-3.9770003259602937!3d5.384033735356967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1932cf7029b39%3A0x79bb432471bc9bb1!2sZAX%20Services!5e0!3m2!1sfr!2sci!4v1748524514610!5m2!1sfr!2sci" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Localisation du Siège de la P49"
      />
    </div>
  );
};

export default ContactMap;
