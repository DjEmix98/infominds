import { useEffect, useRef, useState } from "react";
import { BodyTable } from "../types/tableList.types";
import {
  Employee,
  EmployeeFilterTable,
  EmployeeTable,
} from "../types/employee.types";
import { Pagination } from "../types/pagination.types";

type PaginationFilter = {
  page: number;
  pageSize: number;
};
export function useEmployeeList(): [
  Pagination<BodyTable<EmployeeTable>>,
  boolean,
  React.Dispatch<React.SetStateAction<EmployeeFilterTable>>,
  React.Dispatch<React.SetStateAction<PaginationFilter>>
] {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<EmployeeFilterTable>({
    firstName: "",
    lastName: "",
  });
  const [pagination, setPagination] = useState<PaginationFilter>({
    page: 0,
    pageSize: 5,
  });
  const [list, setList] = useState<Pagination<BodyTable<EmployeeTable>>>({
    records: [],
    totalItems: 0,
    page: 0,
    pageSize: 10,
  });
  const refList = useRef<Employee[]>([]);
  useEffect(() => {
    setIsLoading(true);
    const filterParams = {
      firstName: filters.firstName,
      lastName: filters.lastName,
    };
    const urlParams = new URLSearchParams(filterParams);
    fetch(`/api/employees/list?${urlParams.toString()}`)
      .then((response) => {
        return response.json();
      })
      .then((data: Employee[]) => {
        const records = data
          .filter((_, index) => filterPaginationDatas(index, 10, 0))
          .map(mapEmployeeToTableData);
        refList.current = data;
        setList({
          records,
          totalItems: data.length,
          page: 0,
          pageSize: 10,
        });
        setIsLoading(false);
      });
  }, [filters]);

  useEffect(() => {
    if (refList.current.length > 0) {
      setIsLoading(true);
      const records = refList.current
        .filter((_, index) =>
          filterPaginationDatas(index, pagination.pageSize, pagination.page)
        )
        .map(mapEmployeeToTableData);

      setList({
        records,
        totalItems: refList.current.length,
        page: pagination.page,
        pageSize: pagination.pageSize,
      });
      setIsLoading(false);
    }
  }, [pagination]);
  return [list, isLoading, setFilters, setPagination];
}

function filterPaginationDatas(
  index: number,
  pageSize: number,
  page: number
): boolean {
  return index >= pageSize * page && index < page * pageSize + pageSize;
}

function mapEmployeeToTableData(data: Employee): BodyTable<EmployeeTable> {
  return {
    address: data.address,
    code: data.code,
    departmentCode: data.department?.code || "-",
    departmentDescription: data.department?.description || "-",
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    id: `${data.id}`,
  };
}
