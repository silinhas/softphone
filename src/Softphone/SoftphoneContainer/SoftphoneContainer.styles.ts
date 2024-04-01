import styled from "styled-components";

interface Props {
  $styles: {
    width: "100px";
    height: "100px";
  };
}

const SoftphoneContainer = styled.div<Props>`
  width: ${({ $styles }) => $styles.width};
  height: ${({ $styles }) => $styles.height};
`;

export default SoftphoneContainer;
