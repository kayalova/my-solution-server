const data = [
    {
        id: 1,
        userFilename: 'App.js',
        category: 'frontend',
        date: '12/06/2019',
        description: `import React from 'react';
        import Header from './components/Header'
        import Aside from './components/Aside'
        import SnippetPreview from './components/SnippetPreview'
        import './App.sass';
        
        const App = () => (
            <div className="page">
                <Aside />
                <div className="wrapper">`,
        file: '1-App.js',
        pathToFile: './files/1-App.js'
    },
    {
        id: 2,
        userFilename: 'utils.py',
        category: 'backend',
        date: '12/20/2019',
        description: `class FileProxyMixin:
        """
        A mixin class used to forward file methods to an underlaying file
        object.  The internal file object has to be called "file"::
            class FileProxy(FileProxyMixin):
                def __init__(self, file):
                    self.file = file
        """
    
        encoding = property(lambda self: self.file.encoding)`,
        file: '2-utils.py',
        pathToFile: './files/2-utils.py',
    }
]

module.exports = data