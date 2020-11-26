import Head from 'next/head'
import { StandardLayout, Anchor } from 'components'
import { useWindowSize } from 'components/context/window-size'
import styles from './index.module.scss'

const Index = () => {
    const { windowWidth } = useWindowSize()
    return (
        <StandardLayout maxContentWidth={800}>
            <Head>
                <title>Next.JS boilerplate by dhacquebord</title>
                <meta name="title" content="Next.JS boilerplate by dhacquebord" />
                <meta name="description" content="Boilerplate to give you a quickstart on your new Next.js project" />
            </Head>
            <h1 className={styles.title}>
                Next.JS Boilerplate
            </h1>
            <h2>Features:</h2>
            <ul>
                <li>Simple SEO</li>
                <li>Environment variables</li>
                <li>Pre-commit hook to lint code and css</li>
                <li>Module based scss</li>
                <li>Context to get window size</li>
            </ul>

            <h3>Simple SEO</h3>
            <p>
                Next.JS provides you with a <em>Head</em> component to easily provide your app with SEO data. Check <Anchor href="https://nextjs.org/docs/api-reference/next/head">the Next.js docs</Anchor> for more info.
            </p>

            <h3>Environment variables</h3>
            <p>
                Create environment variables by adding them to <em>.env.local</em>.
                <br />Environment variables will not be shared with the browser unless they are prefixed with <em>NEXT_PUBLIC_</em>.
                <br />Check <Anchor href="https://nextjs.org/docs/basic-features/environment-variables">the Next.js docs</Anchor> For more info
            </p>

            <h3>Pre-commit hook to lint code and css</h3>
            <p>
                This boilerplate ensures code quality by using a pre-commit hook to lint your code and css.
                <br />Edit <em>.eslintrc</em> to customize ES-lint settings.
                <br />Modify <em>.stylelintrc</em> to customize Stylelint settings.
                <br />Check <em>.lintstagedrc</em> to add or remove commands to the pre-commit hook.
            </p>

            <h3>Module based scss</h3>
            <p>
                Tired of your css interferring with each other? This feature makes your life happier by making sure every component has it&apos;s own unique classnames! Find more info in <Anchor href="https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css">the Next.js docs</Anchor>.
            </p>

            <h3>Context to get window size</h3>
            <p>
                Want to render your html depending on the users window size? This context makes your life easier by providing you with a <em>useWindowSize</em> hook.
                This will make it super easy to render html for {windowWidth < 768 ? <b>mobile</b> : 'mobile'} or {windowWidth >= 768 ? <b>desktop</b> : 'desktop'}.
            </p>
        </StandardLayout>
    )
}

export default Index
