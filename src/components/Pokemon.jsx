import { useEffect, useRef } from 'react'
import { useShowModal } from '../context/ShowModalContext';


const Pokemon = ({data, index}) => {
  const { handleModal} = useShowModal()

  const refElement = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refElement.current && !refElement.current.contains(event.target)) {
        // Lógica que deseas ejecutar cuando se hace clic fuera del elemento
        handleModal(index, 'cerrar')
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='modal__container'>
      <div className='modal__card' ref={refElement}>
        <h4>{data.species.name.toUpperCase()}</h4>
        <div className='modal__card__images__contain'>
          <section className='modal__card__images'>
            <article>
              <p>Male</p>
              <img src={data.sprites.front_default} alt="don't found" />
            </article>
            <article>
              <p>Female</p>
              <img src={data.sprites.front_female} alt="don't found" />
            </article>
          </section>
          <section className='modal__card__images'>
            <article>
              <p>M. shiny</p>
              <img src={data.sprites.front_shiny} alt="don't found" />
            </article>
            <article>
              <p>F. shiny</p>
              <img src={data.sprites.front_shiny_female} alt="don't found" />
            </article>
          </section>
        </div>
        <section className='modal__card__info'>
          <article>
            <h5>Height: </h5>
            <p>{data.height}</p>
          </article>
          <article>
            <h5>Weight: </h5>
            <p>{data.weight}</p>
          </article>
        </section>
        <div className='modal__card__types'>
          <section>
            <h4>Types: </h4>
            <div>
              {data.types.length >0?data.types.map((item, index) => (
                <div key={index}>{item.type.name}</div>
              )): ""}
            </div>
          </section>
          <section>
            <h4>Abilities: </h4>
            <div>
              {data.abilities.length >0?data.abilities.map((item, index) => (
                <div key={index}>{item.ability.name}</div>
              )): ""}
            </div>
          </section>
        </div>
        <table className='modal__table'>
          <thead>
            <tr >
              <th>Stats base</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PS</td>
              <td>{data.stats[0].base_stat}</td>
            </tr>
            <tr>
              <td>Attack</td>
              <td>{data.stats[1].base_stat}</td>
            </tr>
            <tr>
              <td>Defense</td>
              <td>{data.stats[2].base_stat}</td>
            </tr>
            <tr>
              <td>Special at.</td>
              <td>{data.stats[3].base_stat}</td>
            </tr>
            <tr>
              <td>Special def.</td>
              <td>{data.stats[4].base_stat}</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{data.stats[5].base_stat}</td>
            </tr>
          </tbody>
        </table>
        <span className="material-symbols-outlined modal__close" onClick={() => handleModal(index, 'cerrar')}>close</span>
      </div>
    </div>
  )
}

export default Pokemon