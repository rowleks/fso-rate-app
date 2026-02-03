import { useState } from "react";
import { TextInput } from "react-native";
import Text from "./Text";
import theme from "../context/theme";

const styles = {
  input: {
    padding: theme.spacing.small + 2,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: theme.borderRadius.small,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
};

const FormikTextInput = ({ name, formik, ...props }) => {
  const [isFocused, setFocused] = useState(false);
  const showError = formik.touched[name] && formik.errors[name] && !isFocused;

  const handleFocus = (e) => {
    setFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e) => {
    setFocused(false);
    formik.handleBlur(name)(e);
  };

  return (
    <>
      <TextInput
        onChangeText={formik.handleChange(name)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={formik.values[name]}
        style={[styles.input, showError && styles.inputError]}
        {...props}
      />
      {showError && <Text color="error">{formik.errors[name]}</Text>}
    </>
  );
};

export default FormikTextInput;
