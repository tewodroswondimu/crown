import React from 'react'; 
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import CollectionPage from '../collection/collection.component';
import { updateShop } from '../../redux/shop/shop.actions'; 
import { connect } from 'react-redux';
import withSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = withSpinner(CollectionOverview); 
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    }; 

    unsubscribeFromSnapshot = null; 

    componentDidMount() {
        const { updateShop } = this.props;
        const collectionRef = firestore.collection('collections'); 

        // observer pattern with firebase firestore db
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     const collectionMap = convertCollectionsSnapshotToMap(snapshot)
        //     updateShop(collectionMap); 
        //     this.setState({ loading: false });
        // }) 

        // uses .get to do api calls using a promise
        collectionRef.get().then(snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot)
            updateShop(collectionMap); 
            this.setState({ loading: false });
        })

        // using native fetch api, need to change CORS policy
        // fetch('https://firestore.googleapis.com/v1/crown-d28f3/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collection => console.log(collection))
    }

    componentWillUnmount() {
        // this.unsubscribeFromSnapshot(); 
    }
     
    render() {
        const { match } = this.props;
        const { loading } = this.state; 
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={props => (
                    <CollectionOverviewWithSpinner isLoading={loading} {...props} />
                )} />  
                <Route exact path={`${match.path}/:collectionId`} render={props => (
                    <CollectionPageWithSpinner isLoading={loading} {...props} />
                )} /> 
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateShop: collectionMap => dispatch(updateShop(collectionMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);  