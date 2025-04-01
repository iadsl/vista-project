import React from 'react';

const Modal = ({ isOpen, onClose, areaName }) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#1a2038',
          borderRadius: '8px',
          padding: '30px',
          maxWidth: '500px',
          width: '80%',
          border: '1px solid #3066be',
          boxShadow: '0 0 30px rgba(64, 169, 255, 0.3)',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#aaa'
          }}
          onClick={onClose}
        >
          ×
        </button>
        <h2 
          style={{ 
            fontSize: '28px', 
            marginBottom: '20px',
            color: '#4fa9ff' 
          }}
        >
          Chicago Community Area
        </h2>
        <h1 
          style={{ 
            fontSize: '38px', 
            margin: '10px 0 20px',
            color: 'white',
            textShadow: '0 0 10px rgba(79, 169, 255, 0.5)'
          }}
        >
          {areaName}
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#ccc' }}>
          This is one of Chicago's 77 designated community areas. These areas were defined by sociologists 
          at the University of Chicago in the 1920s and serve as the city's official statistical and planning divisions.
        </p>
      </div>
    </div>
  );
};

export default Modal;