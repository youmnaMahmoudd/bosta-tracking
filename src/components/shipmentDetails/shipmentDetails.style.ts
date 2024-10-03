import styled from "styled-components";

export const ShipmentWrapper = styled.div`
  margin: 20px 0;
  overflow-x: auto;
  width:100%;
  display:flex;
  gap:20px;
  @media (max-width: 768px) {
  flex-direction:column;
  gap:10px;
  justify-content:center;
  align-items:center;
  }

`;
export const Title =styled.h1`
  font-size:1rem;
  padding:7px;
  font-weight:600;
`
export const TableHolder =styled.div`
  flex:1;
  display: flex;
  flex-direction:column;
  gap:8px;
  @media (max-width: 768px) {
  flex:-1;
  }
`
export const StyledTable = styled.table`
  border-collapse: collapse;
  width:100%;
  th, td {
    border: 1px solid var(--gray-300);
    padding: 8px;
    font-size:14px;
  }
  td {
    font-weight: 500;
  }

  th {
    background-color: var(--gray-100);
    font-weight: bold;
    color: var(--gray-600);
  }
`;

export const ShipmentAddressHolder =styled.div`
  width:30%;
  display: flex;
  flex-direction:column;
  gap:8px;
  @media (max-width: 768px) {
    width:95%;
  }
`

export const ShipmentAddress =styled.div`
  border: 1px solid var(--gray-300);
  border-radius:6px;
  padding: 18px;
  height:100px;
  width:100%;
  color:var(--gray-700);

`