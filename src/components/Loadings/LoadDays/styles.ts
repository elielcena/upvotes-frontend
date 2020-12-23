import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  position: relative;
  margin-bottom: 47px;
  margin-top: 25px;

  li {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin: 0 15px;
    animation: pulse 1s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
`;
