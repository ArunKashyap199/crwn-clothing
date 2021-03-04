import React from 'react';
// 3rd party import

import {connect} from "react-redux";
import {auth} from "../../firebase/firebase.utils";
import { createStructuredSelector } from "reselect";

// Application Component import
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import { SelectCartHidden} from "../../redux/cart/cart.selector";
import { SelectCurrentUser} from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user-actions";

// Styles Import
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles.jsx';

const Header = ({currentUser, hidden, signOutStart}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink  to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink  to='/shop/contacts'>
                CONTACT
            </OptionLink>
            {
                currentUser ? (
                    // it'll come from the saga action signOutStart
                    <OptionLink as='div' onClick={signOutStart}>
                        SIGN OUT
                    </OptionLink>
                ) : (
                    <OptionLink  to='/signIn'>
                        SIGN IN
                    </OptionLink>
                )
            }
            <CartIcon/>
        </OptionsContainer>
        {hidden ? null : <CartDropDown/>}
    </HeaderContainer>
)
const mapStateToProps = createStructuredSelector({
    currentUser: SelectCurrentUser,
    hidden: SelectCartHidden
});
const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);