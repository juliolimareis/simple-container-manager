import { useState } from 'react';
import { Button } from '@chakra-ui/react'

const { exec } = window.require("child_process");
const fs = window.require("fs");

const App = () => {
  const [result, setResult] = useState('Hi')

  const command = () => {
    exec('ls', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      setResult(stdout)
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{result}</p>
        <Button onClick={command} colorScheme='teal'>
          Test
        </Button>
      </header>
    </div>
  );
}

export default App;
