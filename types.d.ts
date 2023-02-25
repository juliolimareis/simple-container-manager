import { ChildProcess, ChildProcessWithoutNullStreams, /*ExecException,*/ SpawnOptionsWithoutStdio, } from "child_process";

declare global {
  interface Container {
    id: string;
    name: string;
    image: string;
    size: string;
    status: string;
    ports: string;
    runningFor: string;
    isRunning: boolean;
  }

  type Exec = (command: string, callback?: (error: /*ExecException |*/ null | string, stdout: string, stderr: string) => void) => ChildProcess;
  type Spawn = (command: string, options?: SpawnOptionsWithoutStdio) => ChildProcessWithoutNullStreams;

  interface ChildProcessProps {
    exec: Exec,
    spawn: Spawn
  }

  // interface ContainerMethods {
  //   container: Container,
  //   tailContainer: ,
  //   stopContainer,
  //   startContainer,
  //   removeContainer,
  //   restartContainer,
  //   disableTerminalLogs,
  //   containerSelectedLogs,
  // }

  interface HandleCommand<T = Container[]> {
    message: T,
    isPermissionDenied: boolean,
  }

}

