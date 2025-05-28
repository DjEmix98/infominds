import {
  CircularProgress,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BodyTable, Header } from "../types/tableList.types";

type Props<T> = {
  header: Header<T>[];
  body: BodyTable<T>[];
  isLoading: boolean;
};
export function TableList<T>({ header, body, isLoading }: Props<T>) {
  return (
    <TableContainer component={Paper}>
      {!isLoading ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            {header.map(({ label, key }) => (
                <StyledTableHeadCell key={key as string}>{label}</StyledTableHeadCell>
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
                  <TableCell key={key as string}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Stack justifyContent="center" alignItems="center" p={4}>
          <CircularProgress />
        </Stack>
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
