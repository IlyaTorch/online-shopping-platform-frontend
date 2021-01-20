import React from 'react';
import './directory.styles.scss'

import SearchForm from "../search-form/search-form.component";
import ItemsList from "../items-list/items-list.component";
import {connect} from "react-redux";
import {refreshItems} from "../../redux/items/items.actions";


class Directory extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.refreshItems('http://127.0.0.1:8000/api/?format=json');
    }

    render() {
        return (
             <div className="directory-container">
                 <div className="search-container">
                     <SearchForm fieldForSearch={'shop'}/>
                     <SearchForm fieldForSearch={'item'}/>
                 </div>
                 <ItemsList shopItems={this.props.lastAddedItems} />
             </div>
        )

    }
}


const mapStateToProps = (state) => ({
    lastAddedItems: state.items.itemList
});

const mapDispatchToProps = dispatch => ({
    refreshItems: url => dispatch(refreshItems(url))
})


export default connect(mapStateToProps, mapDispatchToProps)(Directory);
