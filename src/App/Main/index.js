import React from 'react';
import { getJson } from '../../modules/callApi';
import { container } from './Main.css';
import Options from '../Options';
import BeaconList from '../BeaconList';

class Main extends React.Component {
  // NOTE: Storing authentication data, behaviors in Main component
  // for demonstration purposes only.
  constructor() {
    super();
    this.state = {
      token: null,
      email: 'testing.demo@phy.net',
      password: 'testing.demo',
    };
  }

  componentDidMount() {
    const { email, password } = this.state;

    getJson('api/v2/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }, (response) => {
      // console.log(response, this);
      this.setState({
        token: response,
      });
    });
  }

  render() {
    const { token } = this.state;
    return (
      <main className={container} >
        <Options />
        {/* Mocking authentication */}
        { token && <BeaconList token={token} /> }
      </main>
    );
  }
}

export default Main;
