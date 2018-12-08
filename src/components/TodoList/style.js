import styled from "styled-components";

export const StyledInputEdit = styled.input`
  position: relative;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
`;

// export const StyledInputEdit = styled.input`
//   bottom: 0px;
//   box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 5px 0px inset;
//   color: rgb(33, 37, 41);
//   display: block;
//   height: 59px;
//   left: 0px;
//   position: relative;
//   right: 0px;
//   text-decoration: none solid rgb(33, 37, 41);
//   text-size-adjust: 100%;
//   top: 0px;
//   width: 506px;
//   z-index: 2;
//   column-rule-color: rgb(33, 37, 41);
//   perspective-origin: 253px 29.5px;
//   transform-origin: 253px 29.5px;
//   caret-color: rgb(33, 37, 41);
//   border: 1px solid rgb(153, 153, 153);
//   font: normal normal 400 normal 24px / 33.6px -apple-system, BlinkMacSystemFont,
//     "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
//     "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
//   list-style: none outside none;
//   margin: 0px 0px 0px 43px;
//   outline: rgb(33, 37, 41) none 0px;
//   padding: 12px 16px;
// `;

// export const StyledCheckbox = styled.input`
//   bottom: 0px;
//   cursor: default;
//   display: block;
//   height: 58px;
//   left: 0px;
//   opacity: 0;
//   position: absolute;
//   right: 510px;
//   text-align: center;
//   text-size-adjust: 100%;
//   top: 0px;
//   width: 40px;
//   perspective-origin: 20px 29px;
//   transform-origin: 20px 29px;
//   background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box
//     border-box;
//   border: 0px none rgb(0, 0, 0);
//   font: normal normal 400 normal 24px / 36px -apple-system, BlinkMacSystemFont,
//     "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
//     "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
//   list-style: none outside none;
//   padding: 0px;
// `;

export const StyledInputCheckbox = styled.input`
  /* .todo-list-item .toggle */
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
  opacity: 0;
`;

export const StyledButtonDestroy = styled.button`
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
  display: none; /* Invisible when container list item is unhovered */
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
    content: "×";
  }
`;

export const StyledLabelTitle = styled.label`
  /*
		Firefox requires _#_ to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the _#_ - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;

  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;

  margin-bottom: 0;

  ${props =>
    props.isCompleted
      ? `color: #d9d9d9;
text-decoration: line-through;
background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
`
      : ""};
`;

export const StyledListItem = styled.li`
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
`;

export const StyledUnorderedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledDiv = styled.div`
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
`;
