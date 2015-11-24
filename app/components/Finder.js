import React, { Component, PropTypes }  from 'react';

import {Paper, CardActions, RaisedButton} from 'material-ui';

export default class Finder extends React.Component {
    render() {
        const {current, handleSave, handleNext} = this.props;
        return (
            <Paper className='content' zDepth={2}>
                <img className='catImage'
                     src={current} />
                <CardActions>
                    <RaisedButton className='catFinderButton'
                                  label='Save'
                                  primary={true}
                                  onClick={handleSave}/>
                    <RaisedButton className='catFinderButton'
                                  label='Next'
                                  secondary={true}
                                  onClick={handleNext} />
                </CardActions>
            </Paper>
        );
    }
}

Finder.propTypes = {
    current: PropTypes.string,
    handleSave: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired
};