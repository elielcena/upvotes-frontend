import styled, { css } from 'styled-components';
import Carousel from 'react-elastic-carousel';
import { colorGrayLight, colorBlack, colorPrimary } from '../../styles/colors';

interface IMonth {
  selected: boolean;
}

interface IDay {
  selected: boolean;
}

interface ICalendarDay {
  isLoading: boolean;
}

interface IPosts {
  isLoading: boolean;
}

export const Container = styled.main`
  width: 100%;
  margin: 45px auto 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Content = styled.div`
  flex: 1;
  padding: 0px 40px;
`;

export const ContentHeader = styled.div`
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  > div {
    h1 {
      margin-bottom: 15px;
    }

    p {
      font-size: 14px;
      color: ${colorPrimary};
    }
  }

  button {
    background: #fdcd88;
    color: #000;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    padding: 9px 23px;
  }
`;

export const CalendarMonth = styled(Carousel)`
  height: 50px;
  margin-top: 25px;

  > div {
    text-align: center;
  }

  /* Slider */
  .rec-item-wrapper {
    /* width: 120px !important; */
  }
  .rec-arrow {
    display: none;
  }
  .rec-pagination {
    display: none;
  }
`;

export const Month = styled.div<IMonth>`
  width: 100%;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  color: #ababab;
  text-align: center;

  ${({ selected }) =>
    selected &&
    css`
      color: ${colorPrimary};
    `}
`;

export const CalendarDay = styled.div<ICalendarDay>`
  width: 100%;
  position: relative;
  margin-top: 25px;

  > div {
    text-align: center;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      display: none;
    `}

  /* Slider */
  .rec-item-wrapper {
    /* width: 120px !important; */
  }
  .rec-arrow {
    display: none;
  }
  .rec-pagination {
    display: none;
  }
`;

export const Day = styled.div<IDay>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
  padding-bottom: 20px;

  strong {
    margin-bottom: 7px;
    font-weight: bold;
    background: ${colorGrayLight};
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  span {
    font-size: 15px;
    color: #c3c3c3;
  }

  strong {
    background: #fee5bc;
    color: ${colorBlack};
  }

  ${({ selected }) =>
    selected &&
    css`
      border-bottom: 2px solid #b9b9b9;
      strong {
        background: ${colorPrimary};
        color: #fff;
      }
    `}
`;

export const IPosts = styled.div<IPosts>`
  height: 70vh;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #dcf4ff;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      display: none;
    `}

  ul {
    width: 100%;
    position: relative;
    border-top: 2px solid ${colorGrayLight};
    padding-top: 15px;
    cursor: grab;
  }

  li {
    margin-top: 10px;
    height: auto;
  }

  > div {
    display: flex;
    flex: 1;
    align-items: center;
    margin: 0 0 0 80px;
  }

  > div button img {
    padding: 0;
    margin: 0;
  }

  > div strong {
    padding: 0;
    margin-left: -20px;
  }
`;

export const Post = styled.li`
  display: flex;
  align-items: center;
  height: 70px;
  position: relative;

  > span {
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    align-self: center;
  }

  > span span {
    margin-top: 5px;
    font-size: 12px;
    color: ${colorPrimary};
  }

  > div {
    flex: 1;
    position: relative;
    background: #eff0f2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 7px;
    padding: 10px 15px;

    .left {
      height: 100%;
      display: flex;

      strong {
        text-indent: 2.5em;
        font-size: 15px;
        margin-bottom: 15px;
        display: block;
      }

      p {
        text-indent: 3em;
        font-size: 13px;
        color: #97989a;
        width: 76vw;
        line-height: 1.7;
        word-wrap: break-word !important;
      }
    }

    .right {
      display: flex;
      align-items: center;

      svg {
        cursor: pointer;
        margin-left: 15px;
      }
    }
  }

  > div {
    background: #dcf4ff;
  }
  > span {
    color: #53c7fa;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(76, 207, 251, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(76, 207, 251, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(76, 207, 251, 0);
    }
  }
`;
