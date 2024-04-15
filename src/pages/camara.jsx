import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import image1 from '../assets/image/ConfusionMatrix.png';
import image2 from '../assets/image/Loss.png';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const [predictedClass, setPredictedClass] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    axios.post('http://54.158.203.16/guardar-imagen', { imageData: imageSrc })
      .then(response => {
        console.log(response.data);
        setPredictedClass(response.data.predictedClass);
      })
      .catch(error => {
        console.error('Error al enviar la imagen al servidor:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      /><br/>
      <button onClick={capture}>Capturar Foto</button>
      {predictedClass && (
        <p>Clase predicha: {predictedClass}</p>
      )}

      <div >
        <h2 style={{ marginTop:'0.5cm', marginBottom:'0.5cm'}}>Resultados gráficos</h2>
        <img className="md:w-72 md:h-60 lg:w-96 lg:h-72 xl:w-5/6 xl:h-5/6" src={image1} alt="Gráfico 1"/> <br />
        <img className="md:w-72 md:h-60 lg:w-96 lg:h-72 xl:w-5/6 xl:h-5/6" src={image2} alt="Gráfico 2"/>
      </div>
    </div>
  );
};

export default CameraComponent;
