import IconButton from "@mui/material/IconButton";

type IconButtonProps = {
  onClick: () => void;
  icon?: React.ReactNode;
  color?: "primary" | "secondary" | "default";
};

export const CustomIconButton = ({
  onClick,
  icon,
  color = "default",
}: IconButtonProps) => {
  return (
    <IconButton onClick={onClick} color={color}>
      {icon}
    </IconButton>
  );
};
