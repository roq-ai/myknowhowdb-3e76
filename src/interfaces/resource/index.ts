import { SuggestedEditInterface } from 'interfaces/suggested-edit';
import { ThinkerInterface } from 'interfaces/thinker';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ResourceInterface {
  id?: string;
  title: string;
  content: string;
  thinker_id: string;
  creator_id: string;
  created_at?: any;
  updated_at?: any;
  suggested_edit?: SuggestedEditInterface[];
  thinker?: ThinkerInterface;
  user?: UserInterface;
  _count?: {
    suggested_edit?: number;
  };
}

export interface ResourceGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  thinker_id?: string;
  creator_id?: string;
}
