import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Input } from "./Input";

const meta = {
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "number", "email", "password"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    value: "",
    label: "Text Input",
    onChange: fn(),
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    value: "",
    label: "Password",
    onChange: fn(),
  },
};

export const WithError: Story = {
  args: {
    type: "email",
    placeholder: "Enter email...",
    value: "invalid-email",
    label: "Email",
    error: "Please enter a valid email address",
    onChange: fn(),
  },
};

export const WithInteraction: Story = {
  args: {
    type: "text",
    placeholder: "Type something...",
    value: "",
    label: "Interactive Input",
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await userEvent.type(input, "Hello, Storybook!");
    await expect(input).toHaveValue("Hello, Storybook!");

    await userEvent.clear(input);
    await expect(input).toHaveValue("");
  },
};

export const NumberInput: Story = {
  args: {
    type: "number",
    placeholder: "Enter amount...",
    value: "",
    label: "Amount",
    onChange: fn(),
  },
};
