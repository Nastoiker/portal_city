import { Box, Button, TextField } from "@radix-ui/themes";
import { ChangeEvent, useState } from "react";
import { Input } from "../../components/Input/Input";
import { IPost } from "../../interfaces/Posts.interface";
import { useUpdatePost } from "../post/Actions/useCrudPost";
import { Post } from "../post/Post";

export const CheckingPost = ({ ...rest }: IPost) => {
  const [rejectText, setRejectText] = useState<string>("");
  const { updatePost, error, isLoading } = useUpdatePost();
  const [resolvedPicture, setResolvedPicture] = useState();
  const handleReject = () => {
    updatePost({ ...rest, rejection: rejectText });
  };
  const handleResolve = async () => {
    await updatePost({
      ...rest,
      isResolved: true,
      pictureAfter: resolvedPicture,
    });
  };
  return (
    <div>
      <Post {...rest} />
      <Box
        style={{
          background: "green",
          width: "auto",
          margin: "20px",
          borderRadius: "25px",
        }}
      >
        {!rest.rejection && (
          <Box maxWidth="300px">
            <TextField.Root
              size="3"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRejectText(e.currentTarget.value)
              }
              placeholder="Причина отказа"
            />
            <Button onClick={() => handleReject()}>Отказать</Button>
          </Box>
        )}
        {!rest.isResolved && !rest.rejection && (
          <Box maxWidth="300px">
            <Input
              size="3"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRejectText(e.currentTarget.value)
              }
              type="file"
              placeholder="Фотка после"
            />
            <Button onClick={() => handleResolve()}>Разрешить</Button>
          </Box>
        )}
      </Box>
    </div>
  );
};
