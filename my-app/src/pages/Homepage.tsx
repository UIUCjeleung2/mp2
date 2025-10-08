import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCornerBox from '../components/PokemonBar';
import BGImage from "../components/BGImage";



// Simple main page
const HomePage = () => {
  const [moveToCorner, setMoveToCorner] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setMoveToCorner(true);

    // Delay route change until animation completes
    setTimeout(() => {
      navigate('/mp2/pokemon');
    }, 1000);
  };

  return (
    <>
    <BGImage/>
    <AnimatedCornerBox
      onSubmit = {handleClick}
      sx={{
        top: moveToCorner ? '20px' : '30%',
        left: moveToCorner ? '20px' : '50%',
        transform: moveToCorner ? 'translate(0, 0) scale(0.25)' : 'translate(-50%, -50%)',
        bgcolor: "rgba(0, 128, 255, 0.5)"
      }}
    >
    </AnimatedCornerBox>
  </>
  );
};

export default HomePage;
