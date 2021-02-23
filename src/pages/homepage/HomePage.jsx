import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import ReactPaginate from 'react-paginate';

import './homepage.scss';

import {API_URL, API_PAGE_URL} from '../../url-data/urlData';

import {selectItemsByRequestFromSearchForm} from '../../redux/shop/shopSelectors';

import ItemsList from '../../components/items-list/ItemsList';
import WithSpinner from '../../components/with-spinner/withSpinner';

import {updateItemsByRequestFromSearchForm, updateItemList} from '../../redux/shop/shopActions';


const ItemsListWithSpinner = WithSpinner(ItemsList);


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            numPages: 0,
        };
    }

    componentDidMount() {
        fetch(`${API_URL}/`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                const items = parsedResponse.results;
                this.setState({numPages: Math.round(parsedResponse.count / items.length)});
                this.props.updateItems(items);
                this.props.updateItemsByRequestFromSearchForm(items);
                this.setState({loading: false});
            });
    }

    handlePageClick = (data) => {
        const pageNum = data.selected + 1;

        fetch(`${API_PAGE_URL}${pageNum}`)
            .then((response) => response.json())
            .then(({results: items}) => {
                this.setState({loading: true});
                this.props.updateItems(items);
                this.props.updateItemsByRequestFromSearchForm(items);
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <div className="homepage-container">
                <h1>ITEMS</h1>
                <ItemsListWithSpinner
                    isLoading={this.state.loading}
                    items={this.props.itemsByRequestFromSearchForm}
                />
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.numPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousClassName="page-item"
                    nextClassName="page-item"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    disabledClassName="disabled"
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    itemsByRequestFromSearchForm: selectItemsByRequestFromSearchForm,
});

const mapDispatchToProps = (dispatch) => ({
    updateItems: (items) => dispatch(updateItemList(items)),
    updateItemsByRequestFromSearchForm: (items) => dispatch(updateItemsByRequestFromSearchForm(items)),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
