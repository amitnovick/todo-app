import React from 'react';

const screenLayout = {
  maxWidth: '550px',
  minWidth: '230px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const CommonBodyLayout = ({ BodyComponent }) => (
  <div style={screenLayout}>{BodyComponent}</div>
);

export default CommonBodyLayout;
