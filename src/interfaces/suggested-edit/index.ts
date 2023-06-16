import { ResourceInterface } from 'interfaces/resource';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SuggestedEditInterface {
  id?: string;
  resource_id: string;
  guest_contributor_id: string;
  suggested_content: string;
  created_at?: any;
  updated_at?: any;

  resource?: ResourceInterface;
  user?: UserInterface;
  _count?: {};
}

export interface SuggestedEditGetQueryInterface extends GetQueryInterface {
  id?: string;
  resource_id?: string;
  guest_contributor_id?: string;
  suggested_content?: string;
}
