import './App.css'
import { useCatalogController } from './controllers/useCatalogController.jsx'
import CatalogView from './views/CatalogView'

function App() {
  const controller = useCatalogController()

  return <CatalogView {...controller} />
}

export default App
