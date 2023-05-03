import React from 'react'

const StartButton = ({handleClick, text}) => {
    return (
        <div className='button'>
            <button onClick={handleClick}>{text}</button>
        </div>
    )
}

export default StartButton