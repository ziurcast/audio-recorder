import styled from "styled-components";

export const WaveformContianer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 55px;
  width: 100%;
  background: transparent;
  gap: 1rem;
`;

export const Wave = styled.div`
  width: 191px;
  height: 55px;
`;

export const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  background: #efefef;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
  &:hover {
    background: #ddd;
  }
`;
