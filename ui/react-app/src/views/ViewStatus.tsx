import {
  Chip,
  Container,
  SxProps,
  Table,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableRow,
  TextareaAutosize,
  Theme,
  Typography,
} from '@mui/material';
import { useAMStatus } from '../client/am-client';

const tableStyle: SxProps<Theme> = {
  [`& .${tableCellClasses.root}`]: {
    borderBottom: 'none',
  },
};

const tableHeaderStyle: SxProps<Theme> = {
  fontWeight: 'bold',
};

interface tableCellProperties {
  header: string;
  content: string;
}

function CustomTableCell(props: tableCellProperties) {
  const { header, content } = props;
  return (
    <TableRow>
      <TableCell variant="head" sx={tableHeaderStyle}>
        {header}
      </TableCell>
      <TableCell>{content}</TableCell>
    </TableRow>
  );
}

export default function ViewStatus() {
  const { data } = useAMStatus();
  if (data === undefined || data === null) {
    return <></>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4">Status</Typography>
      <TableContainer>
        <Table sx={tableStyle}>
          <CustomTableCell header="Uptime" content={data.uptime} />
        </Table>
      </TableContainer>
      <Typography variant="h4">Cluster Status</Typography>
      <Table sx={tableStyle}>
        <CustomTableCell header="Name" content={data.cluster.name} />
        <TableRow>
          <TableCell variant="head" sx={tableHeaderStyle}>
            Status
          </TableCell>
          <TableCell>
            <Chip color={data.cluster.status === 'ready' ? 'success' : 'error'} label={data.cluster.status} />
          </TableCell>
        </TableRow>
      </Table>
      <Typography variant="h4">Version Information</Typography>
      <TableContainer>
        <Table sx={tableStyle}>
          <CustomTableCell header="Branch" content={data.versionInfo.branch} />
          <CustomTableCell header="Build Date" content={data.versionInfo.buildDate} />
          <CustomTableCell header="Build User" content={data.versionInfo.buildUser} />
          <CustomTableCell header="Go Version" content={data.versionInfo.goVersion} />
          <CustomTableCell header="Revision" content={data.versionInfo.revision} />
          <CustomTableCell header="Version" content={data.versionInfo.version} />
        </Table>
      </TableContainer>
      <Typography variant="h4">Config</Typography>
      <TextareaAutosize
        readOnly
        aria-multiline
        value={data.config.original}
        style={{ width: '100%', backgroundColor: 'lightgrey' }}
      />
    </Container>
  );
}
