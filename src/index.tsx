import React, {ChangeEvent, ComponentProps, ComponentState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// TODO:
//  [x] add and remove items
//  [ ] toggle items from being done to undone
//  [ ] filter out done items
//  [ ] maybe animations
//  [ ] maybe persistence (localstorage works fine)

class AddItemsPane extends React.Component<ComponentProps<any>, ComponentState> {
    constructor(props: { onButtonClick: (text: String) => void }) {
        super(props);
        this.state = {
            text: '',
        };
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.props.onButtonClick(this.state.text)
                    this.setState({text: ''})
                }}>
                    Add item
                </button>
                <input type="text"
                       placeholder="Enter item"
                       value={this.state.text}
                       onChange={(event: ChangeEvent<HTMLInputElement>) =>
                           this.setState({text: event.target.value})
                       }
                />
            </div>
        )
    }
}

class App extends React.Component<ComponentProps<any>, ComponentState> {
    constructor(props: ComponentProps<any>) {
        super(props);
        this.state = {
            items: Array<String>(),
        };
    }

    addItem = (text: String) => {
        this.setState({
            items: this.state.items.concat(text),
        });
    }

    render() {
        return (
            <>
                <AddItemsPane onButtonClick={this.addItem}/>
                <div>
                    <ul>
                        {this.state.items.map(
                            (item: String, index: Number) => <li key={index.toString()}>{item}</li>
                        )}
                    </ul>
                </div>
            </>
        )
    }
}

// ========================================

ReactDOM
    .render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document
            .getElementById(
                'root'
            )
    );