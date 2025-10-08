/*
So, the problem is that if I resize the page and try to animate the movement,
the absolute coordinates will not work out with the window. I need to calculate
it dynamically.


*/

import React, {useState, useRef, useEffect} from "react";
import Title from "./Title";
import RoundedSearchBar from "./RoundedSearchBar";
import {styled} from "@mui/material/styles";
import {Box, BoxProps, SxProps, Theme, Typography} from "@mui/material";
import bulbasaur from "../resources/bulbasaur.svg";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from '@mui/material/FormControlLabel';

interface PokemonBarProperty extends BoxProps {
    onSubmit?: () => void;
    onClick?: () => void;
}

export const AnimatedContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s ease;
    transform-origin: top left;
`

function PokemonBar({sx, onSubmit, onClick}: PokemonBarProperty) {
    // const [triggerAnimation, setTriggerAnimation] = useState(false);
    // const [translateXValue, setTranslateXValue] = useState(0);
    // const [translateYValue, setTranslateYValue] = useState(0);
    // const containerRef = useRef<HTMLDivElement>(null);

    // // This is the function that calculates the translation coordinates
    // useEffect(() => {
    //     if (containerRef.current) {
    //         const desiredViewportX = -25; // 10% viewport width in px
    //         const desiredViewportY = -95; // 10% viewport width in px
    //         const currentX = containerRef.current.getBoundingClientRect().left;
    //         const currentY = containerRef.current.getBoundingClientRect().top;
    //         const deltaX = desiredViewportX - currentX;
    //         const deltaY = desiredViewportY - currentY;
    //         console.log(currentX, currentY);
    //         setTranslateXValue(deltaX);
    //         setTranslateYValue(deltaY);
    //     }
    // }, [])

    // true is ascending, false is descending
    const [sortOrder, setSortOrder] = React.useState("descending");
    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSortOrder(event.target.value);
    };

    const handleSearchSubmit = () => {
        // setTriggerAnimation(true);
        onSubmit?.();
    }



    return (
        <AnimatedContainer sx = {sx}
            onClick = {onClick}>

            <img src={bulbasaur} 
                className="App-logo" 
                alt="logo" 
                style={{width: "150px", height: "auto"}}/>
            <Title></Title>

            {/* <RadioGroup
              row
              value={sortOrder}
              onChange={handleSortChange}
            >
                <FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
                <FormControlLabel value="descending" control={<Radio />} label="Descending" />
            </RadioGroup> */}

            <RoundedSearchBar onClick = {handleSearchSubmit} sortOrder={sortOrder}></RoundedSearchBar>


        </AnimatedContainer>
    )
}

interface AnimatedCornerBoxProps {
    onSubmit?: () => void;
    onClick?: () => void;
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
}

const AnimatedCornerBox = ({ onSubmit, onClick, sx, children }: AnimatedCornerBoxProps) => {
    return (
        <PokemonBar
            onClick = {onClick}
            onSubmit = {onSubmit}
            sx={{
              position: 'absolute',
              top: 20,
              left: 20,
              width: 800,
              height: 400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: 3,
              outline: '2px solid green',
              transition: 'all 1s ease',
              ...sx,
            }}
        >
      {children}
      </PokemonBar>
  );
};

export default AnimatedCornerBox;