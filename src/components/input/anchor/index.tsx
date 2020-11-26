import { FunctionComponent } from 'react'
import Link from 'next/link'
import classnames from 'classnames'
import styles from './anchor.module.scss'

type Props = {
    href?: string
    className?: string
}

const Index: FunctionComponent<Props> = ({
    href,
    className,
    children
}) => (
    <Link href={href}>
        <a className={classnames(styles.anchor, className)}>
            {children}
        </a>
    </Link>
)

export default Index
