import react from "react"
import { Box } from "@mui/material"
import bg from "../resources/bg.jpg";

// This box will be the bg, as zindex is negative
export default function BGImage() {
    return (
        <Box
        sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            zIndex: 0
        }}
        />
    )
    
}

