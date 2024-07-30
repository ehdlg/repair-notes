import { useEffect, Fragment } from 'react';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  UseFormRegister,
  FieldArrayWithId,
  FieldErrors,
} from 'react-hook-form';
import Input from './Input';
import PDFDocument from './PDFDocument';
import { CheckIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { FormInput, FormType } from '../types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { createNoteFromForm } from '../utils';

const Header = ({
  isEdit,
  defaultValues,
}: {
  isEdit: boolean;
  defaultValues: Partial<FormType>;
}) => {
  const title = isEdit ? `Nota de reparación ${defaultValues.id}` : 'Nueva nota de reparación';
  const noteToEdit = isEdit ? createNoteFromForm(defaultValues as FormType) : null;

  return (
    <div className='border-b border-gray-200 flex justify-between w-full items-center mb-8 '>
      <h2 className='text-md xl:text-2xl text-gray-800 mt-2 pb-4 font-bold '>{title}</h2>
      <div className='mr-2 flex gap-4'>
        {isEdit && (
          <PDFDownloadLink document={<PDFDocument note={noteToEdit ?? defaultValues} />}>
            {({ loading }) => {
              return (
                <PrinterIcon
                  className={`size-10 text-gray-700 border border-gray-200 p-2 rounded hover:border-none hover:text-white hover:bg-gray-700 transition ease-in ${
                    loading && 'disabled opacity-20 cursor-not-allowed'
                  }`}
                />
              );
            }}
          </PDFDownloadLink>
        )}
        <button type='submit'>
          <CheckIcon className='size-10 cursor-pointer text-gray-700 border border-gray-200 p-2 rounded hover:border-none hover:text-white hover:bg-gray-700 transition ease-in' />
        </button>
      </div>
    </div>
  );
};

const MachinesInputs = ({
  fields,
  register,
  errors,
}: {
  fields: FieldArrayWithId<FormType, 'machines', 'id'>[];
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
}) => {
  return (
    <>
      {fields.map((field, index) => {
        return (
          <Fragment key={field.id}>
            <div className='flex flex-col gap-1'>
              <Input
                label='Máquina'
                register={{
                  ...register(`machines.${index}.model`),
                }}
                name='machines'
                type='text'
              />
            </div>
            <div className='flex flex-col gap-1 '>
              <Input
                label='Avería'
                register={{
                  ...register(`machines.${index}.malfunction`),
                }}
                name='machines'
                type='text'
              />
            </div>
          </Fragment>
        );
      })}
      {errors['machines'] && (
        <span className='block text-red-400 text-sm lg:col-span-2'>
          {errors.machines.root?.message}
        </span>
      )}
    </>
  );
};

const GeneralInputs = ({
  inputs,
  register,
  errors,
  garantyValue,
}: {
  inputs: FormInput[];
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  garantyValue: boolean;
}) => {
  return (
    <>
      {inputs.map((input) => {
        const isBudget = input.name === 'budget';
        const disabled = isBudget && !!garantyValue;

        return (
          <div
            className={`flex flex-col gap-1 ${input.type === 'textarea' ? 'col-span-2' : ''}`}
            key={input.name}
          >
            <Input
              label={input.label}
              name={input.name}
              type={input.type}
              register={{ ...register(input.name, input.options) }}
              disabled={disabled}
            />
            {errors[input.name] && (
              <span className='text-red-400 text-sm text-wrap'>{errors[input.name]?.message}</span>
            )}
          </div>
        );
      })}
    </>
  );
};

Form.Header = Header;
Form.MachinesInputs = MachinesInputs;
Form.GeneralInputs = GeneralInputs;

function Form({
  inputs,
  onSubmit,
  defaultValues,
  isEdit = false,
}: {
  inputs: FormInput[];
  onSubmit: SubmitHandler<FormType>;
  defaultValues: Partial<FormType>;
  isEdit?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm<FormType>({ defaultValues });
  const { fields, append } = useFieldArray<FormType>({
    control,
    name: 'machines',
    rules: {
      validate: (data) => {
        for (const machine of data) {
          if (machine.malfunction.length === 0 || machine.model.length === 0) {
            return 'Comprueba que todos los campos de máquinas y averías no estén vacíos';
          }
        }
      },
    },
  });
  const garantyValue = isEdit && (watch('garanty') as boolean);
  garantyValue ? setValue('budget', null) : setValue('budget', defaultValues?.budget ?? null);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col bg-white border-gray-200 border-2 p-4 w-11/12 lg:w-1/2 rounded-md m-auto h-auto shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'
    >
      <button type='button' onClick={() => append({ malfunction: '', model: '' })}>
        apendar
      </button>
      <Form.Header isEdit={isEdit} defaultValues={defaultValues} />
      <div className='flex flex-col lg:grid lg:grid-cols-2 mx-4 gap-8 mb-12'>
        <Form.MachinesInputs errors={errors} fields={fields} register={register} />
        <Form.GeneralInputs
          inputs={inputs}
          errors={errors}
          garantyValue={garantyValue}
          register={register}
        />
      </div>
    </form>
  );
}

export default Form;
