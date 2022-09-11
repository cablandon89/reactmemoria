import {useState, useEffect} from 'react'
import './App.css';
import icons from './data';

function App() {
  const [prenivel,setPrenivel] = useState(0);
  const [nivel,setNivel] =useState(null)
  const [prevSelected,setPrevSelected] = useState(null);
  const [cartas,setCartas] = useState(null);
  const [cardData,setCardData] = useState([]);
  const [mensajeRespuesta,setMensajeRespuesta] = useState(false);
  

  const changeColor = (index) => {
    if(cardData[index].status !== "up" && !mensajeRespuesta){
      cardData[index].status = "selected";
      setCardData([... cardData]);
      if(prevSelected === null){
        setPrevSelected(index);
      }else{
        setMensajeRespuesta(true);

        //Comparar
        if(cardData[prevSelected].icon == cardData[index].icon ){
          cardData[prevSelected].status = "up"
          cardData[index].status = "up"
          setPrevSelected(null);
          setMensajeRespuesta(false);
        }else{
          //Volver a tapar ambas tarjetas esperar 2 segundos
          setTimeout(() =>{
            cardData[prevSelected].status = "down"
            cardData[index].status = "down"
            setPrevSelected(null);
            setMensajeRespuesta(false);
          },500)
        }
      }
    }

  }


  const llenarIcons = () => {
      if(cardData.length < (cartas)){
      let otrand = null;
      for (let index = 0; index < (cartas); index++) {
        let rand = Math.floor(Math.random()*60);
        if(!(cardData.find(elemento => elemento.icon == rand))){
          if(otrand == null){
            otrand = rand;
          }else{
            rand = otrand;
            otrand = null;
          }
          const item = {icon:rand, status:"down" }
          cardData.push(item);
          // cardData.push(item);
          setCardData([... cardData]);
        }else{
          index = index -1;
        }
      }
    }
    cardData.sort(()=> Math.random() - 0.5);
    setCardData([... cardData]);
  }

  const empezar = () => {
    setCartas(18 + (6*prenivel));
    setNivel(prenivel);
  }

  const regresar = () => {
    setCartas(null)
    setNivel(null)
    setPrenivel(0);
    setCardData([]);
  }

  useEffect(() => {
    llenarIcons(); 
  },[nivel])


  return (
    <div className="App">
        <div className={(mensajeRespuesta)?'mensajeRespuesta':''}>
          {/* <h1>Correcto <i className={`icon fa-solid fa-face-smile`}></i></h1> */}
        </div>
      <header className="App-header">

        <h1>Juego de memoria</h1>
        {
          (nivel === null)?
          <>
            <h1>Seleccione dificultad</h1>
            <select className="select" onChange={(e) => setPrenivel(e.target.value)}>
              <option value="0">Coquito</option>
              <option value="1">Memoria a corto plazo</option>
              <option value="2">Medio me acuerdo</option>
              <option value="3">Buena memoria</option>
              <option value="4">Memoria fotográfica</option>
            </select>
            <button type="button" className="btn" onClick={() => empezar() }>Empezar <i className={`fa fa-gamepad`}></i></button>
          </>
          :
          <>
            <div className="wrapper" style={{gridTemplateColumns: `repeat(${(cartas)/6}, 1fr)`}}>
            {
            cardData.map((icon, index) => (
              <div key={index} className={`card ${icon.status}`} onClick={() => changeColor(index)} >
                {
                  (icon.status !== "down") &&
                    <i className={`icon fa-solid fa-${icons[icon.icon]} fa-2x`}></i>
                }
              </div>
            ))
            }
          </div>
          <button type="button" className="btn" onClick={() => regresar() }>Regresar <i className={`fa fa-circle-left`}></i></button>
          </>
          

        }
        



      </header>
    </div>
  );
}

export default App;
