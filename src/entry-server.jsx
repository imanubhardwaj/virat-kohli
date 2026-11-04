import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import App from './App.jsx';
import InningsPage from './pages/InningsPage.jsx';
import { innings } from './data';
import { homeHead, inningsHead, notFoundHead, heroPreload, inningsPath } from './seo.js';

export const renderHome = () => renderToString(<App />);
export const renderInnings = i => renderToStaticMarkup(<InningsPage i={i} />);
export { innings, homeHead, inningsHead, notFoundHead, heroPreload, inningsPath };
