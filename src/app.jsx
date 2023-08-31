import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    // Get the list of players from the server
    fetch("https://api.example.com/players")
      .then(response => response.json())
      .then(players => setPlayers(players));

    // Get the list of days from the server
    fetch("https://api.example.com/days")
      .then(response => response.json())
      .then(days => setDays(days));
  }, []);

  const handleAddPlayer = (name) => {
    // Add the player to the list
    setPlayers([...players, name]);
  };

  const handleSelectPlayer = (name) => {
    // Select the player
    setSelectedPlayers([...selectedPlayers, name]);
  };

  const handleDeselectPlayer = (name) => {
    // Deselect the player
    setSelectedPlayers(selectedPlayers.filter(player => player !== name));
  };

  const handleMarkPaid = (name) => {
    // Mark the player as paid
    setSelectedPlayers(selectedPlayers.map(player => {
      if (player === name) {
        return {
          ...player,
          paid: true,
        };
      } else {
        return player;
      }
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Football 7 Manager</Text>
      <View style={styles.players}>
        <Text style={styles.playersHeader}>Players</Text>
        <ul>
          {players.map(player => (
            <li key={player.id}>
              <Text>{player.name}</Text>
              <Button
                title="Add"
                onPress={() => handleAddPlayer(player.name)}
              />
            </li>
          ))}
        </ul>
      </View>
      <View style={styles.days}>
        <Text style={styles.daysHeader}>Days</Text>
        <ul>
          {days.map(day => (
            <li key={day.id}>
              <Text>{day.date}</Text>
              <Button
                title="Select"
                onPress={() => handleSelectPlayer(day.name)}
              />
              <Button
                title="Mark as Paid"
                onPress={() => handleMarkPaid(day.name)}
                disabled={!selectedPlayers.includes(day.name)}
              />
            </li>
          ))}
        </ul>
      </View>
      <View style={styles.selectedPlayers}>
        <Text style={styles.selectedPlayersHeader}>Selected Players</Text>
        <ul>
          {selectedPlayers.map(player => (
            <li key={player.id}>
              <Text>{player.name}</Text>
            </li>
          ))}
        </ul>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  players: {
    flex: 1,
    margin: 10,
  },
  playersHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  days: {
    flex: 1,
    margin: 10,
  },
  daysHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedPlayers: {
    flex: 1,
    margin: 10,
  },
  selectedPlayersHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default App;