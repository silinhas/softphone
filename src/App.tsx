import styled from "styled-components";
import { Softphone, SoftphoneProvider } from ".";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const App = () => {
  return (
    <Layout>
      <SoftphoneProvider>
        <Softphone />
      </SoftphoneProvider>
    </Layout>
  );
};

export default App;
