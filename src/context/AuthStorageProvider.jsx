import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "REMOVE_TOKEN":
      return {
        ...state,
        token: null,
      };
  }
};

const AuthStorageProvider = ({ authStorage, children }) => {
  const [state, dispatch] = useReducer(reducer, {
    token: null,
  });
  return (
    <AuthStorageContext.Provider value={value}>
      {children}
    </AuthStorageContext.Provider>
  );
};
