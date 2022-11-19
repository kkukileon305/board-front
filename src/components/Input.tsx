import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  type: Path<T>;
  requiredMessage: string;
  minLength: number;
  minLengthMessage: string;
  error: FieldError | undefined;
  normalMessage: string;
}

const Input = <T extends FieldValues>({ register, minLength, minLengthMessage, requiredMessage, type, error, normalMessage }: InputProps<T>) => {
  return (
    <>
      <p className={`mb-2 text-gray-400 ${error ? 'text-red-500' : ''}`}>{error ? error.message : normalMessage}</p>
      <input
        className='block w-full border rounded mb-4 p-1 focus:outline-none'
        type={type}
        {...register(type, {
          required: {
            value: true,
            message: requiredMessage,
          },

          minLength: {
            value: minLength,
            message: minLengthMessage,
          },
        })}
      />
    </>
  );
};
export default Input;
