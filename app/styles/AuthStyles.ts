import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e6f7e1', // Fundo verde claro
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40, // Reduzi o espaçamento para acomodar o subtítulo
    color: '#006400',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40, // Espaçamento adequado para separar do campo de entrada
    color: '#006400',
    fontWeight: '400',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  icon: {
    paddingRight: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#bcd5c2',
    borderWidth: 1,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 30,
    marginVertical: 20,
    shadowColor: '#2e7d32',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10, // Para separar o texto do ícone
  },
  linkButton: {
    marginVertical: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro semitransparente
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
});
