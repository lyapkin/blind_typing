import React, { useEffect, useState } from 'react'
import { useLoad } from '../hooks/useLoad'
import { codes } from '../util'
import Char from './Char'
import Stat from './Stat'

const Field = ({setTestState, children}) => {
    const [data, setData] = useLoad()


    const [typingInfo, setTypingInfo] = useState({
        misType: 0,
        start: null,
        time: null
    })

    
    useEffect(() => {
        document.addEventListener('keydown', handleTyping)

        return () => {
            document.removeEventListener('keydown', handleTyping)
        }
    })

    
    useEffect(() => {
        if (typingInfo.start) {
            
            // Замеряет время для расчет скорости печати
            const timeId = setTimeout(() => {
                setTypingInfo(prevState => ({
                    ...prevState,
                    time: (Date.now() - prevState.start) / 1000
                }))
            }, 1000)
            
            return () => {
                clearTimeout(timeId)
            }
        }
        
    }, [typingInfo])


    const handleTyping = (e) => {
        // Проверка, чтобы реагировал только на нажатие символьных клавиш
        if (!codes.has(e.key) && (e.keyCode < 48 || e.keyCode > 90)) {
            return
        }

        // Закончить тест при нажатии последнего символа
        if (data.content.text.length-1 === data.content.counter) {
            setTestState({
                running: false,
                done: true,
                result: {
                    speed,
                    accuracy
                }
            })

            return
        }

        // Обработка нажатой клавиши
        if (e.key === data.content.text[data.content.counter]) {
            // Нажатие правильной клавиши

            // Запускает время для замера скорости печати
            if (data.content.counter === 0) {
                setTypingInfo(prevState => ({
                    ...prevState,
                    start: Date.now()
                }))
            }
            
            // Отмечатет нажатую клавишу как правильную
            setData(prevState => ({
                ...prevState,
                content: {
                    ...prevState.content,
                    counter: prevState.content.counter+1,
                    isWrong: false
                }
            }))
        } else {
            // Нажатие неверной клавиши

            // Отмечатет нажатую клавишу как неправильную
            setData(prevState => ({
                ...prevState,
                content: {
                    ...prevState.content,
                    isWrong: true
                }
            }))

            // Увеличивает количество опечаток для расчета точности
            setTypingInfo(prevState => ({
                ...prevState,
                misType: prevState.misType+1
            }))
        }
    }


    const speed = Math.round((data.content?.counter || 0)/(typingInfo.time || 1) * 60) || 0
    const accuracy = 100 - Math.round(typingInfo.misType/data.content?.text.length * 10000)/100


    return (
        <div className='field'>
            
            {
                (data.status === 'pending' && 'Loading...') ||

                <>
                    {(data.status === 'failed' && data.error) ||

                    (data.status === 'succeeded' && 
                        <>
                            <div className='field__text'>
                                {data.content.text.map((item, index) => <Char key={index}
                                                                              char={item}
                                                                              index={index}
                                                                              current={data.content.counter}
                                                                              isWrong={data.content.isWrong} />)}
                            </div>

                            <div className='field__stat'>
                                <Stat speed={speed} accuracy={accuracy} />
                            </div>
                        </>)}

                    {children}
                </>
            }
                

        </div>
    )
}


export default Field