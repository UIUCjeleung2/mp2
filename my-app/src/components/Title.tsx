import {Box, Typography} from "@mui/material";
import '@fontsource/montserrat';

export default function Title() {
    return (
        <Box
            sx = {{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "15px",
            }}
        >
            <Typography 
                variant="h4" 
                align="center"
                sx = {{
                    fontFamily: "'Montserrat', monospace !important",
                }}
                >
                Pokédex
            </Typography>
        </Box>
    );
}