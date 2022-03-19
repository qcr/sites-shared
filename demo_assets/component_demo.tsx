import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface DemoComponentProps {
  name: string;
  description: string;
  image: string;
  features: string[];
}

export default function DemoComponent({
  name,
  description,
  image,
  features,
}: DemoComponentProps) {
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
              {name}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell rowSpan={2}>
              <img src={image} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Features</TableCell>
            <TableCell>
              <ul>
                {features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
