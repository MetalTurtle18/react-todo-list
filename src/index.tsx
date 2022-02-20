import React, {ChangeEvent, useState} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// TODO:
//  [x] add and remove items
//  [x] toggle items from being done to undone
//  [x] filter out done items
//  [ ] maybe animations
//  [ ] maybe persistence (localstorage works fine)

const ControlPanel = (props: { onAddButtonClick: (text: string) => void, onFilterButtonClick: () => void, isFiltered: boolean, onClearCompleteButtonClicked: () => void, areCompleteItems: boolean }) => {
    const [text, setText] = useState('');

    return (
        <div>
            <Button variant="secondary" onClick={() => {
                props.onAddButtonClick(text);
                setText('');
            }} disabled={text === ''}>
                Add item
            </Button>
            <input type="text"
                   className="item-input"
                   placeholder="Enter item"
                   value={text}
                   onChange={(event) =>
                       setText(event.target.value)
                   }
            />
            <Button variant="secondary" onClick={props.onFilterButtonClick}>
                Show {props.isFiltered ? "all" : "incomplete"}
            </Button>
            <Button variant="danger" onClick={props.onClearCompleteButtonClicked} disabled={!props.areCompleteItems}>
                Clear completed
            </Button>
        </div>
    )
};

const Item = (props: { text: string, complete: boolean, onChange: (event: ChangeEvent<HTMLInputElement>, text: string) => void }) =>
    <li key={props.text}>
        <div>
            <input type="checkbox"
                   defaultChecked={props.complete}
                   onChange={(event) => {
                       props.onChange(event, props.text)
                   }}
            />
            <label className={"todo-item-label" + (props.complete ? " todo-item-label-done" : "")}>{props.text}</label>
        </div>
    </li>

const App = () => {
    const [items, setItems] = useState(Array<string>());
    const [incompleteItems, setIncompleteItems] = useState(Array<string>());
    const [isFiltered, setIsFiltered] = useState(false);

    const addItem = (text: string) => {
        if (text.length <= 0 || items.includes(text)) return;
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
        <Container fluid>
            <ControlPanel onAddButtonClick={addItem}
                          onFilterButtonClick={() =>
                              setIsFiltered(!isFiltered)
                          }
                          isFiltered={isFiltered}
                          onClearCompleteButtonClicked={() =>
                              setItems(incompleteItems)
                          }
                          areCompleteItems={items.length !== incompleteItems.length}
            />
            <div>
                <ul>
                    {displayItems.map(item =>
                        <Item text={item}
                              complete={incompleteItems.indexOf(item) === -1}
                              onChange={boxChanged}
                        />
                    )}
                </ul>
            </div>
            {items.length === 0
                ? <Alert variant="dark">Add items to get started</Alert>
                : null
            }
        </Container>
    )
}

// ========================================

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);