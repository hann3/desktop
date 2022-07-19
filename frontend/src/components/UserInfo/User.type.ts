import { Dispatch, SetStateAction } from 'react';

export interface ProfileEditor {
  isEditingMode: boolean;
  setEditingMode: Dispatch<SetStateAction<boolean>>;
}

export interface User {
  id: string;
  email: string;
  nickname: string;
  phone: string;
}
