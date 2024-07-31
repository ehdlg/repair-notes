import { useEffect, Fragment } from 'react';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  UseFormRegister,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from 'react-hook-form';
import Input from './Input';
import PDFDocument from './PDFDocument';
import {
  CheckIcon,
  PrinterIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { FormInput, FormType } from '../types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { createNoteFromForm } from '../utils';

const Header = ({
  isEdit,
  defaultValues,
  deleteNote,
}: {
  isEdit: boolean;
  defaultValues: Partial<FormType>;
  deleteNote: null | (() => void);
}) => {
  const title = isEdit ? `Nota de reparación ${defaultValues.id}` : 'Nueva nota de reparación';
  const noteToEdit = isEdit ? createNoteFromForm(defaultValues as FormType) : null;
  const iconStyle =
    'size-10 cursor-pointer text-gray-700 border border-gray-200 p-2 rounded hover:border-none hover:text-white hover:bg-gray-700 transition ease-in';

  return (
    <div className='border-b border-gray-200 flex justify-between w-full items-center mb-8 '>
      <h2 className='text-md xl:text-2xl text-gray-800 mt-2 pb-4 font-bold '>{title}</h2>
      <div className='mr-2 flex gap-4'>
        {null != deleteNote && (
          <button type='button' onClick={deleteNote}>
            <TrashIcon className={iconStyle + ' text-red-500 hover:bg-red-500'} />
          </button>
        )}
        {isEdit && (
          <>
            <PDFDownloadLink document={<PDFDocument note={noteToEdit ?? defaultValues} />}>
              {({ loading }) => {
                return (
                  <PrinterIcon
                    className={`${iconStyle} ${
                      loading && 'disabled opacity-20 cursor-not-allowed'
                    }`}
                  />
                );
              }}
            </PDFDownloadLink>
          </>
        )}
        <button type='submit'>
          <CheckIcon className={iconStyle} />
        </button>
      </div>
    </div>
  );
};

const MachinesInputs = ({
  fields,
  register,
  errors,
  append,
  remove,
}: {
  fields: FieldArrayWithId<FormType, 'machines', 'id'>[];
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  append: UseFieldArrayAppend<FormType, 'machines'>;
  remove: UseFieldArrayRemove;
}) => {
  function addMachine() {
    append({ malfunction: '', model: '' });
  }

  function removeMachine(index: number) {
    return function () {
      remove(index);
    };
  }

  return (
    <>
      {fields.map((field, index) => {
        const firstElement = index === 0;
        const iconStyles = 'size-6 text-slate-700 hover:scale-125 transition ease-in duration-100';
        const actionButton = (
          <button
            type='button'
            className='w-fit lg:absolute  lg:right-16 lg:bottom-2'
            onClick={firstElement ? addMachine : removeMachine(index)}
          >
            {firstElement ? (
              <PlusIcon className={iconStyles} />
            ) : (
              <MinusIcon className={iconStyles} />
            )}
          </button>
        );

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
            <div className='flex flex-col gap-1 relative'>
              <Input
                label='Avería'
                register={{
                  ...register(`machines.${index}.malfunction`),
                }}
                name='machines'
                type='text'
              />
              {actionButton}
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
  deleteNote = null,
  isEdit = false,
}: {
  inputs: FormInput[];
  onSubmit: SubmitHandler<FormType>;
  defaultValues: Partial<FormType>;
  deleteNote?: null | (() => void);
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
  const { fields, append, remove } = useFieldArray<FormType>({
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
      className='flex flex-col bg-white border-gray-200 border-2 p-4 w-11/12 2xl:w-1/2 rounded-md m-auto h-auto shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'
    >
      <Form.Header isEdit={isEdit} defaultValues={defaultValues} deleteNote={deleteNote} />
      <div className='flex flex-col lg:grid lg:grid-cols-2 mx-4 gap-8 mb-12'>
        <Form.MachinesInputs
          errors={errors}
          fields={fields}
          register={register}
          append={append}
          remove={remove}
        />
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
