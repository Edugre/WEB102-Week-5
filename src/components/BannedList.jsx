const BannedList = ( {banned, removeBanned} ) => {
    

    return (
        <div className='banned'>
            <h2>Banned Attributes</h2>
            {banned.map((attribute, index) => {
                const isValid = CSS.supports("color", attribute)
                const backgroundColor = isValid ? attribute : ""
                return (
                <div key={index} style={{ backgroundColor : backgroundColor }} className={`attribute ${attribute}`} onClick={() => removeBanned(attribute)}>
                    <p>{attribute}</p>
                </div>
                )
            })}
        </div>
    )
}
export default BannedList