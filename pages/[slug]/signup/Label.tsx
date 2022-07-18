interface ILabelProps {
  children: React.ReactNode;
  className?: string;
  check?: boolean;
}

export function Label({ children, className, ...rest }: ILabelProps) {
  return (
    <label {...rest} className={`block ${className}`}>
      {children}
    </label>
  );
}
