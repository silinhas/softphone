export type Menu = {
  type?: "phone" | "identifier";
  open: boolean;
  title: string;
  options: { id: string; label: string; value: string }[];
};
