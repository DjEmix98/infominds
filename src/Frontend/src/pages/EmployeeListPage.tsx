import { Button, Stack, Typography } from "@mui/material";
import { TableList } from "../components/TableList";
import { Header } from "../types/tableList.types";
import { EmployeeTable } from "../types/employee.types";
import { useEmployeeList } from "../hooks/useEmployeeList";
import { Filters } from "../components/employee-list/Filters";
import { exportXml } from "../utils/xml.utils";

const headers: Header<EmployeeTable>[] = [
  {
    label: "Name",
    key: "firstName",
  },
  {
    label: "Last name",
    key: "lastName",
  },
  {
    label: "Address",
    key: "address",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Phone",
    key: "phone",
  },
  {
    label: "Department code",
    key: "departmentCode",
  },
  {
    label: "Department description",
    key: "departmentDescription",
  },
];

export default function EmployeeListPage() {
  const [employees, isLoading, setFilters, setPagination] = useEmployeeList();

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Suppliers
      </Typography>
      <Filters onSearch={setFilters} />
      <TableList
        header={headers}
        body={employees.records}
        isLoading={isLoading}
        pagination={{
          page: employees.page,
          pageSize: employees.pageSize,
          totaliItems: employees.totalItems,
          onPageChange: (page) =>
            setPagination({
              page,
              pageSize: employees.pageSize,
            }),
          onRowsPerPageChange: (pageSize) => {
            setPagination({
              page: 0,
              pageSize,
            });
          },
        }}
      />
      {!isLoading && (
        <Stack display="flex" flexDirection="row" justifyContent="flex-end">
          <Button
            onClick={() =>
              exportXml(headers, employees.records, "Employees List")
            }
          >
            Export as xml
          </Button>
        </Stack>
      )}
    </>
  );
}
