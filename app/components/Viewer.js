import React, { Component, PropTypes }  from 'react';

import {Paper, GridList, GridTile, Dialog} from 'material-ui';

import Immutable from 'immutable';

const Viewer = ({
    history,
    handleShow
}) => {
    const createGridTile = function (url, key) {
        return (
            <GridTile key={'cat_item_' + key}
                      onClick={handleShow.bind(null, url)}
                      className='gridTile'>
                <img src={url} className='gridTileImg'/>
            </GridTile>
        );
    };
    return (
        <Paper className='content' zDepth={2}>
            {history && history.size ?
                <GridList cols={2} cellHeight={300} className='catsGrid'>
                    {history.map(createGridTile)}
                </GridList>
                : <p>Let&#39;s save some cats!</p>
            }
        </Paper>
    );
};

Viewer.propTypes = {
    history: React.PropTypes.instanceOf(Immutable.List),
    handleShow: PropTypes.func.isRequired
};

export default Viewer;