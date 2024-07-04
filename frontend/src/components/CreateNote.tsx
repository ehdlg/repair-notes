import Form from './Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { type SubmitHandler } from 'react-hook-form';
import { API_URL, CREATE_INPUTS, DEFAULT_FORM_VALUES } from '../constants';
import { RepairNoteType } from '../types';

function CreateNote() {
  const navigate = useNavigate();

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

        errors.forEach((error: string) => {
          toast.error(error);
        });
        return;
      }

      toast.success('Nota de reparación creada correctamente');

      setTimeout(navigate, 300, '/');
    } catch (error) {
      toast.error('Ocurrió un error al intentar crear la nota de reparación');
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      title='Nueva nota de reparación'
      defaultValues={DEFAULT_FORM_VALUES}
      inputs={CREATE_INPUTS}
    />
  );
}

export default CreateNote;
