import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import NavBar from '../components/NavBar';
import { Ionicons } from '@expo/vector-icons';
import algoliasearch from 'algoliasearch/reactnative';
import { InstantSearch } from 'react-instantsearch-native';
import SearchBox from '../components/SearchBox';
import InfiniteHits from '../components/InfiniteHits';

const APPLICATION_ID = 'VCMAWXIEEA';
const SEARCH_API_KEY = '4769874313257efb7dc86d15025147e9';
const ALGOLIA_INDEX = 'band_finder_musicos';

// const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
// const index = client.initIndex(ALGOLIA_INDEX);

const searchClient = algoliasearch(
  'VCMAWXIEEA',
  '019ce27d28ab4ab1e93819b2c6455107'
);

class SearchScreen extends React.Component {
  root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle='light-content' />
        <View style={styles.container}>
          <InstantSearch
            searchClient={searchClient}
            indexName='dev_musicos'
            root={this.root}
          >
            <SearchBox />
            <InfiniteHits />
          </InstantSearch>
        </View>
      </SafeAreaView>
    );
  }
}

export default SearchScreen;

export const screenOptions = (navData) =>
  NavBar(navData, true, 'Search', 'search', Ionicons, () => {});

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
