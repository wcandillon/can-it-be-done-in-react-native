export interface Story {
  id: string;
  source: number;
  user: string;
  avatar: number;
  video?: number;
}

export type SnapchatRoutes = {
  Snapchat: undefined;
  Story: { story: Story };
};
