import RoutesApp from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="App">
            <ToastContainer autoClose={3000} />
            <RoutesApp />
        </div>
    );
}

export default App;