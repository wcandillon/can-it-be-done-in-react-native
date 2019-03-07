import * as React from "react";
import {
  View, Text, StyleSheet, ScrollView,
} from "react-native";

import Category from "./Category";
import StyleGuide from "./StyleGuide";

import {
  Homes, Experiences, Restaurants,
} from "./Images";

interface ExploreProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class Explore extends React.PureComponent<ExploreProps> {
  render() {
    return (
      <View>
        <Text style={styles.title}>Explore</Text>
        <ScrollView horizontal style={styles.scrollView} contentContainerStyle={styles.container}>
          <Category label="Homes" image={Homes} />
          <Category label="Experiences" image={Experiences} />
          <Category label="Restaurants" image={Restaurants} />
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    ...StyleGuide.typography.title1,
    paddingLeft: StyleGuide.spacing.base,
  },
  scrollView: {
    paddingHorizontal: StyleGuide.spacing.base,
    marginBottom: StyleGuide.spacing.base,
  },
  container: {
    paddingRight: StyleGuide.spacing.base,
  },
});
