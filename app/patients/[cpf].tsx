import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { Patient } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import styles from '../styles/PacienteDetailsStyles';

const PacienteDetails = () => {
  const { cpf } = useLocalSearchParams(); // Pegando o parâmetro dinâmico da URL
  const { db } = useSystem();
  const [paciente, setPaciente] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (cpf && typeof cpf === 'string') {
      loadPaciente(cpf);
    } else {
      Alert.alert('Erro', 'CPF inválido ou não fornecido.');
      router.replace('/home/');
    }
  }, [cpf]);

  const loadPaciente = async (cpf: string) => {
    setLoading(true);
    try {
      const result = await db
        .selectFrom('patients')
        .selectAll()
        .where('cpf_patients', '=', cpf)
        .execute();
      setPaciente(result[0]);
    } catch (error) {
      console.error('Erro ao carregar paciente:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando detalhes do paciente...</Text>
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Paciente não encontrado.</Text>
      </View>
    );
  }

  const handleConsulta = () => {
    router.push('/attendences/consulta', { paciente }); // Passando o paciente diretamente
  };

  const handleCadastroProntuario = () => {
    router.push('/attendences/cadastro', { paciente });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do Paciente</Text>
      <Text>Nome: {paciente.nome_patients}</Text>
      <Text>CPF: {paciente.cpf_patients}</Text>
      <Text>Data de Nascimento: {paciente.data_nasc_patients}</Text>
      <Text>CEP: {paciente.cep_patients}</Text>
      <Text>UF: {paciente.uf_patients}</Text>
      <Text>Cidade: {paciente.cidade_patients}</Text>
      <Text>Endereço: {paciente.endereco_patients}</Text>
      <Text>Telefone: {paciente.fone_patients}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonprontuario} onPress={handleConsulta}>
          <Text style={styles.buttonText}>Abrir Consulta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonprontuario} onPress={handleCadastroProntuario}>
          <Text style={styles.buttonText}>Cadastrar Prontuário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBack} onPress={() => router.replace('/home/')}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PacienteDetails;
