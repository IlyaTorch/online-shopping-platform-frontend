import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './itemsListStyles.scss';

import Item from '../item/Item';

import {selectItemsByRequestFromSearchForm} from '../../redux/shop/shopSelectors';

import {updateItemList, updateItemsByRequestFromSearchForm} from '../../redux/shop/shopActions';


const ItemsList = ({url, items, updateItems, updateItemsByRequestFromSearchForm}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [itemsCollected, setItemsCollected] = useState(false);

    useEffect(() => {
        fetchItems();
        window.addEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (
            Math.ceil(window.innerHeight + document.documentElement.scrollTop) <
            document.documentElement.offsetHeight || isLoading
        ) {
            return;
        }
        setIsLoading(true);
    };

    const fetchItems = async () => {
        const response = await fetch(`${url}/?page=${page}`);
        response.status === 404 && setItemsCollected(true);
        const parsedResponse = await response.json();

        const newItems = parsedResponse.results;

        if (newItems &&
            (!items.length ||
                // case when we come from other page where items have already been loaded
                (items.length && items[0].id !== newItems[0].id)
            )
        ) {
            updateItems([...items, ...newItems]);
            updateItemsByRequestFromSearchForm([...items, ...newItems]);
            setPage(page + 1);
        }
    };

    useEffect(() => {
        if (!isLoading || itemsCollected) return;
        fetchMoreListItems();
    }, [isLoading]);

    const fetchMoreListItems = () => {
        fetchItems();
        setIsLoading(false);
    };

    return (
        <div className="items-container">
            {
                items.map((item) => <Item key={item.id} item={item}/>)
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    items: selectItemsByRequestFromSearchForm,
});

const mapDispatchToProps = (dispatch) => ({
    updateItems: (items) => dispatch(updateItemList(items)),
    updateItemsByRequestFromSearchForm: (items) => dispatch(updateItemsByRequestFromSearchForm(items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
