import styled from "styled-components";
import { IPost } from "../../interfaces/Posts.interface";

const PostWrapper = styled.div`
  margin: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid green;
`;
const Title = styled.h2`
  font-size: 16px;
`;
const Body = styled.p`
  font-size: 12px;
`;
export const Post = ({ title, description }: Partial<IPost>) => {
  return (
    <PostWrapper>
      <Title>{title}</Title>
      <Body>{description}</Body>
    </PostWrapper>
  );
};
