import styled from "styled-components";

export default {
  StyledBadge: styled.div`
    width: 1rem;
    height: 1rem;
    background-color: ${({ color }) => color};
    border-radius: 50%;
    position: absolute;
    right: 5px;
    bottom: 5px;
    box-shadow: 0 0 0 2px #fff;
  `,
};
