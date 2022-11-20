import styled from 'styled-components';

const Button = styled.button<{ isTrue: boolean }>`
  width: 100px;
  height: 40px;
  color: white;
  font-weight: bold;
  border-radius: 100px;
  background-color: ${({ isTrue }) => (isTrue ? '#E14D2A' : '#3e6d9c')};
  transition: 0.3s;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 30px;
    aspect-ratio: 1 / 1;
    background-color: white;
    left: 7.5px;
    top: calc(50% - 15px);
    border-radius: 50%;
    transform: translateX(${({ isTrue }) => (isTrue ? '55px' : '0')});
    transition: 0.3s;
  }
`;

export default Button;
