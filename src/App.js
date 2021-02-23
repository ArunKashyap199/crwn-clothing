import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {auth, createUserProfileDocuments} from './firebase/firebase.utils';
import {createStructuredSelector} from "reselect";

import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

import CheckOutPage from "./pages/checkout/checkout.component";

import {setCurrentUser} from "./redux/user/user-actions";
import {SelectCurrentUser} from "./redux/user/user.selector";

import './App.css';


class App extends React.Component {
    unsubscribeFromAuth = null;

    /* Bcz of our subscriber is Here our subscription is always listening to the auth
    and auth send them that user authentication obj everytime until they sign out */

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocuments(userAuth);

                console.log("Mount UserRef:", userRef)
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    });
                    console.log("Mount Snapshot", snapshot)
                });
            } else {
                setCurrentUser(userAuth);
            }
        });
        console.log("Component did Mount");
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
        console.log('unmount',this.unsubscribeFromAuth);
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/checkout' component={CheckOutPage}/>
                    <Route
                        exact
                        path='/signin'
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to='/'/>
                            ) : (
                                <SignInAndSignUpPage/>
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

/*If your mapStateToProps function is declared as taking two parameters,
it will be called whenever the store state changes or when the wrapper component receives new props
(based on shallow equality comparisons). It will be given the store state as the first parameter,
and the wrapper component's props as the second parameter.
The second parameter is normally referred to as ownProps by convention.*/

/* Here createStructuredSelector function hold the state and it directly pass the top level state to the object*/
/* Here SelectCurrentUser is Selector Which is taking the action and giving the state to currentUser from selector */

const mapStateToProps = createStructuredSelector({
    currentUser: SelectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
