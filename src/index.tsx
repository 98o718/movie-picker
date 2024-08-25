/* @refresh reload */
import { render } from 'solid-js/web';

import './index.scss';

import { App } from './components/app';

const root = document.getElementById('root');

render(() => <App />, root!);
