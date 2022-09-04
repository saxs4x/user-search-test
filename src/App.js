import React from 'react';
import {Button} from 'antd';
import './App.css';
import {Input, Space} from 'antd';
import { PageHeader } from 'antd';
import SearchScreen from "./screens/SearchScreen";


const App = () => (
    <div className="App">
        <PageHeader
            className="site-page-header"
            onBack={() => null}
            backIcon={false}
            ghost={false}
            title="Test Search App"
        />
        <SearchScreen />
    </div>
);

export default App;
