// app/doctors/register.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useSystem } from '../../powersync/PowerSync';

const RegisterDoctor = () => {
  const [name, setName] = useState('');
  const { supabaseConnector } = useSystem();
  const router = useRouter();

  const handleRegisterDoctor = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio');
      return;
    }

    try {
      // Obter ID do usuário logado
      const { userID, client } = await supabaseConnector.fetchCredentials();
      const { error } = await client
        .from('doctors')
        .update({ name })
        .eq('id', userID);

      if (error) {
        throw new Error(`Erro ao atualizar o nome do médico: ${error.message}`);
      }

      Alert.alert('Sucesso', 'Médico registrado com sucesso!');
      router.replace('/home/');
    } catch (error) {
      console.error('Erro ao registrar o médico:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar o médico.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro do Médico</Text>

      <TextInput
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegisterDoctor}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    width: '80%',
    padding: 12,
    backgroundColor: '#A700FF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RegisterDoctor;
