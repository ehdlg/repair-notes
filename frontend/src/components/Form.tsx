import { PropsWithChildren } from 'react';

function Form({ children, handleSubmit }: PropsWithChildren & { handleSubmit: () => void }) {
  return <form onSubmit={handleSubmit}>{children}</form>;
}

export default Form;
