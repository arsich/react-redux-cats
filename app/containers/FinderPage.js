import {Link} from 'react-router';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {requestNextCat, saveCat} from '../actions';
import Immutable from 'immutable';

import {Snackbar} from 'material-ui';

import Finder from '../components/Finder';

class FinderPage extends Component {
    componentDidMount() {
        const {dispatch, current} = this.props;
        if (!current)
            dispatch(requestNextCat());
    }

    handleSave() {
        const {dispatch, current} = this.props;
        dispatch(saveCat(current));
        dispatch(requestNextCat());

        this.refs.snackbar.show();
    }

    handleNext() {
        const {dispatch} = this.props;
        dispatch(requestNextCat());
    }

    render() {
        const {dispatch, current} = this.props;
        return (
            <div>
                <Finder current={current}
                        handleNext={this.handleNext.bind(this)}
                        handleSave={this.handleSave.bind(this)}>
                </Finder>
                <Snackbar ref='snackbar'
                          message='Cat added to your viewer.'
                          autoHideDuration={2000} />
            </div>
        );
    }
}

FinderPage.propTypes = {
    current: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const immutableState = Immutable.fromJS(state.cats);
    const current = immutableState.get('current');
    return {
        current
    };
}

export default connect(mapStateToProps)(FinderPage);