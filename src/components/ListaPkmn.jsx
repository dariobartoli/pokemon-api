import { useState, useEffect} from 'react'
import axios from 'axios'
import Atropos from 'atropos/react';
import 'atropos/css'
import Pokemon from './Pokemon';
import { useShowModal } from '../context/ShowModalContext';



const ListaPkmn = () => {
    const [pokemons, setPokemons] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonData, setPokemonData] = useState([])
    const { showModal, handleModal } = useShowModal()




    useEffect(() => {
        const fetchData = async (page) => {
            try {
                let view
                if(page < 49){
                    view = 21
                }else view = 9
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 21}&limit=${view}`);
                const newData = response.data.results;
                setPokemons(newData);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData(currentPage)
    }, [currentPage])

    useEffect(() => {
        const fetchPokemonDetails = async() => {
            try {
                if (pokemons.length > 0) {
                    const urlPokemon = pokemons.map((pokemon) => pokemon.url);
                    try {
                        const responses = await Promise.all(
                            urlPokemon.map(url => axios.get(url))
                        );
                        // Acceder a los datos de cada respuesta
                        const pokemonDatos = responses.map(response => response.data);
                        // Hacer algo con los datos de los Pokémon aquí
                        setPokemonData(pokemonDatos)
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchPokemonDetails();
    }, [pokemons])
    
    const loadMoreData = (pagina) => {
        if(currentPage < 49 && pagina === 'siguiente'){
            setCurrentPage(currentPage + 1);
        }
        if(currentPage>1 && pagina === 'anterior'){
            setCurrentPage(currentPage - 1)
        }
    };
    
    const numberPokedex = (number) => {
        if(number < 10) return `#00${number}`
        if(number <100) return `#0${number}` 
        else return `#${number}`
    }

    const titleUpperCase = (nombre) =>{
        let newNombre = ''
        for (let index = 0; index < nombre.length; index++) {
          if(index == 0){
            newNombre += `${nombre[index].toUpperCase()}`
          }else{
            newNombre += `${nombre[index]}`
          }
        }
        return newNombre
      }

  return (
    <div className='lista__container'>
        <span className={`material-symbols-outlined ${currentPage == 1 ? 'disabled' : ""}`} onClick={() => loadMoreData('anterior')}>arrow_back</span>
        <div className='lista__pokemon'>
            {pokemonData.length > 0 ? 
            pokemonData.map((pokemon, index) => (
                <div key={index} className='card__pokemon' >
                    <p onClick={() => handleModal(index, 'abrir')}>{numberPokedex(pokemon.id)}</p>
                    <div id="app">
                        <Atropos
                            activeOffset={40}
                            shadow={false}
                            rotate={true}
                            rotateXMax={20}
                            rotateYMax={20}
                        >
                            <img src={pokemon.sprites.front_default} alt="" data-atropos-offset="10" className='card__image' onClick={() => handleModal(index, 'abrir')}/>
                        </Atropos>
                    </div>
                    <p onClick={() => handleModal(index, 'abrir')}>{titleUpperCase(pokemon.species.name)}</p>
                    {showModal[index] ? <Pokemon data={pokemon} index={index}/> : null}
                </div>
            ))
            : <p>Cargando...</p>}
        </div>
        <span className={`material-symbols-outlined ${currentPage == 49 ? 'disabled' : ""}`} onClick={() => loadMoreData('siguiente')}>arrow_forward</span>
    </div>
    
  )
}

export default ListaPkmn