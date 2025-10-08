import {useState, useEffect} from "react";
import {styled} from "@mui/material/styles";
import {Box, SxProps, Theme} from "@mui/material";
import PokemonCard from "./PokemonCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fixPokemonName } from "./utilities";

interface GalleryProperty {
    sx: SxProps<Theme>;
    generation: number;
}

const BoxOfCards = styled(Box) (({theme}) => ({
    display: "grid",
    gridTemplateColumns: 'repeat(5, 1fr)', // responsive columns
    gridAutoRows: "250px",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    overflowY: "auto",

    // Get rid of nasty scrollbar
    '&::-webkit-scrollbar': {
        display: 'none',
    },

}))




async function getPokemonAnimations(generation: number) {
    // indexes for where each generation starts
    let startIndices = [1,152,252,387,494,650,722,810,906,1026];
    // Get the pokemon species gif/id/name by index    
    let results = [];



    if (generation === 0) {
        // Get all of their info
        for (let i = 1; i < startIndices[startIndices.length - 1]; i++) {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
            const name = response.data.name;
            console.log(name);
            results.push([`http://play.pokemonshowdown.com/sprites/ani/${fixPokemonName(name)}.gif`, i, name]);

            //const text = response.data.form_descriptions.description;
        }
    } else {
        if (generation > 9) {
            console.log("Generation too high");
            return;
        }

        // Get only that gen
        for (let i = startIndices[generation - 1]; i < startIndices[generation]; i++) {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
            const name = response.data.name;
            results.push([`http://play.pokemonshowdown.com/sprites/ani/${fixPokemonName(name)}.gif`, i, name]);
        }
    }
    return results;
}


function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function Gallery({sx, generation}: GalleryProperty) {
    // How do I add a filter here 

    // If we're looking at gen 0, that's just all gens.
    // Otherwise, change what we return by using Axios to get all pokemon within that generation only

    const navigate = useNavigate();

    const handleClick = (name: string, id: string) => {
        console.log("done");

        // Delay route change until animation completes
        setTimeout(() => {
            navigate(`/pokemon/${name}/${id}`);
        }, 50); // Match this to your CSS transition duration
    };


    const [results, setResults] = useState<any[][]>([]);

    useEffect(() => {
        async function fetchAnimations() {
            const result = await getPokemonAnimations(generation);
            console.log(result);
            if (result) setResults(result);
        }
        fetchAnimations();
    }, [generation]);

    // Gifs are directly from Showdown http://play.pokemonshowdown.com/sprites/ani/pokemon.gif

    return (
    <BoxOfCards sx={sx}>

    {results.map(([gifUrl, id, name], index) => (
      <PokemonCard key={index} 
                   GIF_URL={gifUrl} 
                   id={String(id)} 
                   name={capitalize(name)} 
                   onClick={() => {handleClick(name, String(id))}} 
                   />
    ))}


    </BoxOfCards>
    )
}