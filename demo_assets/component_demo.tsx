import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export default function DemoComponent() {
  return (
    <TableContainer>
      <Table sx={{width: '100% !important', display: 'table !important'}}>
        <colgroup>
          <col width="15%" />
          <col width="35%" />
          <col width="50%" />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Husky
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Husky is a robot that does stuff</TableCell>
            <TableCell rowSpan={2}>
              <img src="/example.jpg" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Features</TableCell>
            <TableCell>
              <ul>
                <li>Mobile navigation</li>
                <li>RGBD camera</li>
                <li>Laser</li>
                <li>Outdoor operation</li>
              </ul>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
