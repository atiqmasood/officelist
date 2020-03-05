import React from 'react';
import OfficeTableList from "./components/OfficeTableList";
import { Container } from "@material-ui/core";

const styles = {
    main: {
        marginTop: '2rem'
    }
};

function App() {
  return (
    <Container style={styles.main}>
        <h3>List of Office(s)</h3>
        <OfficeTableList/>
    </Container>
  );
}

export default App;
