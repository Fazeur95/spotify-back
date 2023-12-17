import React from 'react';
import './ErrorElement.css'; // Assurez-vous que le chemin est correct

function ErrorElement() {
  return (
    <div className='error-container'>
      <h1 className='error-code'>404</h1>
      <p className='error-message'>
        Ooooops, nous ne pouvons pas trouver cette page.
      </p>
    </div>
  );
}

export default ErrorElement;
