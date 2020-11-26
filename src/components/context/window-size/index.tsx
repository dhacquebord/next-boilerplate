import { useContext, createContext, ReactNode, useState, useEffect } from 'react'

type Props = {
    children: ReactNode
}

const DEFAULT_CLIENT_WIDTH = 1920
const DEFAULT_CLIENT_HEIGHT = 1080

export const WindowSizeContext = createContext({
    windowHeight: DEFAULT_CLIENT_HEIGHT,
    windowWidth: DEFAULT_CLIENT_WIDTH
})

export const useWindowSize = () => useContext(WindowSizeContext)

export const WindowSizeProvider = ({ children }: Props) => {
    const [windowSize, setWindowSize] = useState({
        windowHeight: DEFAULT_CLIENT_HEIGHT,
        windowWidth: DEFAULT_CLIENT_WIDTH
    })

    const updateWindowSize = () => {
        if (typeof window === 'undefined') return
        setWindowSize({
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        })
    }

    useEffect(() => {
        updateWindowSize()
        window.addEventListener('resize', updateWindowSize)
        return () => window.removeEventListener('resize', updateWindowSize)
    }, [])

    return (
        <WindowSizeContext.Provider value={windowSize}>
            {children}
        </WindowSizeContext.Provider>
    )
}

export default WindowSizeProvider
