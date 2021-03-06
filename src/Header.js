import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as api from './lib/api';

import { Link } from 'react-router-dom'
import './header.scss';


class Header extends Component {
  async componentDidMount(){
    const { dispatch } = this.props;
      await api.getCart(dispatch)
  }

  render() {
    const {cart, match} = this.props
    return (
      <div className='header'>
        <p>
          맥주담기
        </p>
        <ul className='links'>
          <li >
            <Link className={`links__beers ${match.path === "/beer_list" ? 'on' : ''}`} to={'/beer_list'}>맥주 리스트</Link>
          </li>
          <li>
            <Link className={`links__cart ${match.path === "/cart" || match.path === "/cart_empty" ? 'on' : ''}`} to={`${cart.length > 0 ? '/cart' : '/cart_empty'}`}>
            장바구니
            <div className={`links__cartCnt ${cart.length > 0 ? '' : 'hide'}`}>
              {this.props.cart.length}
            </div>
            </Link>

          </li>
        </ul>
    
      </div>
    )
  }
}
Header.propTypes = {
  cart: PropTypes.array,
  match: PropTypes.object,
};

function states(state) {
 
  return {
      cart: state.cart,
  };
}
// 디스패치와 상태를 주입하려는 컴포넌트를 감싸줍니다.
export default connect(states)(Header);

