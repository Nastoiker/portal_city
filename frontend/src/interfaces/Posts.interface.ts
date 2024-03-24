export interface IPost {
  id: number;
  title: string;
  userId: number;
  description: string;
  rejection: string;
  isResolved: boolean;
  isPublished: boolean;
  pictureBefore?: string;
  updatedAt: string;
  pictureAfter?: string;
  createdAt: string;
}
