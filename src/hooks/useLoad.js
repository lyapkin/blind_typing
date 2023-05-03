import { useEffect, useState } from "react"

export const useLoad = () => {
    const [data, setData] = useState({
        status: 'idle',
        content: null,
        error: null
    })

    useEffect(() => {
        const request = async () => {
            if (!ignore) {
                setData({
                    status: 'pending',
                    content: null,
                    error: null,
                    counter: null
                })
            }
            const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=1&format=text')
            if (response.ok) {
                const data = await response.text()
                
                if (!ignore) {
                    setData({
                        status: 'succeeded',
                        content: {
                            text: data.split(''),
                            counter: 0,
                            isWrong: false
                        },
                        error: null
                    })
                }
            } else {
                if (!ignore) {
                    setData({
                        status: 'failed',
                        content: null,
                        error: 'Есть проблемы. Попробуйте перезагрузить страницу.',
                        counter: null
                    })
                }
            }
        }

        let ignore = false

        request()

        return () => {
            ignore = true
        }

    }, [])

    return [data, setData]
}