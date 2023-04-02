import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Label, TextInput } from 'flowbite-react';
import { DateTime } from 'luxon';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { HrButton } from '../../../common/components/hr-button.component';
import { useEmployeeStore } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

interface EmployeeEditPageProps {}

const employeeSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  photo: z.string().nonempty().url(),
  birthDate: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date().max(DateTime.now().minus({ years: 18 }).toJSDate())),
});

type EmployeeValues = z.infer<typeof employeeSchema>;

export const EmployeeEditPage: FC<EmployeeEditPageProps> = observer(({}) => {
  const employeeStore = useEmployeeStore();
  const params = useParams();
  const employee = employeeStore.findEmployeeById(params.id || '');
  const navigate = useNavigate();

  console.log(
    DateTime.fromISO(employee?.dob.date || new Date().toISOString()).toFormat(
      'YYYY-MM-DD'
    )
  );

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EmployeeValues>({
    defaultValues: {
      firstName: employee?.name.first,
      lastName: employee?.name.last,
      photo: employee?.picture.large,
      birthDate: DateTime.fromISO(
        employee?.dob.date || new Date().toISOString()
      ).toFormat('yyyy-LL-dd') as unknown as Date,
    },
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (values: EmployeeValues) => {
    try {
      await employeeStore.updateEmployeeById(employee!.login.uuid, values);
      navigate('/');
    } catch (e) {
      setError('root', {
        message: 'Something bad happened, please try again later 😭',
      });
    }
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
    <div className="w-96 mx-auto mt-8">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.message && (
          <Alert color="failure">{errors.root?.message}</Alert>
        )}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstName" value="First name" />
          </div>
          <TextInput
            id="firstName"
            type="text"
            color={errors.firstName?.message ? 'failure' : 'gray'}
            helperText={errors.firstName?.message}
            {...register('firstName')}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastName" value="Last name" />
          </div>
          <TextInput
            id="lastName"
            type="text"
            color={errors.lastName?.message ? 'failure' : 'gray'}
            helperText={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="photo" value="Photo" />
          </div>
          <TextInput
            id="photo"
            type="text"
            color={errors.photo?.message ? 'failure' : 'gray'}
            helperText={errors.photo?.message}
            {...register('photo')}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="birthDate" value="Date of birth" />
          </div>
          <TextInput
            id="birthDate"
            type="date"
            color={errors.birthDate?.message ? 'failure' : 'gray'}
            helperText={errors.birthDate?.message}
            {...register('birthDate')}
          />
        </div>
        <HrButton type="submit" isLoading={isSubmitting}>
          Submit
        </HrButton>
      </form>
    </div>
  );
});
