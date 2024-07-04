import { useNavigate, useParams } from 'react-router-dom';
import useNotes from '../hooks/useNotes';
import Form from './Form';
import Loading from './Loading';
import { toast } from 'sonner';
import { type SubmitHandler } from 'react-hook-form';
import { API_URL, EDIT_INPUTS } from '../constants';
import { RepairNoteType } from '../types';
import { filterEditValues, formatDateToInput } from '../utils';

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: note, error, isLoading } = useNotes<RepairNoteType>(`/${id}`);

  const URL = `${API_URL}/${id}`;

  if (isLoading) return <Loading />;

  if (error || null == note) {
    const message = error?.info.error;

    toast.error(message);

    return setTimeout(navigate, 100, '/');
  }

  const defaultValues = { ...note, entryDate: formatDateToInput(new Date(note.entryDate)) };
  const title = `Nota de reparación ${id}`;
  const onSubmit: SubmitHandler<RepairNoteType> = async (formData) => {
    try {
      const editedNote = filterEditValues(formData);

      const response = await fetch(URL, {
        method: 'PATCH',
        body: JSON.stringify(editedNote),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.status == 422) {
        const { errors } = data;

        errors.forEach((error: string) => toast.error(error));

        return;
      }

      const isEdited = (data as number) > 0;

      if (!isEdited) return toast.error('Ocurrió un error al intentar editar la nota');

      toast.info(`Nota ${id} editada correctamente`);

      return setTimeout(navigate, 300, '/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={onSubmit} title={title} defaultValues={defaultValues} inputs={EDIT_INPUTS} />
  );
}

export default EditNote;
