import { useEffect, useState } from 'react'
import { Logo, GithubIcon } from 'components'
import Link from 'next/link'
import classnames from 'classnames'
import styles from './header.module.scss'

type Props = {
    maxWidth?: number
}

const Index = ({ maxWidth }: Props) => {
    const [sticky, setSticky] = useState(false)

    const calculateSticky = () => {
        const scrollTop = window.scrollY
        setSticky(scrollTop >= 20 ? true : false)
    }

    useEffect(() => {
        document.addEventListener('scroll', calculateSticky)
        return () => document.removeEventListener('scroll', calculateSticky)
    })

    const headerStyle = {
        maxWidth,
    }
    
    return (
        <div className={classnames(styles.headerWrapper, {
            [styles.sticky]: sticky
        })}>
            <div className={styles.header} style={headerStyle}>
                <div>
                    <Logo className={styles.logo} />
                    <span className={styles.title}>
                        Next.js Boilerplate
                    </span>
                </div>
                <div>
                    <Link href="https://github.com/dhacquebord/next-boilerplate">
                        <a target="__blank">
                            <GithubIcon className={styles.githubIcon} />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Index
