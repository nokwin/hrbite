import { makeAutoObservable } from 'mobx';
import { api } from '../../core/api';
import { ListEmployeesPaginatedDto } from './api/list-employees-paginated.dto';

type FetchStatus = 'NOT_STARTED' | 'LOADING' | 'SUCCESS' | 'FAILED';

interface FetchListOfEmployeesParams {
  page?: number | null;
}

class EmployeeStore {
  listFetchStatus: FetchStatus = 'NOT_STARTED';
  listEmployees: ListEmployeesPaginatedDto['results'] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchListOfEmployees({ page = 1 }: FetchListOfEmployeesParams = {}) {
    this.listFetchStatus = 'LOADING';

    try {
      const { data } = await api.get<ListEmployeesPaginatedDto>('/api', {
        params: {
          page,
          results: 12,
          seed: 'hr',
        },
      });

      this.listFetchStatus = 'SUCCESS';
      this.listEmployees = [...data.results];
    } catch (e) {
      this.listFetchStatus = 'FAILED';
    }
  }
}

const employeeStoreInstance = new EmployeeStore();

export const useEmployeeStore = () => {
  return employeeStoreInstance;
};
