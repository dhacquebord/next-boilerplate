import { Header, Footer } from 'components'
import { FunctionComponent } from 'react'
import styles from './standard-layout.module.scss'

type Props = {
    maxContentWidth?: number
}

const Index: FunctionComponent<Props> = ({ children, maxContentWidth }) => {
    const contentStyle = {
        maxWidth: maxContentWidth,
    }

    return (
        <>
            <Header maxWidth={maxContentWidth} />
            <div className={styles.content} style={contentStyle}>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Index
