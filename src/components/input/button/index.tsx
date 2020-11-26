import Link from 'next/link'
import { FunctionComponent } from 'react';
import classnames from 'classnames'
import styles from './button.module.scss'

type Props = {
    onClick?: () => void
    href?: string
    className?: string
}

const Index: FunctionComponent<Props> = ({
    onClick,
    href,
    children,
    className
}) => {
    const button = (
        <button className={classnames(styles.button, className)} onClick={onClick}>
            {children}
        </button>
    )

    return href ? (
        <Link href={href}>
            {button}
        </Link>
    ) : button
}
    

export default Index
