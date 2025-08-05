
type PokemonCardProps = {
    id: number,
    name: string,
    base_experience: number,
    imageUrl: string
    checked: boolean,
    onToggle: () => void    
}

export default function PokemonCard({id, name, base_experience, imageUrl, checked, onToggle}: PokemonCardProps) {

    //const imageContent = detailData.sprites.other['official-artwork'].front_default || detailData.sprites.front_default;




    return (
        <div>
            <h1>{id}</h1>
            <h2>{name}</h2>
            <img src={imageUrl} alt={name} />
            <p>{base_experience}</p> 
            <input type="checkbox" onClick={onToggle}/>
            {checked && <p>Checked</p>}

        </div>
    );
}