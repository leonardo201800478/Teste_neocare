import { useRouter } from 'expo-router';
import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function GraficosMeninos0a2() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gráfico Meninos 0 a 2 Meses</Text>
      <ScrollView horizontal>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/graficos/menino0-2.jpg')} style={styles.image} />
          <Image source={require('../assets/graficos/menino0-2_2.jpg')} style={styles.image} />
          <Image source={require('../assets/graficos/menino0-2_3.jpg')} style={styles.image} />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/graficos/')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 60,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  image: {
    width: 1000, // Largura ajustada para permitir a rolagem horizontal
    height: 650,
    margin: 10,
    resizeMode: 'contain', // Para garantir que a imagem não seja cortada
  },
});
