import { SubmitHandler, useForm } from 'react-hook-form';
import Form from './Form';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { API_URL, CREATE_INPUTS } from '../constants';
import { RepairNoteType } from '../types';
import { toast } from 'sonner';

function CreateNote() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RepairNoteType>();

  const URL = `${API_URL}/`;
  const onSubmit: SubmitHandler<RepairNoteType> = async (newNote) => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(newNote),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.status == 422) {
        const { errors } = data;
        console.log('as');

        errors.forEach((error: string) => {
          toast.error(error);
        });
        return;
      }

      toast.success('Nota de reparación creada correctamente');

      setTimeout(navigate, 300, '/notas');
    } catch (error) {
      toast.error('Ocurrió un error al intentar crear la nota de reparación');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title='Nueva nota de reparación'>
      {CREATE_INPUTS.map((input) => {
        return (
          <div className='flex flex-col gap-' key={input.name}>
            <Input
              label={input.label}
              name={input.name}
              type={input.type}
              defaultValue={input.defaultValue || ''}
              register={{ ...register(input.name, input.options) }}
            />
            {errors[input.name] && <span className='text-red-500'>Este campo es obligatorio</span>}
          </div>
        );
      })}
    </Form>
  );
}

export default CreateNote;
