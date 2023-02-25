import React, { useState } from "react";

// interface SystemContextProps {
// 	passwd: string;
// 	setPasswd: (passwd: string) => void;
// }

export const SystemContext = React.createContext({
  passwd: '',
  setPasswd: (passwd) => {},
  permissionDenied: false,
  setPermissionDenied: (perm) => {},
  execCommand: '',
  setExecCommand: (cmd) => {}
})

export const SystemProvider = ({ children }) => {
  const [passwd, setPasswd] = useState('')
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [execCommand, setExecCommand] = useState('')

  return (
    <SystemContext.Provider value={{
      passwd,
			setPasswd,
      permissionDenied,
			setPermissionDenied,
      execCommand,
      setExecCommand
    }}>
      {children}
    </SystemContext.Provider>
  )
}
