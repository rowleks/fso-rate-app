import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useFormik } from "formik";
import theme from "../context/theme";
import * as yup from "yup";
import Text from "../components/Text";

const styles = {
  container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.white,
  },

  formContainer: {
    gap: theme.spacing.small + 6,
  },

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

const SignIn = () => {
  const [focusField, setFocusField] = useState(null);
  const initialValues = { username: "", password: "" };

  const onSubmit = (values) => {
    const trimedValues = {
      username: values.username.trim(),
      password: values.password,
    };
    console.log(trimedValues);
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          onFocus={() => setFocusField("username")}
          onBlur={(e) => {
            setFocusField(null);
            formik.handleBlur("username")(e);
          }}
          style={[
            styles.input,
            formik.touched.username &&
              formik.errors.username &&
              focusField !== "username" &&
              styles.inputError,
          ]}
        />
        {formik.touched.username &&
          formik.errors.username &&
          focusField !== "username" && (
            <Text color="error">{formik.errors.username}</Text>
          )}
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onFocus={() => setFocusField("password")}
          onBlur={(e) => {
            setFocusField(null);
            formik.handleBlur("password")(e);
          }}
          style={[
            styles.input,
            formik.touched.password &&
              formik.errors.password &&
              focusField !== "password" &&
              styles.inputError,
          ]}
        />
        {formik.touched.password &&
          formik.errors.password &&
          focusField !== "password" && (
            <Text color="error">{formik.errors.password}</Text>
          )}
        <Button title="Sign In" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
};

export default SignIn;
