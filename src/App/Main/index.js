import React from 'react';
import { container } from './Main.css';
import Options from '../Options';
import Droplist from '../../modules/Inputs/Droplist';

const Main = () => (
  <main className={container} >
    <Options />
    <h2>myPhyIDs</h2>
    <Droplist />
  </main>
);

export default Main;
