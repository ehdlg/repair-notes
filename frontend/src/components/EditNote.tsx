import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from './Form';
import Input from './Input';
import Loading from './Loading';
import { API_URL, EDIT_INPUTS } from '../constants';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import useNotes from '../hooks/useNotes';
import { RepairNoteType } from '../types';

function EditNote() {
  const { register, handleSubmit, watch, setValue } = useForm<RepairNoteType>();
  const { id } = useParams();
  const navigate = useNavigate();
  const URL = `${API_URL}/${id}`;
  const isGaranty = watch('garanty');
  const exampleNote: RepairNoteType = {
    client: 'Enrique Hidalgo',
    phoneNumber: '658287564',
    model: 'Makita',
    malfunction: 'No funciona',
    entryDate: new Date('2024-06-22T06:58:10.778Z'),
    budget: 1233323,
    departureDate: null,
    details: '',
    garanty: false,
    id: 22,
    isRepaired: false,
  };

  useEffect(() => {
    if (isGaranty) {
      setValue('budget', null);
    } else {
      setValue('budget', exampleNote.budget ?? 1);
    }
  }, [isGaranty, setValue, exampleNote.budget]);

  const { rows: note, error, isLoading } = useNotes(`/${id}`);

  if (isLoading) return <Loading />;

  if (error || null == note) {
    const message = error.info.error;

    toast.error(message);

    return setTimeout(navigate, 100, '/notas');
  }

  const onSubmit: SubmitHandler<RepairNoteType> = async (editedNote) => {
    try {
      // const response = await fetch(URL, {
      //   method: 'PATCH',
      //   body: JSON.stringify({ entryDate: 's' }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      alert(JSON.stringify(editedNote));
    } catch (error) {
      alert(error);
    }
  };

  const title = `Nota de reparación ${id}`;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title={title}>
      {EDIT_INPUTS.map((input) => {
        return (
          <Input
            label={input.label}
            name={input.name}
            type={input.type}
            defaultValue={note[input.name] || input.defaultValue}
            register={{ ...register(input.name, input.options) }}
          />
        );
      })}
    </Form>
  );
}

export default EditNote;
