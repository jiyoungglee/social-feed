import { createContext, useReducer } from "react";

export const Actions = {
  UPDATE: 'UPDATE',
  RESET: 'RESET'
}

export const initialState = {}

const reducer = (state, {type, payload}) => {
    switch(type) {
      case Actions.UPDATE:
        return {
          ...state,
          userId: payload.userId,
        }
      case Actions.RESET:
        return {userId: null};
      default: return state;
    }
}

export const UserContext = createContext(initialState);

export default function UserContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch };
  console.log(state)

  return(
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}
