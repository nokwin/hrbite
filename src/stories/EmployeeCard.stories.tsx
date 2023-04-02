import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EmployeeCard } from '../modules/employees/components/employee-card.component';

export default {
  title: 'Employee/Card',
  component: EmployeeCard,
} as ComponentMeta<typeof EmployeeCard>;

const Template: ComponentStory<typeof EmployeeCard> = (args) => (
  <EmployeeCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  name: 'Dmytro Batarin',
  dob: new Date(),
  photo: 'https://randomuser.me/api/portraits/men/25.jpg',
};
