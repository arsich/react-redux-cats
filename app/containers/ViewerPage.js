import {Link} from 'react-router';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import {showCat, closeCat} from '../actions';

import {Dialog} from 'material-ui';
import Viewer from '../components/Viewer';

export default class ViewerPage extends Component {
    constructor(props) {
        super(props);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.dialogActions = [
            { text: 'OK', onClick: this.handleDialogClose }
        ];
    }
    handleDialogClose() {
        const {dispatch} = this.props;
        dispatch(closeCat());
    }
    render() {
        const {history, dispatch, catToShow} = this.props;
        return (
            <div>
                <Viewer history={history}
                        handleShow={url => dispatch(showCat(url))} />
                <Dialog actions={this.dialogActions}
                        onRequestClose={this.handleDialogClose}
                        open={this.props.isCatShown}
                        ref='dialog'>
                    <div className='dialog'>
                        <img className='catImage'
                             src={catToShow}/>
                    </div>
                </Dialog>
            </div>
        );
    }
}

ViewerPage.propTypes = {
    history: PropTypes.instanceOf(Immutable.List),
    isCatShown: PropTypes.bool,
    catToShow: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const immutableState = Immutable.fromJS(state.cats);
    const history = immutableState.get('history');
    const isCatShown = immutableState.get('isCatShown');
    const catToShow = immutableState.get('catToShow');
    return {
        history,
        isCatShown,
        catToShow
    };
}

export default connect(mapStateToProps)(ViewerPage);