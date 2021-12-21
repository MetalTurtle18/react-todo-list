import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// TODO:
//  [x] add and remove items
//  [x] toggle items from being done to undone
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
                   onChange={(event) =>
                       setText(event.target.value)
                   }
            />
        </div>
    )
};

const Item = (props: { text: String, key: React.Key }) => {
    const [done, setDone] = useState(false);

    return (
        <div className={"TodoItem" + (done ? " done" : "")}>
            <input type="checkbox"
                   onChange={(event) =>
                       setDone(event.target.checked)
                   }
            />
            <li key={props.key}>{props.text}</li>
        </div>
    )
}

const App = () => {
    const [items, setItems] = useState(Array<String>());

    const addItem = (text: String) => {
        setItems(items.concat(text));
    }

    return (
        <div>
            <AddItemsPane onButtonClick={addItem}/>
            <div>
                <ul>
                    {items.map((item, key) => <Item key={key} text={item}/>)}
                </ul>
            </div>
        </div>
    )
}

// ========================================

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);