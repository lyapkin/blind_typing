import React from 'react'
import Stat from './Stat'

const Result = ({speed, accuracy, children}) => {
    
    return (
        <div className='result'>
            <div className='result__stat'>
                <Stat speed={speed} accuracy={accuracy} />
            </div>
            {children}
        </div>
    )
}

export default Result