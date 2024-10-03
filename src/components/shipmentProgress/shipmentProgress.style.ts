import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid var(--gray-300);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 250px;
  gap: 10px;
`;
export const TextContainer = styled.div`
  padding: 24px;
  height: 40%;
  width: 100%;
  display: grid;
  border-bottom: 1px solid var(--gray-300);
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
`;
export const TextHolder = styled.div<{
  isCancelled?: boolean;
  isFinished?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    color: var(--gray-600);
    font-size: 16px;
  }
  h2 {
    color: ${(props) =>
      props.isCancelled
        ? "#E30613"
        : props.isFinished
          ? "#16a34a"
          : "var(--gray-800)"};
    font-size: 18px;
    font-weight: 650;
  }
  @media (max-width: 768px) {
    p {
      font-size: 12px;
    }
    h2 {
      font-size: 12px;
    }
  }
`;
export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding-buttom: 10px;
`;

export const Step = styled.div<{ isCancelled?: boolean }>`
  padding-left: 6px;
  color: white;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;

  .step-number {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 12px;
    background-color: white;
    border: 1px solid var(--gray-300);
    color: var(--gray-300);
  }

  .step-name {
    font-size: 1rem;
    font-weight: 650;
    color: var(--gray-500);
    padding-right: 5px;
    padding-left: 12px;
  }

  &.active .step-number {
    font-weight: bold;
    color: white;
    background-color: ${(props) => (props.isCancelled ? "#E30613" : "#16a34a")};
    border: 1px solid ${(props) => (props.isCancelled ? "#E30613" : "#16a34a")};
  }

  &.complete .step-number {
    color: white;
    background-color: ${(props) => (props.isCancelled ? "#E30613" : "#16a34a")};
    border: 1px solid ${(props) => (props.isCancelled ? "#E30613" : "#16a34a")};
    padding: 5px;
  }

  &.complete .step-name {
    color: var(--gray-800);
  }

  &.active .step-name {
    color: var(--gray-800);
  }

  @media (max-width: 768px) {
    .step-number {
      font-size: 1rem;
      margin-top: 15px;
    }

    .step-name {
      font-size: 0.75rem;
    }
  }
`;

export const ProgressBar = styled.div`
  position: absolute;
  top: 38%;
  left: 0;
  right: 0;
  height: 8px;
  background-color: lightgray;
  z-index: 0;
`;

export const Progress = styled.div<{ isCancelled?: boolean }>`
  height: 100%;
  background-color: ${(props) => (props.isCancelled ? "#E30613;" : "#16a34a;")};
`;
