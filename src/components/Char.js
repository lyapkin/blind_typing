import React from 'react'

const Char = ({char, index, current, isWrong}) => {
    
    const className = isWrong && index === current ? 'wrong' :
                      index === current ? 'current' :
                      index < current ? 'typed' : null

    return (
        <span className={className}>{char}</span>
    )
}

export default Char