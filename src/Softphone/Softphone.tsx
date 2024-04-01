import SoftphoneContainer from "./SoftphoneContainer/SoftphoneContainer.styles";

interface Props {
  styles?: {
    width: string;
    height: string;
  };
}

const Softphone = ({ styles }: Props) => {
  return (
    <SoftphoneContainer $styles={styles}>
      <h1>Softphone</h1>
    </SoftphoneContainer>
  );
};

export default Softphone;
