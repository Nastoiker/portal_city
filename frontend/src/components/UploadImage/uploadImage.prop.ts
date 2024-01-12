import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface UploadImageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onSelectFile: (e: any) => void;
}
