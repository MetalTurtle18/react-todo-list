import React, {ChangeEvent, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// TODO:
//  [x] add and remove items
//  [ ] toggle items from being done to undone
//  [ ] filter out done items
//  [ ] maybe animations
//  [ ] maybe persistence (localstorage works fine)

const AddItemsPane = (props: { onButtonClick: (text: String) => void }) => {
    const [text, setText] = useState('');

    return (
        <div>
            <button onClick={() => {
                props.onButtonClick(text);
                setText('');
            }}>
                Add item
            </button>
            <input type="text"
                   placeholder="Enter item"
                   value={text}
                   onChange={(event: ChangeEvent<HTMLInputElement>) =>
                       setText(event.target.value)
                   }
            />
        </div>
    )
};

const App = () => {
    const [items, setItems] = useState(Array<String>());

    const addItem = (text: String) => {
        setItems(items.concat(text));
    }

    return (
        <>
            <AddItemsPane onButtonClick={addItem}/>
            <div>
                <ul>
                    {items.map(
                        (item: String, index: Number) => <li key={index.toString()}>{item}</li>
                    )}
                </ul>
            </div>
        </>
    )
}

// ========================================

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);