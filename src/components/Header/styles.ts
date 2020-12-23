import styled from 'styled-components';
import { colorPrimary } from '../../styles/colors';

export const Container = styled.header`
  padding: 13px 0;
  background: #28262e;
  margin-bottom: 20px;

  > div {
    padding: 0 15px;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div,
    > a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 164px;

      p {
        color: #999591;
        margin-bottom: 5px;
        margin-left: 18px;
        font-size: 14px;
      }

      span {
        color: ${colorPrimary};
        margin-left: 18px;
        font-size: 15px;
        display: block;
        width: 100%;
      }
    }

    img {
      width: 45px;
    }

    .icon {
      justify-content: flex-end;
      svg {
        cursor: pointer;
      }
    }

    @media (max-width: 414px) {
      a:nth-child(2) {
        display: none;
      }
    }
  }
`;
