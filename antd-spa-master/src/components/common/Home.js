import React from 'react';
import {Redirect} from 'react-router-dom';
import Static from '../static/Static';
export default class Home extends React.Component {

  render() {
    return (
      Static.school==null ? <Redirect  to="/login" />:<Redirect  to="/app" />
    );
  }
}
