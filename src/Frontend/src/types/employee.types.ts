export type Employee = {
  id: number;
  code: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  department: Department;
};

export type EmployeeTable = Omit<Employee, "department"> & {
  departmentCode: string;
  departmentDescription: string;
};

type Department = {
  code: string | null;
  description: string | null;
};

export type EmployeeFilterTable = {
  firstName: string;
  lastName: string;
};