import Styles, { ContainerStyles } from "./styles";

interface Props {
  children: React.ReactNode;
  styles?: ContainerStyles;
}

export const Container = ({ children, styles }: Props) => {
  return (
    <Styles.Container styles={styles} display={"flex"} flexDirection={"column"}>
      {children}
    </Styles.Container>
  );
};
