import React from 'react';
import Header from './components/Header'
import Aside from './components/Aside'
import SnippetPreview from './components/SnippetPreview'
import './App.sass';

const App = () => (
    <div className="page">
        <Aside />
        <div className="wrapper">
            <Header />
            <main className="main">
                <article className="article">
                    <SnippetPreview />
                </article>

            </main>
        </div>
    </div>
)

export default App;