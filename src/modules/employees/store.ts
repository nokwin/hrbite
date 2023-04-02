import { makeAutoObservable, toJS } from 'mobx';
import { api } from '../../core/api';
import { ListEmployeesPaginatedDto } from './api/list-employees-paginated.dto';
import { FetchStatus } from '../../common/types';

interface FetchListOfEmployeesParams {
  page?: number | null;
}

interface UpdateEmployeeByIdParams {
  firstName: string;
  lastName: string;
  birthDate: Date;
  photo: string;
}

class EmployeeStore {
  listFetchStatus: FetchStatus = 'NOT_STARTED';
  deleteEmployeeStatus: FetchStatus = 'NOT_STARTED';
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

      const updatedEmployees = this.getUpdatedEmployees();
      const deletedEmployees = this.getDeletedEmployees();

      this.listEmployees = data.results
        .filter((employee) => {
          const deletedEmployee = deletedEmployees.find(
            (emp) => emp === employee.login.uuid
          );

          return !deletedEmployee;
        })
        .map((employee) => {
          const updatedEmployee = updatedEmployees.find(
            (emp) => emp.login.uuid === employee.login.uuid
          );

          this.listFetchStatus = 'SUCCESS';

          return updatedEmployee || employee;
        });
    } catch (e) {
      this.listFetchStatus = 'FAILED';
    }
  }

  findEmployeeById(id: string) {
    return this.listEmployees.find((employee) => employee.login.uuid === id);
  }

  getUpdatedEmployees(): ListEmployeesPaginatedDto['results'] {
    return JSON.parse(localStorage.getItem('updatedEmployees') || '[]');
  }

  async updateEmployeeById(id: string, data: UpdateEmployeeByIdParams) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const employee = toJS(this.findEmployeeById(id));

          if (!employee) {
            throw new Error('no employee');
          }

          employee.name.first = data.firstName;
          employee.name.last = data.lastName;
          employee.dob.date = data.birthDate.toISOString();
          employee.picture.large = data.photo;

          const updatedEmployees = this.getUpdatedEmployees();
          const existingUpdatedEmployeeIndex = updatedEmployees.findIndex(
            (emp) => emp.login.uuid === id
          );

          if (existingUpdatedEmployeeIndex !== -1) {
            updatedEmployees[existingUpdatedEmployeeIndex] = employee;
          } else {
            updatedEmployees.push(employee);
          }

          this.listEmployees = [];
          this.listFetchStatus = 'NOT_STARTED';

          localStorage.setItem(
            'updatedEmployees',
            JSON.stringify(updatedEmployees)
          );

          resolve(true);
        } catch (e) {
          reject(e);
        }
      }, 500);
    });
  }

  getDeletedEmployees(): string[] {
    return JSON.parse(localStorage.getItem('deletedEmployees') || '[]');
  }

  async deleteEmployeeById(id: string) {
    this.deleteEmployeeStatus = 'LOADING';

    return new Promise((resolve) => {
      setTimeout(() => {
        const deletedEmployees = this.getDeletedEmployees();
        deletedEmployees.push(id);

        localStorage.setItem(
          'deletedEmployees',
          JSON.stringify(deletedEmployees)
        );

        this.listEmployees = [];
        this.listFetchStatus = 'NOT_STARTED';

        this.deleteEmployeeStatus = 'NOT_STARTED';
        resolve(true);
      }, 500);
    });
  }
}

const employeeStoreInstance = new EmployeeStore();

export const useEmployeeStore = () => {
  return employeeStoreInstance;
};
