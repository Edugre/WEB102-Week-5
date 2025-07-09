const History = ({ history }) => {
    return (
    <div className='history'>
        <h2>Previous Encounters</h2>
        <div id="history_container">
            {history.map((pokemon, index) => (
                <div key={index} className="pokemon">
                    <img src={pokemon.sprite} alt={pokemon.name}></img>
                    <p>{pokemon.name}</p>
                </div>
            ))}
        </div>
    </div>
    );
}
export default History;