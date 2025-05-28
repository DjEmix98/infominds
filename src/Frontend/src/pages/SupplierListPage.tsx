import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TableList } from "../components/TableList";
import { BodyTable, Header } from "../types/tableList.types";

type SupplierListQuery = {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
}

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
//TODO: CREARE CUSTOM HOOK E INIZIARE LA PARTE RELATIVA A Employee
export default function SupplierListPage() {
  const [list, setList] = useState<BodyTable<SupplierListQuery>[]>([]);

  useEffect(() => {
    fetch("/api/suppliers/list")
      .then((response) => {
        return response.json();
      })
      .then((datas: SupplierListQuery[]) => {
        const records = datas.map((data: SupplierListQuery) => ({
          ...data,
          id: `${data.id}`
        }))
        setList(records);
      });
  }, []);
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Suppliers
      </Typography>
      <TableList header={headers} body={list} isLoading={false} />
    </>
  );
}
