import './App.css';
import OtherPage from "./pages/Pokedexpage";
import OriginalPage from './pages/Homepage';
import PokemonPage from './pages/Pokemonpage';
import {Routes, Route, BrowserRouter} from "react-router-dom";

/*

The App div is the toplevel, and I"m going 
to route different paths to different pages.

*/

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {<OriginalPage/>}></Route>
                    <Route path = "/pokemon" element = {<OtherPage/>}></Route> 
                    <Route path = "/pokemon/:name/:id" element = {<PokemonPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
