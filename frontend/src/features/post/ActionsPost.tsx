import styled from "styled-components";
import Button from "../../components/Button/Button";

const StyledButton = styled(Button)`
  color: red;
  border: red;
  border-radius: 25px;
`;
type ActionsPostProps = {
  onDelete: () => void;
};
export const ActionsPost = ({ onDelete }: ActionsPostProps) => {
  return (
    <div>
      <StyledButton onClick={onDelete}>Удалить</StyledButton>
    </div>
  );
};
