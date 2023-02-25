import React, { useState, } from "react";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

// interface SystemContextProps {
// 	passwd: string;
// 	setPasswd: (passwd: string) => void;
// }

export const SystemContext = React.createContext({
  passwd: "",
  setPasswd: (passwd: string) => {},
  permissionDenied: false,
  setPermissionDenied: (perm: boolean) => {},
  execCommand: "",
  setExecCommand: (cmd: string) => {}
});

export const SystemProvider = (props: { children: React.ReactNode }): JSX.Element => {
  const [passwd, setPasswd] = useState("");
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [execCommand, setExecCommand] = useState("");

  return (
    <SystemContext.Provider value={{
      passwd,
      setPasswd,
      permissionDenied,
      setPermissionDenied,
      execCommand,
      setExecCommand
    }}>
      {props.children}
    </SystemContext.Provider>
  );
};
