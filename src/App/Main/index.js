import React from 'react';
import { container } from './Main.css';
import Options from '../Options';
import Droplist from '../../modules/Inputs/Droplist';
import Toggle from '../../modules/Inputs/Toggle';
import Checkbox from '../../modules/Inputs/Checkbox';
import TextInput from '../../modules/Inputs/TextInput';


const Main = () => (
  <main className={container} >
    <Options />
    <h2>myPhyIDs</h2>
    <Droplist />
    <Toggle isActive />
    <Checkbox />
    <TextInput />
  </main>
);

export default Main;
