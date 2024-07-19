import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from './Input';
import PDFDocument from './PDFDocument';
import { CheckIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { InputsType, RepairNoteType } from '../types';
import { PDFDownloadLink } from '@react-pdf/renderer';

function Form({
  inputs,
  onSubmit,
  defaultValues,
  isEdit = false,
}: {
  inputs: InputsType[];
  onSubmit: SubmitHandler<RepairNoteType>;
  defaultValues: Partial<RepairNoteType>;
  isEdit?: boolean;
}) {
  const title = isEdit ? `Nota de reparación ${defaultValues.id}` : 'Nueva nota de reparación';
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<RepairNoteType>({ defaultValues });
  const garantyValue = isEdit && watch('garanty');
  garantyValue ? setValue('budget', null) : setValue('budget', defaultValues?.budget ?? null);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col bg-white border-gray-200 border-2 p-4 w-1/2 rounded-md m-auto h-auto shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'
    >
      <div className='border-b border-gray-200 flex justify-between w-full items-center mb-8 '>
        <h2 className='text-2xl text-gray-800 mt-2 pb-4 font-bold '>{title}</h2>
        <div className='mr-2 flex gap-4'>
          {isEdit && (
            <PDFDownloadLink document={<PDFDocument note={defaultValues} />}>
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
      <div className='grid grid-cols-2 mx-4 gap-8 mb-12'>
        {inputs.map((input) => {
          const isBudget = input.name === 'budget';
          const disabled = isBudget && !!garantyValue;

          return (
            <div
              className={`flex flex-col gap-1 ${input.type === 'textarea' && 'col-span-2'}`}
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
                <span className='text-red-500 text-sm text-wrap'>
                  {errors[input.name]?.message}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
}

export default Form;
