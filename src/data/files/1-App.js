import React from 'react'
import { useSelector } from 'react-redux'

import Header from './Header'
import Aside from './Aside/'
import SnippetPreview from './SnippetPreview'
import './App.sass'

const App = () => {
    const snippets = useSelector(state => state.snippets)
    const snippetsList = snippets.map((snippet, index) => <SnippetPreview snippet={snippet} key={index} />)

    return (
        <div className="page">
            <Aside />
            <div className="wrapper">
                <Header />
                <main className="main">
                    <article className="article">
                        {snippetsList}
                    </article>

                </main>
            </div>
        </div>
    )
}

export default App
