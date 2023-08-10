import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const ButtonContainer = styled.div`
  display: ${props => (props.device === 'mobile' ? 'none' : 'flex')};
  flex: ${props => (props.flex ? props.flex : '1')};
  align-items: flex-end;

  @media (max-width: 820px) {
    display: flex;
  }

  & a,
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props => (props.padding ? props.padding : '1.2em')};
    width: ${props => (props.size ? props.size : '3.9em')};
    height: ${props => (props.size ? 'auto' : '3.9em')};
    border: none;
    border-radius: ${props =>
      props.borderRadius ? props.borderRadius : '1.4em'};
    background: ${props => (props.active ? '#2070c6' : '#373737')};
    box-shadow: ${props =>
      props.active ? 'rgba(32, 112, 198, 0.7) 0 0 10px' : null};
    aspect-ratio: 1/1;
    transition: 0.3s ease-in-out all;
    cursor: pointer;

    @media (max-width: 820px) {
      padding: 0.7em;
    }
  }

  & svg {
    fill: ${props => (props.active ? '#fff' : '#737373')};
    transition: 0.3s ease-in-out all;
  }

  & button:hover,
  a:hover {
    background: #2070c6;
    box-shadow: rgba(32, 112, 198, 0.7) 0 0 10px;
    opacity: 0.8;
  }

  & a:hover svg {
    fill: #fff;
  }
`
