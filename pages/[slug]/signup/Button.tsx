interface IButttonProps {
  className: string;
  block: boolean;
  size: string;
  type: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
}

export function Button({
  className,
  block,
  size,
  type,
  children,
}: IButttonProps) {
  return (
    <button type={type} className={className} disabled={block}>
      {children}
    </button>
  );
}
