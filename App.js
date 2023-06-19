import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { CheckBox } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';

export default function App() {
  const { control, handleSubmit, formState } = useForm({});
  const [isJuridica, setIsJuridica] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredData, setRegisteredData] = useState([]);

  function handleSignIn(data) {
    setRegisteredData((prevData) => [...prevData, data]);
    setIsSubmitted(true);
  }

  function handleCheckBoxToggle() {
    setIsJuridica(!isJuridica);
  }

  function handleFileSelection() {
    FilePickerManager.showFilePicker(null, (response) => {
      if (response.didCancel) {
        console.log('Seleção de arquivo cancelada pelo usuário');
      } else if (response.error) {
        console.log('Erro ao selecionar o arquivo:', response.error);
      } else {
        setSelectedFile(response);
      }
    });
  }

  function renderRegisteredData() {
    return registeredData.map((data, index) => (
      <View key={index} style={styles.registeredDataContainer}>
        <Text style={styles.registeredDataText}>Nome: {data.username}</Text>
        <Text style={styles.registeredDataText}>Email: {data.email}</Text>
        <Text style={styles.registeredDataText}>Contato: {data.contato}</Text>
        <Text style={styles.registeredDataText}>CPF: {data.cpf}</Text>
      </View>
    ));
  }

  function handleNewRegistration() {
    setIsJuridica(false);
    setSelectedFile(null);
    setIsSubmitted(false);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/background.jpeg')}
        style={[styles.backgroundImage, { opacity: 0.4 }]}
      />
      {!isSubmitted ? (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Seja bem-vindo(a)</Text>
          <Text style={styles.subtitle}>Cadastre-se agora para receber mais informações!</Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Pessoa Física"
              checked={!isJuridica}
              onPress={handleCheckBoxToggle}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
            />
            <CheckBox
              title="Pessoa Jurídica"
              checked={isJuridica}
              onPress={handleCheckBoxToggle}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
            />
          </View>

          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Seu nome"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Seu email"
              />
            )}
          />

          <Controller
            control={control}
            name="contato"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Seu contato"
              />
            )}
          />

          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="CPF/CNPJ"
              />
            )}
          />

          {isJuridica && (
            <View style={styles.uploadContainer}>
              <Button title="Selecionar arquivo" onPress={handleFileSelection} />
              {selectedFile && <Text>Arquivo selecionado: {selectedFile.fileName}</Text>}
            </View>
          )}
          <Button style={styles.button} title="Cadastrar" onPress={handleSubmit(handleSignIn)} />
        </View>
      ) : (
        <View style={styles.registeredDataContainer}>
          <Text style={styles.registeredDataTitle}>Pessoas Cadastradas:</Text>
          {renderRegisteredData()}
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title="Voltar" onPress={handleNewRegistration} />
            <Button style={styles.button} title="Novo Cadastro" onPress={handleNewRegistration} />
            {/* <Button style={styles.deleteButton} title="Excluir" onPress={() => handleDeleteRegistration(index)}/>
            <Button style={styles.editButton}title="Editar" onPress={() => handleEditRegistration(index)}/> */}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 40,
    marginBottom: 34,
    color: '#eb6f02',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 34,
    color: '#eb6f02',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 20,
    paddingLeft: 15,
    opacity: 0.6,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  checkboxText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  uploadContainer: {
    marginBottom: 40,
  },
  button: {
    color: '#ffff',
    padding: 10,
    borderRadius: 5,
  },
  registeredDataContainer: {
    marginVertical: 50,
    color: '#FFFFFF',
  },
  registeredDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    paddingLeft: 15,
  },
  registeredDataText: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingLeft: 15,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  // deleteButton: {
  //   marginRight: 10,
  //   backgroundColor: '#ff0000',
  // },
  // editButton: {
  //   backgroundColor: '#eb6f02',
  // },
});
