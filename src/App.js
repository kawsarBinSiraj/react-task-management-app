import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store, persistor } from './redux-store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/AppLayouts/Header/Header';
import Footer from './components/AppLayouts/Footer/Footer';

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter basename="/">
					<PersistGate loading={null} persistor={persistor}>
						<Header />
						<main id="dashboard">
							<Routes />
						</main>
						<Footer />
					</PersistGate>
					<ToastContainer />
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
