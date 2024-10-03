import styled, { css } from "styled-components";

export const NavOuterContainer = styled.nav`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 50;
    height:65px;
    padding: 0.25rem 2.5rem;
    backdrop-filter: blur(10px);
    border-bottom: 2px solid var(--gray-200);
`;

export const NavInnerContainer = styled.div`
    max-width: 1250px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const BostaText = styled.h1`
  color: #E30613;
  font-size: 28px;
  font-weight: 900;
  @media (max-width: 756px) {
    font-size: 20px;
  }
`;
export const LogoImg = styled.img`
  height:54px;
  width:54px;
  @media (max-width: 756px) {
  height:50px;
  width:50px;  }
`;
export const NavMenu = styled.div<{ isMobVis?: boolean }>`
  display: flex;
  gap: 28px;

  ${(props) =>
    !props.isMobVis &&
    css`
      @media (max-width: 768px) {
        display: none;
      }
    `}
`;

export const NavItem = styled.h3<{ isSlected?: boolean }>`
  color: ${(props) =>props.isSlected?'#E30613;':'black;'}
  cursor: pointer;
  font-size: 18px;
  position: relative;
  
  @media (max-width: 756px) {
    font-size: 16px;
  }
  &:hover {
    color: #E30613;
  }
`;

export const NavItemRed = styled(NavItem)`
  color: #E30613;
  font-weight: bold;

`;

export const MainContainer = styled.div`
    max-width: 1250px;
    margin: 0 auto;
    display: flex;
    flex-direction:column;
    padding: 2.5rem 1rem;
    align-items: center;
    gap:14px;
    justify-content: space-between;
`;

export const FormHolder =styled.form <{ isAR?: boolean }>`
    width:250px;
    height:120px;
    display: flex;
    flex-direction:column;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--gray-300);
    border-radius:8px;
    background: white;
    position: absolute;
    top: 80%;
    ${(props) =>props.isAR?'right:69%;':'left:71%;'}
    
    input{
    border: 1px solid var(--gray-300);
    border-radius:6px;
    width:100%;
    padding:6px;
    }


`
export const ButtonHolder = styled.div`
  width: 100%;
  align-items: center;
  justify-content: flex-right;

  button {
    background: #E30613;
    color: white;
    width: 40%;
    padding: 6px;
    border-radius: 6px;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8; 
    }
  }
`;
