interface CsvStringProps {
  strings: string[];
}

export default function CsvString({strings}: CsvStringProps) {
  return <>{strings.join(', ')}</>;
}
