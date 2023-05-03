import React from 'react'

const Stat = ({speed, accuracy}) => {
    
    return (
        <>
            <div className='indicator speed'>Скорость:<p>{speed} <span>зн/мин</span></p></div>
            <div className='indicator accuracy'>Точность:<p>{accuracy}<span>%</span></p></div>
        </>
    )
}

export default Stat