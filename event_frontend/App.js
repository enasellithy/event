import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import client from './src/apolloClient'; // Import Apollo Client
import EventList from './src/EventList';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Text>Something went wrong.</Text>;
    }

    return this.props.children;
  }
}

// Main App Component
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Event Ticketing', style: { color: '#fff', fontSize: 18 } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        containerStyle={styles.header}
      />

      {/* Event List */}
      <EventList />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    backgroundColor: '#000',
    height: 60,
    marginBottom: 25,
    color: '#000',
    fontWeight: 'bolder',
    fontSize: 30,
  },
});

// Wrap the App with ErrorBoundary, SafeAreaProvider, and ApolloProvider
export default function Main() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ApolloProvider client={client}> {/* Wrap with ApolloProvider */}
          <App />
        </ApolloProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}