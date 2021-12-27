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

const Item = (props: { text: string, key: React.Key, onChange: (event: ChangeEvent<HTMLInputElement>) => void }) => {
    // const [text, setText] = useState(props.text);
    // const [checked, setChecked] = useState(false);
    const [done, setDone] = useState(false);

    return (
        <li key={props.key}>
            <div className={done ? "todo-item-done" : "todo-item"}>
                <input type="checkbox"
                       onChange={(event) => {
                           setDone(event.target.checked)
                           props.onChange(event)
                       }}
                />
                <p className="todo-item-text">{props.text}</p>
            </div>
        </li>
    )
}

const App = () => {
    const [items, setItems] = useState(Array<{ text: string, completed: boolean }>());
    const [isFiltered, setIsFiltered] = useState(false);

    const addItem = (text: string) => {
        setItems(items.concat({text: text, completed: false}));
    }

    const boxChanged = (checked: boolean, index: number) => {
        const newItem = items[index];
        newItem.completed = checked;
        setItems(items.slice(0, index).concat(newItem).concat(items.slice(index + 1)));
    }

    const displayItems = () => items.filter((item) => !(item.completed && isFiltered))

    return (
        <div>
            <ControlPanel onAddButtonClick={addItem}
                          onFilterButtonClick={() =>
                              setIsFiltered(!isFiltered)
                          }
            />
            <div>
                <ul>
                    {displayItems().map((item, key) =>
                        <Item text={item.text}
                              key={key}
                              onChange={(event) => boxChanged(event.target.checked, key)}
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