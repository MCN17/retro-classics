import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CONSOLES } from '../../utils/queries';

function ConsoleMenu({ setConsole }) {
  const { data: consoleData } = useQuery(QUERY_CONSOLES);
  const consoles = consoleData?.consoles || [];

  return (
    <div>
      <h2>Select a Console:</h2>
      {consoles.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            setConsole(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default ConsoleMenu;