import { ChangeEvent, useState, KeyboardEvent, useEffect} from "react";
import {Box, InputBase, styled, alpha, Autocomplete} from "@mui/material";
import {createFilterOptions} from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import pokedex from "../resources/pokedex.gif";
import { useNavigate } from "react-router-dom";
import { capitalizeAfterDashes } from "./utilities";



// For typescript, I have to explicitly mention the type I pass into
// my self-defined components, if I have to pass extra stuff
interface SearchProperty {
    hasText: boolean;
}

const Search = styled("div")<SearchProperty>(({ theme, hasText }) => ({
    position: "relative",
    display: "flex",
    borderRadius: 25,
    backgroundColor: hasText ? alpha("#555", 1) : alpha("#555", 0.5),
    "&:hover": {
        backgroundColor: alpha("#555", 1),
    },
    margin: "0 auto",
    width: "700px",
    maxWidth: 800,
    transition: "all 0.4s ease-in-out",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 25,
}));


interface RoundedSearchBarProperty {
    onClick?: () => void;
    sortOrder?: string;
}


interface pokemonResults {
    results: {
        name: string;
        url: string;
    }[];
}

// Get some gifs, depending on the gen
async function getPokemonGifs() {
    let latergens = false;
    try {
        let gifs = [];
        const response = await axios.get<pokemonResults>("https://pokeapi.co/api/v2/pokemon?limit=100000");
        const pokemonList = response.data.results;
        const names = pokemonList.map(pokemon => pokemon.name);
        for (let name of names) {
            if (name.includes("chespin")) {  // Change the URL at the start of gen 6
                latergens = true;
            }
            if (name.includes("mega")) {
                continue;
            }
            // Is there a way I can load all of them first?
            if (!latergens) {
                gifs.push({name: `${capitalizeAfterDashes(name)}`, gif: `https://img.pokemondb.net/sprites/black-white/anim/normal/${name}.gif`});
            } else {
                gifs.push({name: `${capitalizeAfterDashes(name)}`, gif: `https://img.pokemondb.net/sprites/scarlet-violet/normal/${name}.png`});
            }
        }
        return gifs;
    } catch(error) {
        console.log("Could not get GIFs");
        return [];
    }
}


const filter = createFilterOptions<{name: string; gif: string}> ({
    stringify: (option) => option.name,
    matchFrom: "start",
    limit: 50,
})

const sortedFilter = (options: { name: string; gif: string }[], state: any, order: string | undefined) => {
  const filtered = filter(options, state);

  return filtered.sort((a, b) =>
    order === 'ascending'
      ? a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      : b.name.localeCompare(a.name, undefined, { sensitivity: 'base' })
  );
};

export default function RoundedSearchBar({onClick, sortOrder}: RoundedSearchBarProperty) {
    const [options, setOptions] = useState<{name: string, gif: string}[]>([]);

    useEffect(()=> {
        async function getData() {
            const data = await getPokemonGifs();
            setOptions(data);
        }
        getData();
    }, []);
    // const options = [
    //     {name: "Option 1", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"},
    //     {name: "Option 2", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/ivysaur.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/charmeleon.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"},
    //     {name: "Option 3", gif: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"},
    // ]

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && options.find(option => option.name.toLowerCase() === searchValue.toLowerCase())) {
            console.log("Search Submitted: ", searchValue);
            
            const index = options.findIndex(
                (option) => option.name.toLowerCase() === searchValue.toLowerCase()
                );
            navigate(`/mp2/pokemon/${searchValue}/${index + 1}`);
            // CHANGE HERE TO MAKE OPTIONS.name match with the thing
            // if (options.includes(searchValue)) {
            //     ;
            // }
            // On
            
            // Do stuff here with animations
            // setAnimate(true);
            // setTimeout(() => setAnimate(false), 1000);
            //onClick?.();
        }
    };

    return (
        <Box 
            sx= {{ 
                display: "flex",
                mt: 4,
                justifyContent: "center",
                alignItems: "center",
                width: "60%",
            }}
        >

        {/* This autocomplete has so many options, ugh */}
        <Autocomplete
            open={open}
            onOpen={(_) => {
                if (searchValue.length > 0) setOpen(true);
            }}
            onInputChange={(_, value) => {
                setSearchValue(value);
                setOpen(value.length > 0); // open only when there's input
            }}
            onClose={() => setOpen(false)}
            inputValue={searchValue}
            popupIcon={null}
            filterOptions={(option, state) => sortedFilter(option, state, sortOrder)}
            options={options}
            getOptionLabel={(option) => option.name}
            value={options.find((opt) => opt.name === searchValue) || null}
            onChange={(_, newValue) => {
                setSearchValue(newValue ? newValue.name : "");
            }}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <Box
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...optionProps}
                    >
                    <img
                        loading="lazy"
                        height="40"
                        width="40"
                        alt=""
                        src={option.gif}
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                            e.currentTarget.src = "https://img.pokemondb.net/sprites/home/normal/unown-qm.png";
                        }}                        
                    />
                    {option.name}
                    </Box>
                )  
            }}

            renderInput={(params) =>  
            <Search hasText = {searchValue.length > 0}>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                {...params.InputProps}
                inputProps={{
                    ...params.inputProps,
                    "aria-label": "search",
                }}
                placeholder="Search…"
                value={searchValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                />

                <Box onClick={onClick}>
                    <img src={pokedex}
                    alt = ""
                    width="30"
                    height="30"
                    style = {{
                        transform: 'translateY(-50%)',
                        transition: "transform 0.5s ease-in-out",
                        position: 'absolute',
                        right: 10,
                        top: '50%',
                        display: 'flex',
                        pointerEvents: 'auto', // so the icon is clickable
                        cursor: 'pointer',
                    }}
                    onMouseEnter = {e => (e.currentTarget.style.transform = "translateY(-50%) scale(2.0)")}
                    onMouseLeave = {e => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
                    >
                    </img>
                </Box>
            </Search>}

        ></Autocomplete>
        </Box>
    );
}


