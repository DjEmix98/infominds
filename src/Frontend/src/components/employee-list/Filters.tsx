import { Stack, TextField, Button } from "@mui/material";
import { useRef } from "react";
import { EmployeeFilterTable } from "../../types/employee.types";

type Props = {
  onSearch: (filters: EmployeeFilterTable) => void;
};

export function Filters({ onSearch }: Props) {
  const filters = useRef<EmployeeFilterTable>({
    firstName: "",
    lastName: "",
  });
  return (
    <>
      <Stack mb={4} display={"flex"} gap={4} flexDirection={{ md: "row" }}>
        <Stack
          width={{
            md: "50%",
            sm: "100%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="First name"
            placeholder="type to search by first name..."
            variant="outlined"
            onChange={(event) => {
              filters.current = {
                ...filters.current,
                firstName: event.target.value,
              };
            }}
          />
        </Stack>
        <Stack
          width={{
            md: "50%",
            sm: "100%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Last name"
            placeholder="type to search by last name..."
            variant="outlined"
            onChange={(event) => {
              filters.current = {
                ...filters.current,
                lastName: event.target.value,
              };
            }}
          />
        </Stack>
      </Stack>
      <Stack
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"end"}
        mb={4}
      >
        <Stack
          width={{
            md: "30%",
            sm: "100%",
          }}
        >
          <Button
            variant="contained"
            fullWidth={false}
            onClick={() => {
              onSearch(filters.current);
            }}
          >
            Search
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
