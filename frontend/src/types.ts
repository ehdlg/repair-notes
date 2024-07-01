export type RepairNoteType = {
  id: number;
  client: string;
  phoneNumber: string;
  model: string;
  malfunction: string;
  entryDate: Date;
  departureDate: Date | null;
  isRepaired: boolean | null;
  details: string | null;
  garanty: boolean | null;
  budget: number | null;
};

export type CreateFormType = Pick<
  RepairNoteType,
  'client' | 'phoneNumber' | 'model' | 'malfunction' | 'entryDate' | 'garanty'
>;
