import { Box, Text } from "@radix-ui/themes";
import styled from "styled-components";
import { IPost } from "../../interfaces/Posts.interface";
import { useDeletePost } from "./Actions/useCrudPost";
import { ActionsPost } from "./ActionsPost";

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
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const apiUrl = "http://localhost:5544";
const WrapperBottom = styled.div`
  dispay: flex;
  flex-wrap: wrap;
`;
export const Post = ({
  id,
  title,
  description,
  pictureBefore,
  isResolved,
  pictureAfter,
  rejection,
}: IPost) => {
  const { deletePost } = useDeletePost();

  return (
    <PostWrapper>
      <Title>{title}</Title>
      <Title>{isResolved}</Title>
      <Body>{description}</Body>
      {pictureBefore && (
        <>
          <Text>Фотография до</Text>
          <Image src={apiUrl + pictureBefore} alt="Фото поста"></Image>
        </>
      )}
      {pictureAfter && (
        <>
          <Text>Фотография после</Text>
          <Image src={apiUrl + pictureAfter} alt="Фото поста"></Image>
        </>
      )}
      <WrapperBottom>
        <ActionsPost onDelete={() => deletePost(id)} />
        <Text>{isResolved ? "Разрешено" : "Не разрешено"}</Text>
        {rejection && (
          <Box>
            <Text>Отказано</Text>
            <br />
            <Text>Причина отказа: {rejection}</Text>
          </Box>
        )}
      </WrapperBottom>
    </PostWrapper>
  );
};
