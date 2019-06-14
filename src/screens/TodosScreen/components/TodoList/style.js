// import styled from 'styled-components';
import { css } from 'emotion';
import hash from '@emotion/hash';

export const liStyle = css`
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
`;

// export const StyledLi = styled.li`
//   position: relative;
//   font-size: 24px;
//   border-bottom: 1px solid #ededed;
// `;

export const liClassHash = hash('todo-list-item');

export const buttonStyle = css`
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  font-size: 30px;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;

  :hover {
    color: #af5b5e;
  }

  :after {
    content: '×';
  }

  .${liClassHash}:hover & {
    display: block;
  }
`;

// export const StyledButton = styled.button`
//   padding: 0;
//   border: 0;
//   background: none;
//   vertical-align: baseline;
//   font-family: inherit;
//   font-weight: inherit;
//   font-size: 30px;
//   -webkit-appearance: none;
//   appearance: none;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   display: none;
//   position: absolute;
//   top: 0;
//   right: 10px;
//   bottom: 0;
//   width: 40px;
//   height: 40px;
//   margin: auto 0;
//   color: #cc9a9a;
//   margin-bottom: 11px;
//   transition: color 0.2s ease-out;

//   :hover {
//     color: #af5b5e;
//   }

//   :after {
//     content: '×';
//   }

//   ${StyledLi}:hover & {
//     display: block;
//   }
// `;

export const input1Style = css`
  text-align: center;
  width: 40px;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  -webkit-appearance: none;
  appearance: none;
  opacity: 0;
`;

export const input2Style = css`
  position: relative;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 1px solid #999;
  color: inherit;
  padding: 12px 16px;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: block;
  width: 506px;
  margin: 0 0 0 43px;
`;

export const ulStyle = css`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const divStyle = css`
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
`;

export const labelStyle = css`
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center left;
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  margin-bottom: 0;
`;
