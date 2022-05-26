import React, { useState } from 'react';
import styled from 'styled-components';

import { useCreateIssue } from '../hooks';

import Row from '../components/Row';
import Column from '../components/Column';
import Spinner from '../components/Spinner';

// =============================================================================
// Styled Components
// =============================================================================

const Header = styled(Column).attrs({
  padding: '20px',
})`
  border-bottom: 2px solid #e8e8e8;
`;

const Body = styled(Column).attrs({ justify: 'space-between' })`
  padding: 20px;
  background-color: ghostwhite;
  border-radius: 0 0 14px 14px;
`;

const Title = styled.h2`
  margin: 0 15px 0 0;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 5px;
`;

const Input = styled.input`
  font-size: 14px;
  padding: 12px 12px;
  color: black;
  border-width: 1px;
  border-style: solid;
  border-color: #d1d1d1;
  border-radius: 6px;
  background-color: #fff;
  &:focus {
    outline-width: 3px;
    outline-style: solid;
    outline-color: #f9d4f6;
    border-color: #f774ee;
  }
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #d1d1d1 inset !important;
    -webkit-text-fill-color: #f774ee;
  }
`;

const StyledButton = styled.button`
  position: relative;
  cursor: pointer;
  display: block;
  color: #fff;
  padding: 10px;
  font-weight: 600;
  background-color: #ef70e2;
  border-color: #bc49b1;
  box-shadow: 0 2px 0 0 #bc49b1;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  border-width: 2px;
  border-style: solid;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  overflow: visible;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  transform: translateY(0);
  &:hover {
    background-color: #d660c8;
    border-color: #bc47af;
    box-shadow: #bc47af;
  }
  &:focus-visible:not(:active) {
    outline-width: 3px;
    outline-style: solid;
    outline-color: #f9d4f6;
  }
  &:active {
    box-shadow: 0 0 0 0 #bc47af;
    transform: translateY(0.14rem);
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;

// =============================================================================
// Constants
// =============================================================================

const DEFAULT_FORM_STATE = {
  title: '',
  comment: '',
};

// =============================================================================
// Main Component
// =============================================================================

const AddIssue = () => {
  const [formState, setFormState] = useState(DEFAULT_FORM_STATE);

  const { mutate: createIssue, isLoading } = useCreateIssue();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.title || !formState.comment) {
      console.error('An issue title and comment must be provided');
      return;
    }
    createIssue(formState);
  };

  return (
    <>
      <Header>
        <Title>Add an issue</Title>
      </Header>
      <Body>
        <form onSubmit={handleSubmit}>
          <Column>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter a title..."
              value={formState.title}
              onChange={handleChange}
            />
          </Column>
          <Column margin="15px 0">
            <Label htmlFor="comment">Comment</Label>
            <Input
              type="text"
              id="comment"
              name="comment"
              placeholder="Enter some text..."
              value={formState.comment}
              onChange={handleChange}
            />
          </Column>
          <Row justify="flex-end">
            <StyledButton type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Add issue'}
            </StyledButton>
          </Row>
        </form>
      </Body>
    </>
  );
};

export default AddIssue;
