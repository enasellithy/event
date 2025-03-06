import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Platform, StyleSheet, TextInput } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import SweetAlert from 'react-native-sweet-alert'; // For React Native
import Swal from 'sweetalert2'; // For Web

// GraphQL query to fetch all events
const GET_EVENTS = gql`
  query {
    events {
      id
      name
      date
      ticketsAvailable
      status
    }
  }
`;

// GraphQL mutation to purchase tickets
const PURCHASE_TICKETS = gql`
  mutation PurchaseTickets($eventId: Float!, $ticketsPurchased: Float!, $orderNumber: String!) {
    purchaseTickets(eventId: $eventId, ticketsPurchased: $ticketsPurchased, orderNumber: $orderNumber) {
      id
      orderNumber
      ticketsPurchased
      event {
        id
        name
        ticketsAvailable
      }
    }
  }
`;

// Generate a 3-character string combined with one number (e.g., "ABC1")
const generateThreeCharAndOneNumber = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // All uppercase letters
  const numbers = '0123456789'; // All digits

  // Generate 3 random letters
  let threeChars = '';
  for (let i = 0; i < 3; i++) {
    threeChars += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate 1 random number
  const oneNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));

  // Combine the letters and number
  return `${threeChars}${oneNumber}`;
};

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [ticketCounts, setTicketCounts] = useState({}); // State to store ticket counts for each event

  // Fetch events using the GET_EVENTS query
  const { loading, error, data } = useQuery(GET_EVENTS);

  // Mutation to purchase tickets
  const [purchaseTickets] = useMutation(PURCHASE_TICKETS);

  // Update the events state when data is fetched
  useEffect(() => {
    if (data && data.events) {
      setEvents(data.events);
    }
  }, [data]);

  // Handle ticket purchase
  const handlePurchase = async (eventId) => {
    const ticketsPurchased = ticketCounts[eventId] || 1; // Default to 1 if no input

    // Validate ticket count
    if (ticketsPurchased <= 0 || isNaN(ticketsPurchased)) {
      alert('Please enter a valid number of tickets.');
      return;
    }

    try {
      const orderNumber = generateThreeCharAndOneNumber() + ' # ' + eventId; // Generate a unique order number
      const { data } = await purchaseTickets({
        variables: {
          eventId: parseFloat(eventId), // Convert to Float
          ticketsPurchased: parseFloat(ticketsPurchased), // Convert to Float
          orderNumber,
        },
      });

      // Show success alert
      if (Platform.OS === 'web') {
        // Use sweetalert2 for web
        Swal.fire({
          title: 'Purchase Successful',
          html: `
            <p>Order Number: <strong>${data.purchaseTickets.orderNumber}</strong></p>
            <p>Tickets Purchased: <strong>${data.purchaseTickets.ticketsPurchased}</strong></p>
            <p>Event: <strong>${data.purchaseTickets.event.name}</strong></p>
            <p>Remaining Tickets: <strong>${data.purchaseTickets.event.ticketsAvailable}</strong></p>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        // Use react-native-sweet-alert for mobile
        SweetAlert.showAlertWithOptions({
          title: 'Purchase Successful',
          html: `
            <p>Order Number: <strong>${data.purchaseTickets.orderNumber}</strong></p>
            <p>Tickets Purchased: <strong>${data.purchaseTickets.ticketsPurchased}</strong></p>
            <p>Event: <strong>${data.purchaseTickets.event.name}</strong></p>
            <p>Remaining Tickets: <strong>${data.purchaseTickets.event.ticketsAvailable}</strong></p>
          `,
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'success', // Success style
        });
      }
    } catch (error) {
      // Show error alert
      if (Platform.OS === 'web') {
        // Use sweetalert2 for web
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        // Use react-native-sweet-alert for mobile
        SweetAlert.showAlertWithOptions({
          title: 'Error',
          subTitle: error.message,
          style: 'error', // Error style
        });
      }
    }
  };

  // Handle ticket count input change
  const handleTicketCountChange = (eventId, value) => {
    setTicketCounts((prev) => ({
      ...prev,
      [eventId]: parseInt(value, 10), // Convert input to number
    }));
  };

  // Display loading state while fetching data
  if (loading) return <Text>Loading...</Text>;

  // Display error message if there's an error
  if (error) return <Text>Error: {error.message}</Text>;

  // Render the table header
  const renderTableHeader = () => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableHeader, styles.columnName]}>Name</Text>
      <Text style={[styles.tableHeader, styles.columnDate]}>Date</Text>
      <Text style={[styles.tableHeader, styles.columnTickets]}>Tickets Available</Text>
      <Text style={[styles.tableHeader, styles.columnStatus]}>Status</Text>
      <Text style={[styles.tableHeader, styles.columnAction]}>Action</Text>
    </View>
  );

  // Render each row in the table
  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.columnName]}>{item.name}</Text>
      <Text style={[styles.tableCell, styles.columnDate]}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text style={[styles.tableCell, styles.columnTickets]}>{item.ticketsAvailable}</Text>
      <Text style={[styles.tableCell, styles.columnStatus]}>{item.status}</Text>
      <View style={[styles.tableCell, styles.columnAction]}>
        <TextInput
          style={styles.input}
          placeholder="Tickets"
          keyboardType="numeric"
          disabled={item.status === 'Sold Out'}
          value={ticketCounts[item.id] ? ticketCounts[item.id].toString() : ''}
          onChangeText={(value) => handleTicketCountChange(item.id, value)}
        />
        <Button
          title={item.status === 'Sold Out' ? 'Sold Out' : 'Purchase'}
          onPress={() => handlePurchase(item.id)} // Pass the event ID
          disabled={item.status === 'Sold Out'} // Disable the button if status is "Sold Out"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <strong style={styles.note}>Note: <small>If Click On Purchase Button , Will Automatic  Register One Tikect if you need take more than one ticket please type count of ticket </small></strong>

      {renderTableHeader()}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

// Styles for the table layout
const styles = StyleSheet.create({
  note: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 5,
  },
  columnName: {
    flex: 2,
  },
  columnDate: {
    flex: 1.5,
  },
  columnTickets: {
    flex: 1.5,
  },
  columnStatus: {
    flex: 2,
  },
  columnAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
  },
});

export default EventList;