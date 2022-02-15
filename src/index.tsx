import React, {ChangeEvent, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// TODO:
//  [x] add and remove items
//  [x] toggle items from being done to undone
//  [ ] filter out done items
//  [ ] maybe animations
//  [ ] maybe persistence (localstorage works fine)

const ControlPanel = (props: { onAddButtonClick: (text: string) => void, onFilterButtonClick: () => void }) => {
    const [text, setText] = useState('');

    return (
        <div>
            <button onClick={() => {
                props.onAddButtonClick(text);
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
            <button onClick={props.onFilterButtonClick}>
                Show Incomplete
            </button>
        </div>
    )
};

const Item = (props: { text: string, complete: boolean, key: React.Key, onChange: (event: ChangeEvent<HTMLInputElement>, text: string) => void }) =>
    <li key={props.key}>
        <div className={props.complete ? "todo-item-done" : "todo-item"}>
            <input type="checkbox"
                   defaultChecked={props.complete}
                   onChange={(event) => {
                       props.onChange(event, props.text)
                   }}
            />
            <p className="todo-item-text">{props.text}</p>
        </div>
    </li>

const App = () => {
    const [items, setItems] = useState(Array<string>());
    const [incompleteItems, setIncompleteItems] = useState(Array<string>());
    const [isFiltered, setIsFiltered] = useState(false);

    const addItem = (text: string) => {
        setItems(items.concat(text));
        setIncompleteItems(incompleteItems.concat(text));
    }

    const boxChanged = (event: ChangeEvent<HTMLInputElement>, text: string) => {
        if (event.target.checked) {
            setIncompleteItems(incompleteItems.filter(item => item !== text));
        } else {
            setIncompleteItems(incompleteItems.concat(text));
        }
    }

    const displayItems = isFiltered ? incompleteItems : items;

    return (
        <div>
            <ControlPanel onAddButtonClick={addItem}
                          onFilterButtonClick={() =>
                              setIsFiltered(!isFiltered)
                          }
            />
            <div>
                <ul>
                    {displayItems.map((item, key) =>
                        <Item text={item}
                              complete={incompleteItems.indexOf(item) === -1}
                              key={key}
                              onChange={boxChanged}
                        />
                    )}
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