import {Link} from 'react-router';
import React, {Component} from 'react';
import {Tabs, Tab, Styles} from 'material-ui';

const ThemeManager = Styles.ThemeManager;
const DefaultRawTheme = Styles.LightRawTheme;
const Colors = Styles.Colors;
const ThemeDecorator = Styles.ThemeDecorator;

let injectTapEventPlugin = require('react-tap-event-plugin');

// inject tap for material-ui
injectTapEventPlugin();

// theme customization
let muiTheme = ThemeManager.getMuiTheme(DefaultRawTheme);
muiTheme.inkBar.backgroundColor = Colors.yellow200;

@ThemeDecorator(muiTheme)
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: this._getSelectedIndex()
        };
        this._handleChange = this._handleChange.bind(this);
    }
    _handleChange(value, e, tab) {
        this.props.history.pushState(null, tab.props.route);
        this.setState({tabIndex: value});
    }
    _getSelectedIndex() {
        return this.props.history.isActive('/viewer') ? '2' : '1';
    }
    render() {
        return (
            <div>
                <Tabs value={this.state.tabIndex} onChange={this._handleChange}>
                    <Tab label='Cats Finder' value='1' route='/' />
                    <Tab label='Cats Viewer' value='2' route='/viewer' />
                </Tabs>
                {this.props.children}
            </div>
        );
    }
}

export default App;