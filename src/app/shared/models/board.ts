import {Task} from './task';

export interface Board {
  id: number;
  name: string;
  tasks: Task[] | any;
}
