import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';

import { Patient } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';

const ConsultaDetails = () => {
  const { patientId } = useLocalSearchParams(); // Recebe o ID do paciente como parâmetro da URL
  const { db, supabaseConnector } = useSystem();
  const { patient } = useLocalSearchParams(); // Recebe o registro do paciente selecionado
  const parsedPatient: Patient = patient ? JSON.parse(decodeURIComponent(patient as string)) : null;
  const [paciente, setPaciente] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (patientId && typeof patientId === 'string') {
      loadPaciente(patientId);
    } else {
      Alert.alert('Erro', 'ID do paciente inválido ou não fornecido.');
      router.replace('/home/');
    }
  }, [patientId]);

  const loadPaciente = async (id: string) => {
    setLoading(true);
    try {
      const { data: result, error } = await supabaseConnector.client
        .from('patients')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao carregar paciente:', error);
        Alert.alert('Erro', 'Erro ao carregar os dados do paciente.');
        router.replace('/home/');
      } else {
        setPaciente(result);
      }
    } catch (error) {
      console.error('Erro ao carregar paciente:', error);
      Alert.alert('Erro', 'Erro ao carregar os dados do paciente.');
      router.replace('/home/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#32CD32" />
        <Text>Carregando detalhes da consulta...</Text>
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Erro: Nenhum paciente encontrado!</Text>
      </View>
    );
  }

  const handleOpenProntuario = () => {
    // Redirecionar para a página de consulta do paciente
    router.push(`/attendences/RegisterAttendance?patientId=${parsedPatient?.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consulta do Paciente</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>Nome: {paciente.name}</Text>
        <Text style={styles.detailItem}>CPF: {paciente.cpf}</Text>
        {/* Outros dados da consulta podem ser exibidos aqui */}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/home/')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonProntuario} onPress={handleOpenProntuario}>
        <Text style={styles.buttonText}>ABRIR CONSULTA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e8f5e9', // Verde claro
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2e7d32', // Verde escuro
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  detailItem: {
    fontSize: 18,
    color: '#2e7d32', // Verde escuro
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50', // Verde mais escuro para contraste
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonProntuario: {
    backgroundColor: '#388E3C', // Verde mais escuro para contraste
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConsultaDetails;
