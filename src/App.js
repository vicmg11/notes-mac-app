import './App.css';
import Index from './pages/index';
import { NoteProvider } from '../src/components/NoteContext';

function App() {
  return (
    <NoteProvider className="App ">
      <Index />
    </NoteProvider>
  );
}

export default App;
