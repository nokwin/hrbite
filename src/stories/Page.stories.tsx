import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { LoginPage } from '../modules/auth/pages/login.page';

export default {
  title: 'Pages/Login',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = (args) => (
  <LoginPage {...args} />
);

export const Primary = Template.bind({});
