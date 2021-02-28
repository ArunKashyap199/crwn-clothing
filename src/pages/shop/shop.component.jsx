import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";
import {updateCollections} from "../../redux/shop/shop.actions";


import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionOverViewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
    state = {
        loading: true
    }
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        console.log("Mount Shop Page!");

        // It display the collections name with their props
        // It'll update new item when we remount our page again bcz there is no onsnapshot is calling that function
        // Displaying Items

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });
        // getting Items from collections
        // API call
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-e51e0/databases/(default)/documents/collections')
        //     .then(response => response.json())
        //     .then(collections => console.log("Collections Through REST API: ", collections));
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) =>
                    <CollectionOverViewWithSpinner isLoading={loading} {...props} />}/>

                <Route path={`${match.path}/:collectionId`} render={(props) =>
                    <CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);

