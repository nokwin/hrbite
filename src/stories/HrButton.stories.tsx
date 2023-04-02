import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HrButton } from '../common/components/hr-button.component';

export default {
  title: 'Component/Button',
  component: HrButton,
} as ComponentMeta<typeof HrButton>;

const Template: ComponentStory<typeof HrButton> = (args) => (
  <HrButton {...args}>This is awesome button</HrButton>
);

export const Primary = Template.bind({});

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
