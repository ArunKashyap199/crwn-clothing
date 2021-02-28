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

// Styles Import
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles.jsx';

const Header = ({currentUser, hidden}) => (
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
                    <OptionLink as='div' onClick={() => auth.signOut()}>
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

export default connect(mapStateToProps)(Header);