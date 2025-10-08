// Utility functions that multiple pages use
import axios from "axios";

export function fixPokemonName(string: string) {
    // Certain pokemon have names that don't fit the gifUrls, so map them
    // to correct ones, if they're passed to this function
    const names: Record<string, string> = {
        "nidoran-m":"nidoran",
        "mr-mime":"mrmime",
        "ho-oh":"hooh",
        "mime-jr":"mimejr",
        "jangmo-o":"jangmoo",
        "type-null": "typenull",
        "hakamo-o": "hakamoo",
        "kommo-o": "kommoo",
        "tapu-koko": "tapukoko",
        "tapu-lele": "tapulele",
        "tapu-bulu": "tapubulu",
        "tapu-fini": "tapufini",
        "mr-rime": "mrrime",
    };
    if (string in names) {
        return names[string];
    }
    return string.toLowerCase();
}

export async function getPokemonStrings(id: string) {
    // indexes for where each generation starts
    // Get the pokemon species gif/id/name by index    

    const response1 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const blurbs = response1.data.flavor_text_entries;
    const englishBlurb = blurbs.find(
        (entry: {language: {name: string}}) => entry.language.name === "en"
    );

    //const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);

    return englishBlurb.flavor_text;
}

export async function getPokemonTypes(name: string | undefined) {
    // indexes for where each generation starts
    // Get the pokemon species gif/id/name by index    
    if (!name) {
        return [];
    }

    const response1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const types = response1.data.types;
    console.log(types);
    if (types.length > 1) {
        return [types[0].type.name, types[1].type.name];
    }

    //const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);

    return [types[0].type.name];
}


export function capitalizeAfterDashes(string: string) {
    let lower = string.toLowerCase();
    let chars = lower.split("");
    chars[0] = chars[0].toUpperCase();

    // Capitalize every letter after a dash
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === "-" && i + 1 < chars.length) {
            // Break for pokemon like Jangmo-o
            if (i + 2 >= chars.length) {
                break;
            }
            chars[i + 1] = chars[i + 1].toUpperCase();
        }
    }

    return chars.join("");
}


