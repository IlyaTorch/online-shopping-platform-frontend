import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import './directory.scss'

import {API_URL} from "../../url-data/urlData";

import {selectDisplayedItems} from "../../redux/shopItems/shopItemsSelectors";

import Item from "../item/Item";
import {updateDisplayedItems, updateItemList} from "../../redux/shopItems/shopItemsActions";


class Directory extends React.Component {
    constructor(props) {
        super(props);

        fetch(`${API_URL}/`)
            .then(response => response.json())
            .then(items => {
                this.props.updateItems(items);
                this.props.updateDisplayedItems(items);
            });
    }

    render()
    {
        return (
            <div className="directory-container">
                <h1>ITEMS</h1>

                <div className="items-container">
                    {
                         this.props.displayedItems.map(item => <Item key={item.id} item={item}/>)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    displayedItems: selectDisplayedItems
});

const mapDispatchToProps = dispatch => ({
    updateItems: items => dispatch(updateItemList(items)),
    updateDisplayedItems: items => dispatch(updateDisplayedItems(items))
});


export default connect(mapStateToProps, mapDispatchToProps)(Directory);
