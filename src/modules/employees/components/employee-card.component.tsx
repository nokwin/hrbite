import { Card } from 'flowbite-react';
import { FC } from 'react';
import { DateTime } from 'luxon';

interface EmployeeCardProps {
  name: string;
  dob: Date;
  photo: string;
}

export const EmployeeCard: FC<EmployeeCardProps> = ({ name, dob, photo }) => {
  return (
    <div className="w-96">
      <Card imgSrc={photo}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Date of birth:{' '}
          {DateTime.fromJSDate(dob).toLocaleString(DateTime.DATE_FULL)}
        </p>
      </Card>
    </div>
  );
};
