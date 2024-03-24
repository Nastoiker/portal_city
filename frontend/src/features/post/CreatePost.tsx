import { Text } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { UpdateAvatarProfile } from "../../components/UploadImage/UploadImage";
import api from "../../helpers/axios";
import { IPost } from "../../interfaces/Posts.interface";

type PostCreate = Pick<IPost, "picture" | "title" | "description">;
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem auto;
  width: 600px;
`;
export const CreatePostForm = () => {
  const { register, handleSubmit, setValue, reset, watch } =
    useForm<PostCreate>();
  const file = watch("picture");
  const onDropPicture = (file: any) => {
    setValue("picture", file);
  };
  const [message, setMessage] = useState<string>("");
  const onSubmit = async (createdPost: PostCreate) => {
    const formData = new FormData();
    formData.append("file", createdPost?.picture);
    formData.append("title", createdPost?.title);
    formData.append("description", createdPost?.description);
    try {
      const createdPost = await api.post("/posts", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data;",
        },
      });
      setMessage("Запись создана");
      reset();
    } catch (e: any) {
      setMessage("Ошибка");
      console.log(e?.message?.error);
    }
  };
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <h1>Создание записи</h1>

      <Input
        placeholder="Заголовок"
        {...register("title", {
          required: { value: true, message: "Заполните title" },
        })}
        name="title"
      />
      <Input
        placeholder="Описание"
        {...register("description", {
          required: { value: true, message: "Заполните description" },
        })}
        name="description"
      />
      <UpdateAvatarProfile onSelectFile={(e) => onDropPicture(e)} />
      <Text> {message}</Text>
      <Button type="submit">Создать запись</Button>
    </Wrapper>
  );
};
