import React, { useState } from 'react';
import styled from 'styled-components';

import Row from '../components/Row';
import Column from '../components/Column';

// =============================================================================
// Styled Components
// =============================================================================

const Island = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 20px;
  border-radius: 16px;
  border-width: 2px 2px 4px;
  border-style: solid;
  border-color: #e8e8e8;
  max-width: 600px;
`;

const IslandHeader = styled(Row).attrs({
  align: 'flex-start',
  margin: '0 0 30px 0',
})``;

const IslandBody = styled(Column).attrs({
  align: 'center',
})``;

const Title = styled.h2`
  margin: 0 15px 0 0;
`;

// =============================================================================
// Main Component
// =============================================================================

const AddIssue = () => {
  const [formState, setFormState] = useState({
    title: '',
    comment: '',
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <Island>
      <IslandHeader>
        <Title>Add an issue</Title>
      </IslandHeader>
      <IslandBody>
        <form>
          <input type="text" name="title" value={formState.title} onChange={handleChange} />
          <input type="text" name="comment" value={formState.comment} onChange={handleChange} />
          <button type="submit">Add issue</button>
        </form>
      </IslandBody>
    </Island>
  );
};

export default AddIssue;
