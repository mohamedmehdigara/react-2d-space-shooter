import React from 'react';
import styled from 'styled-components';

const HealthBarWrapper = styled.div`
  width: 100%;
  background-color: #ccc;
`;

const HealthBarFill = styled.div`
  width: ${(props) => props.healthPercentage}%;
  height: 20px;
  background-color: #00ff00;
`;

const HealthBar = ({ health, maxHealth }) => {
  const healthPercentage = (health / maxHealth) * 100;

  return (
    <HealthBarWrapper>
      <HealthBarFill healthPercentage={healthPercentage} />
    </HealthBarWrapper>
  );
};

export default HealthBar;
