import {useEffect, useState} from "react";

import Card from "./component/Card/Card";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Filter from "./component/Filter/Filter";
import {FormControlLabel, Switch} from "@mui/material";
import {ThemeProvider} from "styled-components";
import styled from 'styled-components';

// Création d'un composant qui englobe l'intégralité de notre application.
const Content = styled.div`
    background-color: ${props => props.theme.ContentBackGroundColor};
    min-height: 100vh;
`;

// Gestion des couleurs
const theme = {
    dark : {
        ContentBackGroundColor : "black",
        firstTypoColor : "white",
        secondTypoColor : "#999",
        BackgroundColorAfter : "#101010",
        BackgroundCardContainer : "#282828"
    },
    light : {
        ContentBackGroundColor : "white",
        firstTypoColor : "black",
        secondTypoColor : "#999",
        BackgroundColorAfter : "#f9f9f9",
        BackgroundCardContainer : "white"
    }
}

const App = () => {


  // état qui stocke la liste des utilisateurs
  const [data, setData] = useState([]);
  // init darkMode à false
  const [darkMode, setDarkMode] = useState(false);

  const [filterByGenre, setFilterByGenre] = useState("");


  // fonction qui questionne l'api et ajoute à notre variable d'état
  const fetchRandomUser = async () => {
    const request = await fetch("https://randomuser.me/api/")
    const randomPerson = await request.json()
    const {results} = randomPerson
    const [curr_data] = results
    const copyData = [...data]
    copyData.push(curr_data)
    setData(copyData)
  }

  const handleChangeDarkMode = () => {
      setDarkMode( !darkMode )
  }

  // Au chargement du composant recherche un utilisateur
  useEffect(() => {

    fetchRandomUser().catch(err => alert(err));

  } , [])

  // S'il y a filtre récupère la nouvelle liste d'utilisateur
  const newData = filterByGenre ? data.filter(element => element["gender"] === filterByGenre) : data
  return (
      <ThemeProvider theme={!darkMode ? theme['light'] : theme['dark']}>
          <Content>
              <div>
                  <FormControlLabel
                      control={<Switch color="primary" />}
                      label="Dark mode"
                      labelPlacement="start"
                      onChange={() => {handleChangeDarkMode()}}
                      sx = {{
                          color : darkMode ? "white" : "black"
                      }}
                  />
              </div>
              {/* ajout du composant qui s'occupe du filtre */}
              <Filter valueByGenre={filterByGenre} handleChangeByGenre={setFilterByGenre} theme={darkMode}/>
              <div style={{display : "flex", justifyContent : "center", flexFlow : "row wrap"}}>
                  {
                      /* Affiche pour chaque utilisateur une card */
                      newData.length > 0
                          ?
                          newData.map(
                              (row,index) =>
                                  <div style={{margin : "20px" }}>
                                      <Card
                                          key={index}
                                          img={row.picture['medium']}
                                          name={row.name.first + " " + row.name.last}
                                          email={row.email}
                                          birthday={row['dob'].date.split('T')[0]}
                                          address={row.location['street'].number + " " + row.location['street'].name}
                                          phone={row.phone}
                                          password={row['login'].password}
                                          theme={darkMode}
                                      />
                                  </div>
                          )
                          : <h3>No result</h3>
                  }
              </div>
              {/* Button en bas à gauche pour ajouter un utilisateur aléatoire */}
              <div style={{position : "fixed", bottom : "20px", right : "20px"}}>
                  <GroupAddIcon fontSize="large" sx={{color : darkMode ? "orange" : "green"}} onClick={() => fetchRandomUser()}/>
              </div>
          </Content>
      </ThemeProvider>

  )
}
export default App;