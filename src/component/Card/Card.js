import styled from 'styled-components';
import {Face, Mail, EventNote, Map, LocalPhone, Lock} from '@mui/icons-material';
import React, {useState} from "react";

// Création des différents composants avec styled-components.

const CardContainer = styled.div`
  position: relative;
  padding: 20px 0;
  background: ${props => props.theme['BackgroundCardContainer']};
  border-radius: 3px;
  box-shadow: 0 0 1px rgb(0 0 0 / 50%);
  overflow: hidden;
  text-align: center;
  z-index: 5;
  width: 520px;
  margin: auto;

  
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 130px;
    top: 0;
    background: ${props => props.theme['BackgroundColorAfter']};
    border-bottom: 1px solid rgba(0,0,0,.15);
    z-index: -1;
  }
`;
const UserPhotoContainer = styled.div`
  position: relative;
  background: #fff;
  padding: 5px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 30px;
  border: 1px solid rgba(0,0,0,.25);
  left: 50%;
  transform: translateX(-50%);
`;
const ImgCard = styled.img`
  width: 150px;
  border-radius: 50%;
`;
const TitleCard = styled.p`
  color: ${props => props.theme['secondTypoColor']};
  font-size: 18px;
  margin: 0;
`;
const ValueCard = styled.p`
  text-transform: lowercase;
  color: ${props => props.theme['firstTypoColor']};
  font-size: 38px;
  margin: 5px;
`;

const ContainerIcons = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    padding-inline-start : 0
`;



const Card = ({img, name, email, birthday, address, phone, password, theme}) => {

    // constante qui stocke en fonction de l'icône, son texte et sa valeur

    const jsonIcons = {
        "face" : {
            "icon" : Face,
            "text" : "My password is",
            "data" : name
        },
        "mail" : {
            "icon" : Mail,
            "text" : "My email address is",
            "data" : email
        },
        "eventnote" : {
            "icon" : EventNote,
            "text" : "My birthday is",
            "data" : birthday
        },
        "map" : {
            "icon" : Map,
            "text" : "My address is",
            "data" : address
        },
        "localphone" : {
            "icon" : LocalPhone,
            "text" : "My phone number is",
            "data" : phone
        },
        "lock" : {
            "icon" : Lock,
            "text" : "My password is",
            "data" : password
        }
    }

    const [selected, setSelected] = useState("face");

    const selectIcon = (iconName) => {
        setSelected(iconName)
    }

    return (
        <CardContainer>
            <div>
                <UserPhotoContainer>
                    <ImgCard src={img}/>
                </UserPhotoContainer>
                <TitleCard>{jsonIcons[selected]["text"]}</TitleCard>
                <ValueCard>{jsonIcons[selected]["data"]}</ValueCard>
            </div>
            <div>
                <ContainerIcons>

                    {
                        /* Pour tous les éléments dans jsonIcons on crée son icon avec les propriétés nécessaires pour styliser l'icône */
                        Object.keys(jsonIcons).map(
                            keys =>
                                <li key={keys}>
                                    {
                                        React.createElement(jsonIcons[keys]["icon"] , {
                                            "fontSize" : "large",
                                            "sx" : {
                                                "color" : selected === keys ? theme ? "orange" : "green" : "lightGrey"
                                            },
                                            onMouseEnter : () => selectIcon(keys)
                                        })
                                    }
                                </li>
                        )
                    }
                </ContainerIcons>
            </div>

        </CardContainer>
    )

}
export default Card;