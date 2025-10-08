import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import BGImage from "../components/BGImage";
import { fixPokemonName, getPokemonStrings, getPokemonTypes } from "../components/utilities";



// The modal page where one goes to when they search or use the gallery
// I copied and pasted fonts everywhere, and I would clean that up if 
// I were to maintain this website.

export default function PokemonPage() {
    const [slideIn, setSlideIn] = useState(false);
    const {name, id} = useParams();
    const [englishBlurb, setEnglishBlurb] = useState<string>("");
    const [types, setType] = useState<string[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
        if (!id) return;
        const blurb = await getPokemonStrings(id);
        const t = await getPokemonTypes(name); 
        setEnglishBlurb(blurb);
        setType(t);
        }

        fetchData();
        const timer = setTimeout(() => setSlideIn(true), 10);
        return () => clearTimeout(timer);
    }, [id]);


    return (
        <>
        <BGImage/>
        <Box
            sx = {{
                position: "absolute",
                marginTop: "15px",
                top: "20px",
                left: slideIn ? "20px": "100%",
                width: 'calc(97% - 20px)',
                height: 'calc(93% - 20px)',
                transform: slideIn ? "translate(0, 0)" : "",
                transition: 'all 0.5s ease',
                borderRadius: "10px",
                outline: "4px solid #2F2F2F",
                bgcolor: "#616060EE"
            }}
        >
            <Box
                sx = {{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    outline: "2px solid blue",
                    width: "200px",
                    height: "200px",
                    borderRadius: "25px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#e5e5e5ff"
                }}
            >

                <img   
                    alt=""
                    src={`http://play.pokemonshowdown.com/sprites/ani/${fixPokemonName(name!)}.gif`}
                    onError={(e) => {
                        e.currentTarget.src = "https://img.pokemondb.net/sprites/home/normal/unown-qm.png";
                    }}          

                    style={{
                        width: "70%",
                        height: "70%",
                        objectFit: "contain",
                    }}
                />
            
            </Box>

            <Box
                sx = {{
                    position: "absolute",
                    top: "10px",
                    left: "220px",
                    outline: "4px solid gray",
                    width: "calc(100% - 230px)",
                    height: "200px",
                    borderRadius: "25px",
                    justifyContent: "center",
                    alignContent: "center"
                }}
            >

            <Button variant="outlined" 
                sx = {{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    bgcolor: "#ddd"
                }}
            onClick={() => navigate(-1)}>
            Go Back
            </Button>

            {types.map((type, index) => (
                <Typography
                key={type + index}
                variant="body1"
                align="center"
                sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "'Montserrat', monospace",
                }}
                >
                {type}
                </Typography>
            ))}

            </Box>


            <Box
                sx = {{
                    position: "absolute",
                    top: "220px",
                    left: "10px",
                    outline: "2px solid red",
                    width: "calc(100% - 20px)",
                    height: "calc(100% - 230px)",
                    borderRadius: "25px",
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >

            <Typography 
                variant="h4" 
                align="center"
                sx = {{
                    fontFamily: "'Montserrat', monospace !important",
                }}
                >
                {englishBlurb}
            </Typography>

            </Box>


        </Box>
    </>
    )
    
}
