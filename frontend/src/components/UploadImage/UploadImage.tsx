import { ChangeEvent, useState } from "react";
import { UploadImageProps } from "./uploadImage.prop";
export const UpdateAvatarProfile = ({
  className,
  onSelectFile,
}: UploadImageProps) => {
  const [error, setError] = useState<string>();
  const [onDrag, setOnDrag] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>();

  const onDrop = (e: any) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    onSelectFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    setOnDrag(true);
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    onSelectFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    setOnDrag(true);
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();

    setOnDrag(false);
  };
  return (
    <div className={className}>
      <div
        onDrop={onDrop}
        className="w-full mx-auto"
        onDragOver={handleDragOver}
      >
        {onDrag ? (
          <div className=" scale-75 bg-sky-700 shadow-xl  bg-blue transition-all duration-300 p-5">
            {" "}
            <div className="mx-auto">
              <img className={"w-48 h-48"} src={selectedFile} alt="" />
            </div>
          </div>
        ) : (
          <div className={"p-9 outline-dashed outline-2 -outline-offset-2"}>
            <div className={"bg-gray-200 m-10 p-5"}>
              <label htmlFor="upload">
                <input
                  id={"upload"}
                  type={"file"}
                  accept={"image/*"}
                  height={100}
                  width={100}
                  className={" w-64 h-64 hidden"}
                  onChange={(e) => handleInput(e)}
                />
                <svg
                  className="m-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="50"
                  height="50"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                </svg>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
