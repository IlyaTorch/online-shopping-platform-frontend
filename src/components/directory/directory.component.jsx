import React from 'react';
import './directory.styles.scss'

import SearchForm from "../search-form/search-form.component";
import ItemsList from "../items-list/items-list.component";


class Directory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastAddedItems: [],
        }
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/?format=json")
            .then(response => response.json())
            .then(items => this.setState({lastAddedItems: items}));
    }

    render() {
        return (
             <div className="directory-container">
                 <div className="search-container">
                     <SearchForm fieldForSearch={'shop'}/>
                     <SearchForm fieldForSearch={'item'}/>
                 </div>
                 <ItemsList shopItems={this.state.lastAddedItems} />
             </div>
        )

    }
}


export default Directory;
