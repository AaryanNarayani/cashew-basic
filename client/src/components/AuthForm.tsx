import { useState, useEffect } from 'react';
import Input from './Input';
import InputPassword from './InputPassword';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  isSignup?: boolean;
}

const AuthForm = ({ isSignup = false }: AuthFormProps) => {
//   const [loader,setLoader]
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  const validateForm = () => {
    let formErrors: any = {};

    if (isSignup && !formData.name) {
      formErrors.name = 'Name is required';
    }
    if (!formData.email) {
      formErrors.email = 'Email is required';
    }
    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    if (isSignup && formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      const url = isSignup
        ? 'http://localhost:8080/api/v1/auth/signup'
        : 'http://localhost:8080/api/v1/auth/signin';

      const credentials = isSignup
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const response = await axios.post(url, credentials);

      localStorage.setItem('token', response.data.token);
      navigate(response.data.token ? '/dashboard' : '/error');
    } catch (error: any) {
      setErrors({ message: error.response?.data?.message || 'Something went wrong' });
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-full">
      <div className="flex-col space-y-4 dark:bg-background dark:text-primary">
        {isSignup && (
          <div className="flex flex-col space-y-1">
            <label
              className="w-full text-sm font-medium text-gray-400"
              htmlFor="name"
            >
              Name
            </label>
            <Input
              props={{
                name: 'name',
                value: formData.name,
                onChange: onChangeHandler,
              }}
              type="text"
              placeholder="John Doe"
              error={errors.name}
              id="name"
            />
          </div>
        )}

        <div className="flex flex-col space-y-1">
          <label
            className="w-full text-sm font-medium text-gray-400"
            htmlFor="email"
          >
            Email Address
          </label>
          <Input
            props={{
              name: 'email',
              value: formData.email,
              onChange: onChangeHandler,
            }}
            type="email"
            placeholder="your@email.com"
            error={errors.email}
            id="email"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            className="w-full text-sm font-medium text-gray-400"
            htmlFor="password"
          >
            Password
          </label>
          <InputPassword
            props={{
              name: 'password',
              value: formData.password,
              onChange: onChangeHandler,
            }}
            type="password"
            placeholder=""
            error={errors.password}
            id="password"
          />

          {isSignup && !errors.password && (
            <span className="block pl-1 pt-1 text-xs font-normal leading-tight text-gray-400">
              Ensure it&apos;s at least 6 characters
            </span>
          )}
        </div>

        {isSignup && (
          <div className="flex flex-col space-y-1">
            <label
              className="w-full text-sm font-medium text-gray-400"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>

            <Input
              props={{
                name: 'confirmPassword',
                value: formData.confirmPassword,
                onChange: onChangeHandler,
              }}
              type="password"
              placeholder=""
              error={errors.confirmPassword}
              id="confirmPassword"
            />

            {errors.confirmPassword && (
              <span className="block pl-1 pt-1 text-xs font-normal leading-tight text-gray-400">
                Passwords do not match
              </span>
            )}
          </div>
        )}

        <Button
          label={isSignup ? 'Sign Up' : 'Sign In'}
          fullWidth
          roundedCorners="md"
          isDisabled={!isValid}
        />
      </div>

      {errors.message && (
        <p className="mt-4 text-center text-xs font-normal leading-tight text-red-400">
          {errors.message}
        </p>
      )}
    </form>
  );
};

export default AuthForm;
