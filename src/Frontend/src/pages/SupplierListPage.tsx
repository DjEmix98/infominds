import { Button, Stack, TextField, Typography } from "@mui/material";
import { TableList } from "../components/TableList";
import { Header } from "../types/tableList.types";
import { SupplierListQuery } from "../types/supplier.types";
import { useSuppliersList } from "../hooks/useSuppliersList";
import { useRef } from "react";
import { exportXml } from "../utils/xml.utils";

const headers: Header<SupplierListQuery>[] = [
  {
    label: "Name",
    key: "name",
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
];

export default function SupplierListPage() {
  const [list, isLoading, setFilters] = useSuppliersList();
  const timeoutId = useRef<number>(null);

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Suppliers
      </Typography>
      <Stack mb={4}>
        <TextField
          id="outlined-basic"
          label="Name"
          placeholder="type to search by name..."
          variant="outlined"
          onChange={(event) => {
            if (timeoutId.current) {
              clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(
              () => setFilters(event.target.value),
              500
            );
          }}
        />
      </Stack>
      <TableList header={headers} body={list} isLoading={isLoading} />
      {!isLoading && (
        <Stack display="flex" flexDirection="row" justifyContent="flex-end">
          <Button onClick={() => exportXml(headers, list, "Supplier list")}>
            Export as xml
          </Button>
        </Stack>
      )}
    </>
  );
}
