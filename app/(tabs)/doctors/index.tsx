import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';

import { useSystem } from '../../../powersync/PowerSync';
import { useDoctor } from '../../context/DoctorContext';

const DoctorProfile: React.FC = () => {
  const { supabaseConnector } = useSystem();
  const { setSelectedDoctor } = useDoctor();
  const [doctor, setDoctor] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadDoctorData();
  }, []);

  const loadDoctorData = async () => {
    setLoading(true);
    try {
      // Obtendo as credenciais do usuário autenticado
      const { client } = supabaseConnector;
      const { data: userData, error: userError } = await client.auth.getUser();

      if (userError || !userData.user) {
        throw new Error('Erro ao obter informações do usuário. Faça login novamente.');
      }

      const userId = userData.user.id;

      if (!userId) {
        throw new Error('Usuário não autenticado ou credenciais inválidas.');
      }

      // Buscar os dados do médico no Supabase utilizando o auth_user_id
      const { data, error } = await client
        .from('doctors')
        .select('*')
        .eq('auth_user_id', userId) // Corrigido para usar auth_user_id
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Se não encontrar, significa que o médico não foi registrado
          Alert.alert(
            'Aviso',
            'Nenhum médico registrado para esse usuário. Por favor, registre-se.',
            [
              {
                text: 'Registrar Médico',
                onPress: () => router.replace('/(tabs)/doctors/register'),
              },
            ]
          );
        } else {
          throw new Error(`Erro ao buscar dados do médico: ${error.message}`);
        }
      } else if (data) {
        setDoctor(data);
        setSelectedDoctor(data); // Armazenando o doctor_id no contexto
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do médico:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do médico. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A700FF" />
        <Text>Carregando os dados do médico...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {doctor ? (
        <>
          <Text style={styles.header}>Perfil do Médico</Text>
          <Text style={styles.text}>Nome: {doctor.name ?? 'Nome não disponível'}</Text>
          <Text style={styles.text}>Email: {doctor.email ?? 'Email não disponível'}</Text>
          <Text style={styles.text}>
            Data de Criação:{' '}
            {doctor.created_at
              ? new Date(doctor.created_at).toLocaleDateString()
              : 'Data não disponível'}
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#007BFF' }]}
            onPress={() => router.push('/(tabs)/doctors/update')}>
            <Text style={styles.buttonText}>Atualizar Dados</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/home/')}>
            <Text style={styles.buttonText}>Voltar para Home</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>
          Dados do médico não encontrados. Tente novamente mais tarde.
        </Text>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
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
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default DoctorProfile;
