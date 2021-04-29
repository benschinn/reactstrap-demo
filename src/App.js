import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { Card, CardImg, CardText, CardBody, CardTitle, Container, Row, Col } from 'reactstrap'

const App = () => {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    getPokemons()
    async function getPokemons() {
      try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200')

        console.log(data)

        const pokemonArr = data.results.map(async (pokemon) => {
          const { name, url } = pokemon;
          const { data } = await axios.get(url)
          const { front_default } = data.sprites

          return {
            name,
            image: front_default,
            weight: data.weight
          }
        })

        Promise.all(pokemonArr)
        .then(data => setPokemons(data))
      } catch(error) {
        console.log(error)
      }
    }
  }, [])
  return (
    <Container>
      <h1>Pokedex</h1>
      <Row>
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />))
        }
      </Row>
    </Container>
  )
}

const PokemonCard = (props) => {
  const { name, image, weight } = props.pokemon
  return (
    <Col xs="12" sm="6" md="4" lg="3">
      <Card>
        <CardBody>
          <CardImg src={image}/>
          <CardTitle tag="h3">{name}</CardTitle>
          <CardText>weight: {weight}kg</CardText>
        </CardBody>
      </Card>
    </Col>
  )
}

export default App;