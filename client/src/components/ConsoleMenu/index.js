import React, { useEffect } from 'react';
import { UPDATE_CONSOLES, UPDATE_CURRENT_CONSOLE } from "../../utils/actions";
import { useQuery } from '@apollo/client';
import { useStoreContext } from "../../utils/GlobalState";
import { QUERY_CONSOLES } from '../../utils/queries';

function ConsoleMenu({ }) {
  const [state, dispatch] = useStoreContext();
  const { consoles } = state;
  const { data: consoleData } = useQuery(QUERY_CONSOLES);
  // const consoles = consoleData?.consoles || [];

  useEffect (() => {
    //if consoleData exists or has changed from the response of useQuery, then run dispatch()
    if (consoleData) {
      // execute dispatch function with action object indicating the type of action and the data to set state for consoles to 
      dispatch({
        type: UPDATE_CONSOLES, 
        consoles: consoleData.consoles
      });
    }
  }, [consoleData, dispatch])

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CONSOLE, 
      currentConsole: id
    });
  };

  return (
    <div>
      <h2>Select a Console:</h2>
      {consoles.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default ConsoleMenu;