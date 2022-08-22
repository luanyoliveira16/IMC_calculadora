import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import {useState} from 'react';
import { levels, calculateImc, Level} from './helpers/imc';
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png';


const App = () => {

  const [heightField, setHeightField] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [showItem, setShowItem] = useState < Level | null> (null);

  const handleCalculateButton = () => {
    if(heightField && weight) {
      setShowItem(calculateImc(heightField, weight));
    }else{
      alert("Preencha os campos")
    }
  }

  const handleBackButton = () => {
    setShowItem(null);
    setWeight(0);
    setHeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt='' width="150"/>
        </div>
      </header>
      
      <div className={styles.container}>
        <div className={styles.leftSide}>
           <h1>Calcule o seu IMC</h1>
           <p>
            IMC é a sigla para índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.
           </p>

           <input
              type="number"
              placeholder="Digite a sua altura. Ex: 1.5(em metros)"
              value={heightField > 0 ? heightField : ''}
              onChange={e => setHeightField(e.target.valueAsNumber)}
           />
           
           <input
              type="number"
              placeholder="Digite o seu peso. Ex: 75.3(em kg)"
              value={weight > 0 ? weight : ''}
              onChange={e => setWeight(e.target.valueAsNumber)}
           />

           <button onClick={handleCalculateButton}>Calcular</button>


        </div>
        <div className={styles.rightSide}>
          {!showItem &&
           <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
           </div>
          }
          {showItem &&
             <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick = {handleBackButton}>
                <img src={leftArrowImage} alt='' width={25} className={styles.arrow}/>
              </div>
                 <GridItem item={showItem}/>
             </div>
          }
        </div>
      </div>

    </div>
  );
}

export default App;