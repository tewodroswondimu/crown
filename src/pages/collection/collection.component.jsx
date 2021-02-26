import React from 'react';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import CollectionItem from '../../components/collection-item/collection-item.component'

import './collection.styles.scss'; 

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import { selectCollection } from '../../redux/shop/shop.selector'

const CollectionPage = ({ match, collection }) => {
    return (
        <div className='collection-page'>
            <h2 className='title'>{ collection.title }</h2>
            <div className='items'>
                {
                    collection.items.map(item => (
                        <CollectionItem key={item.id} item={item}/>
                    ))
                }
            </div>
        </div> 
    )
}; 

const mapStateToProps = (state, ownProps) => createStructuredSelector ({
    collection: selectCollection(ownProps.match.params.collectionId)
}); 

export default connect(mapStateToProps)(CollectionPage);