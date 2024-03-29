import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
//import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, database, getAuth, auth } from '../fb';
import { ScrollView } from 'react-native-gesture-handler';

export default function Cadastrar({navigator, route}) {
  const [senha, setSenha] = useState('');
  const [senha1, setSenha1] = useState('');
  const [email, setEmail] = useState('');
  const [nCompleto, setNCompleto] = useState('');
  const [saldo, setSaldo] = useState('');
  const [validarEmail, setvalidarEmail] = useState(false)
  const [botaoPressionado, setbotaoPressionado] = useState(false);
  const navigation = useNavigation();


  const ValidarEmail = (text) => {
    // expressão regular para verificar o formato do email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(text);
    setvalidarEmail(isValid);
    setEmail(text);
  };

  const cadastrarUsuario = async () => {
    setbotaoPressionado(true);
    if (senha !== senha1) {
      Alert.alert('Senhas Diferentes', 'Por favor, certifique-se de que as senhas estejam iguais!');
      setSenha('');
      setSenha1('');
    } else if (!validarEmail) {
      setEmail('');
      Alert.alert('E-mail inválido', 'Por favor, insira um e-mail válido.');
    } else {
      try {
        // Cria o usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
  
        if (user) {
          // Salva os dados no Firestore Database e obtém a referência do documento
          const docRef = await addDoc(collection(database, 'Usuarios'), {
            nome: nCompleto,
            email: user.email,
            senha: senha,
            saldo: parseFloat(saldo),
            createdAt: new Date(),
          });
  
          // Obtém o ID do documento criado
          const docId = docRef.id;
  
          // Redireciona para a tela de Home, passando o ID do documento como parâmetro
          navigation.navigate('Home', { docId } );
        } else {
          console.log('Erro ao cadastrar o usuário');
        }
      } catch (error) {
        console.log('Erro ao cadastrar o usuário:', error);
        setEmail('');
        setSenha('');
        setSenha1('');
      }
    }
  };

  return (
    <LinearGradient style={styles.container} colors={['#AFFFA8', '#4b726b']}>
      <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate('Login')}>
        <AntDesign name="left" color="#292D32" size={40}/>
      </TouchableOpacity>

    
   {/*    <Ionicons name="document-text" size={120} style={styles.logo} /> */}
   <View style={styles.aba}>

        <Text style={styles.txtTitle}>Termos de uso</Text>
      </View>

      <View style={styles.row}>
      <ScrollView style={styles.ScrollView}>
            <Text style={styles.txtBtn}>Termos de Uso e Política de Privacidade

      Este documento estabelece os Termos de Uso e a Política de Privacidade aplicáveis ao uso dos serviços oferecidos por Real , em conformidade com as disposições da Lei Geral de Proteção de Dados (LGPD).

      1. Consentimento do Usuário

      Ao utilizar nossos serviços, você concorda com os termos e condições estabelecidos neste documento. Além disso, ao fornecer qualquer informação pessoal, você consente expressamente com a coleta, uso, armazenamento e divulgação dessas informações de acordo com esta Política de Privacidade.

      2. Coleta de Informações

      Coletamos informações pessoais fornecidas voluntariamente pelos usuários, incluindo, mas não se limitando a, nome, endereço de e-mail, informações de contato e dados relacionados ao uso de nossos serviços. Essas informações são necessárias para fornecer funcionalidades específicas e personalizar a experiência do usuário.

      3. Uso de Informações Pessoais

      As informações pessoais coletadas serão utilizadas para os seguintes propósitos:

      Fornecer e manter nossos serviços;
      Personalizar e aprimorar a experiência do usuário;
      Enviar informações importantes relacionadas aos nossos serviços;
      Cumprir obrigações legais e regulamentares.
      4. Compartilhamento de Informações

      Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para fornecer nossos serviços ou quando exigido por lei. Tomaremos todas as medidas razoáveis para garantir a segurança e confidencialidade de suas informações.

      5. Segurança da Informação

      Implementamos medidas de segurança adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição não autorizada. No entanto, não podemos garantir a segurança completa de suas informações.

      6. Cookies e Tecnologias Semelhantes

      Podemos utilizar cookies e outras tecnologias semelhantes para melhorar a funcionalidade de nossos serviços e coletar informações sobre o uso do site. Ao utilizar nossos serviços, você concorda com o uso dessas tecnologias.

      7. Direitos do Titular dos Dados

      Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos ou para qualquer dúvida sobre esta Política de Privacidade, entre em contato conosco através dos canais fornecidos em nosso site.

      8. Alterações na Política de Privacidade

      Reservamo-nos o direito de alterar esta Política de Privacidade a qualquer momento. Recomendamos que você revise periodicamente esta política para estar ciente de quaisquer atualizações.

      Ao continuar a usar nossos serviços após qualquer alteração nesta Política de Privacidade, você concorda com as modificações feitas.

      Data de Última Atualização: 28/11/2023

      Este documento reflete nossos compromissos com a proteção de suas informações e está em conformidade com as diretrizes estabelecidas pela Lei Geral de Proteção de Dados (LGPD). Se você tiver alguma dúvida ou preocupação sobre esta política, entre em contato conosco.</Text>
       </ScrollView>
 
     </View>

        
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Cadastrar')}>
        <Text style={styles.txtBtn}>Aceitar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.txtBtn}>Recusar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
        }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eefafa",
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    backgroundColor:"#29322C",
    padding: 20,
    borderRadius: 10,
    height:"60%",
    width:300,
    marginHorizontal:"20%",
  },
  aba:{
    flexDirection:"row",
    backgroundColor:"#29322C",
    borderRadius: 10,
    width:350,
    padding:15,
    marginBottom:10,
  },
  ScrollView: {
    width: '100%',
    height: '100%',
  },
  aba:{
    flexDirection:"row",
    backgroundColor:"#29322C",
    borderRadius: 10,
    width:300,
    padding:5,
    marginBottom:10,
  },
  logo: {
    color:"#292D32",
    marginBottom:20,
  },
  icon:{
    color:"#292D32",
    marginRight:10
  },
  iconBack:{
    width:"90%",
    flexDirection:"row",
    marginLeft:"10%"
  },
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width:250,
    marginTop: 2,
    marginBottom:4,
    height: 30,
    backgroundColor: "#E4E4E4",
    borderWidth: 0,
    borderRadius: 13,
    paddingLeft:10,
  },
  btn: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#29322C",
    paddingHorizontal: 50,
    paddingVertical:5,
  },
  btn2: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#29322C",
    paddingHorizontal: 50,
    paddingVertical:5,
  },
  btn3: {
    marginTop: 20,
    marginBottom:30,
    borderRadius: 10,
    backgroundColor: "#29322C",
    paddingHorizontal: 50,
    paddingVertical:5,
  },
  txtBtn: {
    color:"#fff",
    alignContent:"center"
  },
  txtTitle: {
    fontSize: 25,
    marginRight:"15%",
    color:"#fff",
    marginLeft:57
  },
  inputs: {
    flexDirection:"row",
    alignItems:"center",
    right:17,
    marginBottom:24
  },
  inputError: {
    borderColor: 'red', // Estilo de erro
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -24,
    marginBottom:4,
  },
})