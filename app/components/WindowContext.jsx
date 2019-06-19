import React, { useContext } from "react";

const WindowContext = React.createContext();

export const useWindowContext = () => useContext(WindowContext);

export default WindowContext;
