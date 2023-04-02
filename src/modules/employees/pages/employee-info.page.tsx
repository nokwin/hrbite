import { FC } from 'react';
import { useEmployeeStore } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Alert } from 'flowbite-react';
import { HrButton } from '../../../common/components/hr-button.component';
import { observer } from 'mobx-react';

interface EmployeeInfoPageProps {}

export const EmployeeInfoPage: FC<EmployeeInfoPageProps> = observer(({}) => {
  const employeeStore = useEmployeeStore();
  const params = useParams();
  const employee = employeeStore.findEmployeeById(params.id || '');
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/employee/${params.id}/edit`);
  };

  const handleDeleteClick = async () => {
    await employeeStore.deleteEmployeeById(params.id || '');
    navigate(`/`, { replace: true });
  };

  if (!employee) {
    return (
      <Alert color="failure">
        <span className="font-medium">Error!</span> Something bad happened,
        please try again later 😭
      </Alert>
    );
  }

  return (
    <div className="my-8">
      <h5 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
        {employee?.name.first} {employee?.name.last}
      </h5>
      <img src={employee?.picture.large} className="mx-auto mt-8" />
      <p className="text-center text-2xl mt-8">
        Date of birth:{' '}
        {DateTime.fromISO(
          employee?.dob.date || new Date().toISOString()
        ).toLocaleString(DateTime.DATE_FULL)}
      </p>
      <div className="flex justify-center">
        <HrButton onClick={handleEditClick}>Edit</HrButton>
        <HrButton
          color="failure"
          onClick={handleDeleteClick}
          isLoading={employeeStore.deleteEmployeeStatus === 'LOADING'}
        >
          Delete
        </HrButton>
      </div>
    </div>
  );
});
