import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
    const [items, setItems] = useState([]);

    return (
        <>
            <ul>
                {items.map(item => <li>{item}</li>)}
            </ul>
        </>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);