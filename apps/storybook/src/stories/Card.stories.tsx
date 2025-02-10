import type { Meta, StoryObj } from "@storybook/react";
import Card from "@repo/ui/Card";

const meta = {
  title: "UI/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Card",
    category: "Category",
    description: "Description",
    imageUrl: "https://via.placeholder.com/300",
    price: 100,
  },
};
