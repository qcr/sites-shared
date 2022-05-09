interface LowercaseProps {
  string: string;
}

export default function Lowercase({string}: LowercaseProps) {
  return <>{string.toLowerCase()}</>;
}
