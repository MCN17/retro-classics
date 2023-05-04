import React, { useEffect } from 'react';
import { UPDATE_CONSOLES, UPDATE_CURRENT_CONSOLE } from "../../utils/actions";
import { useQuery } from '@apollo/client';
import { useStoreContext } from "../../utils/GlobalState";
import { QUERY_CONSOLES } from '../../utils/queries';
import { idbPromise } from "../../utils/helpers";

// import bootstrap components
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ConsoleMenu() {
  const [state, dispatch] = useStoreContext();
  const { consoles } = state;
  const { loading, data: consoleData } = useQuery(QUERY_CONSOLES);
  // const consoles = consoleData?.consoles || [];

  useEffect (() => {
    //if consoleData exists or has changed from the response of useQuery, then run dispatch()
    if (consoleData) {
      // execute dispatch function with action object indicating the type of action and the data to set state for consoles to 
      dispatch({
        type: UPDATE_CONSOLES, 
        consoles: consoleData.consoles
      });
      consoleData.consoles.forEach(console => {
        idbPromise("consoles", "put", console);
      })
    } else if (!loading) {
      idbPromise("consoles", "get").then(consoles => {
        dispatch({
          type: UPDATE_CONSOLES, 
          consoles: consoles
        });
      });
    }
  }, [consoleData, loading, dispatch])

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CONSOLE, 
      currentConsole: id
    });
  };

  return (
    <Row className="justify-content-center">
      <h2 className="text-center">Select a Console:</h2>
      <Col className="text-center" lg={4}>
      {consoles.map((item) => (
        <Button className="m-1"
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </Button>
      ))}
      </Col>
    </Row>
  );
}

export default ConsoleMenu;