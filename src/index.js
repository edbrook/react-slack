import React from 'react';
import ReactDOM from 'react-dom';
import Slack from './Slack';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<Slack />, document.getElementById('root'));
registerServiceWorker();