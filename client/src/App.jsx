import '@mantine/core/styles.css';
import { Avatar } from '@mantine/core';
import Navbar from './components/Navbar';


function App() {
  return (

    <>
    <Navbar/>
      {/* With image */}
      <Avatar src="avatar.png" alt="it's me" />

      {/* Default placeholder */}
      <Avatar radius="xl" />

      {/* Letters with xl radius */}
      <Avatar color="cyan" radius="xl">MK</Avatar>

      {/* Custom placeholder icon */}
    
    </>
  );
}

export default App