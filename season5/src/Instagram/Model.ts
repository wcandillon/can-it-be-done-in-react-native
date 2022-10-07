export interface Story {
  id: string;
  source: number;
  user: string;
  avatar: number;
  video?: number;
}

export type InstagramRoutes = {
  Home: undefined;
  Story: { story: Story };
};
