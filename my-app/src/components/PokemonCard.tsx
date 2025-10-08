import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box, CardActionArea, Typography } from "@mui/material";

const StyledCard = styled(Card)({
  width: '100%',
  height: '250px',
  minWidth: "150px",
  borderRadius: "20px"
});


export default function PokemonCard({GIF_URL, onClick, id, name}: {GIF_URL: string, onClick: () => void, id: string, name: string}) {
    return (
        <StyledCard>
            <CardActionArea
                onClick = {onClick}
                sx = {{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    bgcolor: "#e5e5e5ff"
                }}
            >
                <CardMedia
                    component = "img"
                    loading= "lazy"
                    image = {GIF_URL}
                    onError={(e) => {
                        e.currentTarget.src = "https://img.pokemondb.net/sprites/home/normal/unown-qm.png";
                    }}          
                    sx = {{
                        objectFit: "contain",
                        width: "100%",
                        height: "80%",
                        transform: "translateY(20px) scale(0.6)",
                        bgcolor: "#e5e5e5ff"
                    }}
                />

                <Box 
                    sx = {{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "#e5e5e5ff",
                        width: "100%",
                        height: "20%",
                        flexGrow: 1,
                        gap: 2,
                    }}

                >
                <Typography sx = {{ fontFamily: "Roboto, Arial, sans-serif", color: "black"}}>#{id}</Typography>
                <Typography sx = {{ color: "black"}}>{name}</Typography>

                </Box>
            </CardActionArea>
        </StyledCard>
    )
}