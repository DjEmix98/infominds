import { useEffect, useState } from "react";
import { SupplierListQuery } from "../types/supplier.types";
import { BodyTable } from "../types/tableList.types";

export function useSuppliersList(): [
  BodyTable<SupplierListQuery>[],
  boolean,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [list, setList] = useState<BodyTable<SupplierListQuery>[]>([]);
  useEffect(() => {
    const urlParams = new URLSearchParams({ name });
    setIsLoading(true);
    fetch(`/api/suppliers/list?${urlParams.toString()}`)
      .then((response) => {
        return response.json();
      })
      .then((datas: SupplierListQuery[]) => {
        const records = datas.map((data: SupplierListQuery) => ({
          ...data,
          id: `${data.id}`,
        }));
        setIsLoading(false)
        setList(records);
      });
  }, [name]);
  return [list, isLoading, setName];
}
