import { InputNumber } from "antd";

const InputCurrency = ({ value, onChange, ...props }) => {

  return (
    <InputNumber
      value={value}
      prefix="$"
      decimalSeparator=","
      min={0}
      max={999999999}
      precision={2}
      step={0.5}
      onChange={onChange}
      controls={false}
      style={{ minWidth: 100 }}
      placeholder="Valor"
      {...props}
    />
  );
}

export default InputCurrency;