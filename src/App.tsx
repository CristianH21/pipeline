import React from 'react';
import './App.css';
import { ItemProvider } from './context/items.context';
import Layout from './layout';
import { BoardView } from './views';

function App() {
  return (
    <div className="App">
      <ItemProvider>
        <Layout>
          <BoardView />
        </Layout>
      </ItemProvider>
    </div>
  );
}

export default App;
