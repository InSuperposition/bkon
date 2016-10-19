import React from 'react';
import { container } from './Main.css';
import Options from '../Options';
import BeaconList from '../BeaconList';
import Droplist from '../../modules/Inputs/Droplist';
import Checkbox from '../../modules/Inputs/Checkbox';
import TextInput from '../../modules/Inputs/TextInput';


const Main = () => (
  <main className={container} >
    <Options />
    <h2>myPhyIDs</h2>
    <Droplist />
    <TextInput />
    <BeaconList />
    <Checkbox />

  </main>
);

export default Main;
