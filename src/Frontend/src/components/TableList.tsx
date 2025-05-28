import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BodyRecord, Header } from "../types/tableList.types";

type Props<T> = {
  header: Header<T>[];
  body: BodyRecord<T>[];
  isLoading: boolean;
};
export function TableList<T>({ header, body, isLoading }: Props<T>) {
  return (
    <TableContainer component={Paper}>
      {!isLoading ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            {header.map(({ label }) => (
                <StyledTableHeadCell>{label}</StyledTableHeadCell>
              ))}
              </TableRow>
          </TableHead>
          <TableBody>
            {body.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {header.map(({ key }) => (
                  <TableCell>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Loading...</p>
      )}
    </TableContainer>
  );
}

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));
