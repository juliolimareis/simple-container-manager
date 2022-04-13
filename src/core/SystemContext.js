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
})

export const SystemProvider = ({children}) => {
	const [passwd, setPasswd] = useState('')
	const [permissionDenied, setPermissionDenied] = useState(false)
	
	return (
		<SystemContext.Provider value={{ 
			passwd, setPasswd,
			permissionDenied, setPermissionDenied
		}}>
			{children}
		</SystemContext.Provider>
	)
}
