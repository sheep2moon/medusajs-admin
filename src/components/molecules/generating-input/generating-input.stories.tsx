import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import GeneratingInput from "."

export default {
  title: "Molecules/GeneratingInput",
  component: GeneratingInput,
} as ComponentMeta<typeof GeneratingInput>

const Template: ComponentStory<typeof GeneratingInput> = (args) => (
  <GeneratingInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: "Kod",
  required: true,
  placeholder: "FISHING15",
}

export const HasValue = Template.bind({})
HasValue.args = {
  label: "Code",
  required: true,
  placeholder: "FISHING15",
  value: "LATO2k22",
}
