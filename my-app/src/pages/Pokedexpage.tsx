// OtherPage.tsx
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AnimatedCornerBox from "../components/PokemonBar";
import Gallery from "../components/BoxOfCards";
import { useNavigate } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import BGImage from '../components/BGImage';
import { useState, useEffect } from 'react';
// The thing about these two pages is that
// both boxes are placed in the same place so
// the illusion of it being there is made, but
// they corner box is definitely reloaded.

// I fixed the problem by applying the same size
// transform to both.


const PokedexPage = () => {
  
  // Pages should have some state setters and getters

  let numbers = [1,2,3,4,5,6,7,8,9];
  // For sliding in the other boxes
  const [slideIn, setSlideIn] = useState(false);
  // For bringing back the cornerBox and getting rid of the other boxes
  const [returnFromCorner, setReturnFromCorner] = useState(false);
  // What generation of Pokemon to display
  const [generation, setGeneration] = useState(1);

  // Routing
  const navigate = useNavigate();

  const handleClick = () => {
    setReturnFromCorner(true);
    console.log("done");

    // Delay route change until animation completes
    setTimeout(() => {
      navigate('/mp2');
    }, 1000); // Match this to your CSS transition duration
  };

  useEffect(() => {
    const timer = setTimeout(() => setSlideIn(true), 10);
    return () => clearTimeout(timer);
  }, []);


  // And return the components. Components should be defined elsewhere
  return (
    <>
    <BGImage/>
    
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Fixed box in corner */}
      <AnimatedCornerBox
        onClick={handleClick}
        sx = {{
          top: returnFromCorner ? '30%' : '20px',
          left: returnFromCorner ? '50%' : '20px',
          transform: returnFromCorner ? "translate(-50%, -50%) scale(1.0)" : "scaleX(0.25) scaleY(0.25)",
          cursor: "pointer",
          bgcolor: "rgba(0, 128, 255, 0.5)"
        }}
      >
      </AnimatedCornerBox>


      {/* Vertical bunch of buttons */} 
      <Stack
      direction="column"
      spacing={1}
      sx={{
        display: "flex",
        justifyContent: "stretch",
        position: 'absolute',
        top: '120px',
        left: slideIn ? 0 : '100%',
        width: '200px',
        height: 'calc(100% - 200px)',
        transform: returnFromCorner ? "translateY(100vw)" : "translateX(0)",  // They go downwards haha
        transition: 'all 0.5s ease',
        margin: "10px",
        borderRadius: "25px",
        outline: "3px solid green",
        padding: "12px",
        bgcolor: "rgba(42, 192, 90, 0.3)"
    
      }}
      >
      {numbers.map((selected) => (
        <Button
          key={selected}
          variant={generation === selected ? "contained" : "outlined"}
          onClick={() => setGeneration(selected)}
          sx={{ minWidth: '30px', padding: '5px 20px', flex: 1,
                    bgcolor: "rgba(65, 65, 65, 0.5)",
                    fontFamily: "'Courier New', Courier, monospace", // example font family
                    fontWeight: 'bold', // make font bold
                    color: generation === selected ? 'white' : 'cyan',
          }}
        >
          Gen {selected}
        </Button>
      ))}
      </Stack>


      {/* Slide-in panel */}
      <Gallery
        sx={{
          position: 'absolute',
          left: slideIn ? 230 : '100%',
          width: 'calc(95% - 230px)',
          height: '93%',
          outline: '2px solid green',
          transform: returnFromCorner ? "translateX(100vw)" : "",
          transition: 'all 0.5s ease',
          margin: "10px",
          borderRadius: "25px",
          bgcolor: "rgba(0, 128, 255, 0.5)"
        }}
        generation = {generation}
      />
    </Box>
    </>
  );
};

export default PokedexPage;
