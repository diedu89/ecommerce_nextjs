import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@repo/ui/card";

const meta = {
  title: "UI/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "I am a card.",
    title: "Card",
    href: "https://example.com",
  },
};
