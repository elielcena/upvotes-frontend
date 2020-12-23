import styled from 'styled-components';
import { HTMLAttributes } from 'react';

interface IModalCreatePost extends HTMLAttributes<HTMLElement> {
  open: boolean;
}

export const Container = styled.div<IModalCreatePost>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: absolute;
  width: 100%;
  height: 100%;
  background: red;
  top: 0;
  left: 0;
  background-color: rgba(113, 113, 113, 0.5);
  z-index: 999;
  justify-content: flex-end;
`;

export const Content = styled.div`
  width: 600px;
  height: 100%;
  background: #f6f6f6;
  padding: 35px;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ccc;
  }

  > h3 {
    margin: 0px 0px 20px 7px;
  }

  > form {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    label {
      flex-basis: 100%;
      font-size: 14px;
      display: block;
      margin: 20px 0px 0px 7px;
      font-weight: 500;
    }

    input {
      height: 45px;
      width: 100%;
      border-radius: 7px;
      color: #666360;
      padding: 0 18px;
      border: 2px solid #f4f4f4;
    }

    textarea {
      height: 100%;
      width: 100%;
      border-radius: 7px;
      color: #666360;
      padding: 10px 18px;
      border: 2px solid #f4f4f4;
    }

    button {
      margin-left: 10px;
      font-size: 14px;
    }

    span {
      color: #f96359;
      font-size: 13px;
      display: inline-block;
      bottom: -25px;
      position: absolute;
      left: 4px;
    }
  }

  > button {
    margin-top: 30px;
  }
`;
