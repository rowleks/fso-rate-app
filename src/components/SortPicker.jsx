import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import theme from "../context/theme";

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.small,
  },
  picker: {
    color: theme.colors.primary,
  },
});

const SortPicker = ({ selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        <Picker.Item
          label="Select a sort option"
          value=""
          enabled={false}
          color="gray"
        />
        <Picker.Item
          label="Latest repositories"
          value="latest"
          color={selectedValue === "latest" ? theme.colors.primary : ""}
        />
        <Picker.Item
          label="Highest rated repositories"
          value="highest"
          color={selectedValue === "highest" ? theme.colors.primary : ""}
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="lowest"
          color={selectedValue === "lowest" ? theme.colors.primary : ""}
        />
      </Picker>
    </View>
  );
};

export default SortPicker;
