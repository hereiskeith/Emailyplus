import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions/';

const Payments = props => {
  // debugger;

  return (
    <StripeCheckout
      name='Emaily+'
      description='Pay $5 for 5 credits'
      amount={500}
      token={token => props.handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className='btn'>
        Add Credits
      </button>
    </StripeCheckout>
  )
};

export default connect(null, actions)(Payments);