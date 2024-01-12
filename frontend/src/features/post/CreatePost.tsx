import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { UpdateAvatarProfile } from "../../components/UploadImage/UploadImage";
import { IPost } from "../../interfaces/Posts.interface";
type PostCreate = Pick<IPost, "picture" | "title" | "description">;
export const CreatePostForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<PostCreate>();
  const file = watch("picture");
  const onDropPicture = (file: any) => {
    setValue("picture", file);
  };
  const onSubmit = async (createdPost: PostCreate) => {
    const formData = new FormData();
    formData.append("file", createdPost?.picture);
    formData.append("title", createdPost?.title);
    formData.append("description", createdPost?.description);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("title", {
          required: { value: true, message: "Заполните title" },
        })}
        name="title"
      />
      <Input
        {...register("description", {
          required: { value: true, message: "Заполните description" },
        })}
        name="description"
      />
      <UpdateAvatarProfile onSelectFile={(e) => onDropPicture(e)} />
    </form>
  );
};
