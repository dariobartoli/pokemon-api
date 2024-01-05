import React, { createContext, useContext, useState } from 'react';

// Creamos un contexto para showModal y su función de actualización
const ShowModalContext = createContext();

// Creamos un componente proveedor que envuelve nuestra aplicación
export const ShowModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState([]);
  const handleModal = (index, accion) => {
    setShowModal(prevShowModal => {
            const newShowModal = [...prevShowModal]; // Crear una copia del estado previo
            if (accion === 'abrir') {
                newShowModal[index] = true;
            }
            if (accion === 'cerrar') {
                newShowModal[index] = false;
            }
            return newShowModal; // Devolver el nuevo estado actualizado
        });
    }

  return (
    <ShowModalContext.Provider value={{ showModal, setShowModal, handleModal }}>
      {children}
    </ShowModalContext.Provider>
  );
};

// Creamos un hook personalizado para acceder al contexto
export const useShowModal = () => {
  return useContext(ShowModalContext);
};