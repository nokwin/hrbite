import { Label, TextInput, Alert } from 'flowbite-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store';
import { HrButton } from '../../../common/components/hr-button.component';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {}

const loginFormSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export const LoginPage: FC<LoginPageProps> = ({}) => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await authStore.authenticate(values);
      navigate('/');
    } catch (e) {
      setError('root', { message: "Crendentials doesn't match" });
    }
  };

  return (
    <div className="w-96 mx-auto mt-8">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.message && (
          <Alert color="failure">{errors.root?.message}</Alert>
        )}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            color={errors.email?.message ? 'failure' : 'gray'}
            helperText={errors.email?.message}
            {...register('email')}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            color={errors.password?.message ? 'failure' : 'gray'}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </div>
        <HrButton type="submit" isLoading={isSubmitting}>
          Submit
        </HrButton>
      </form>
    </div>
  );
};
