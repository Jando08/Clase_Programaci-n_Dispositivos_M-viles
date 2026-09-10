import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';

export default function App() {
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [edad, setEdad] = useState('');


  // Función que se dispara al presionar el botón
  const registrarAlumno = () => {
    if (!matricula || !nombre || !carrera || !edad) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    Alert.alert('Éxito', `Alumno ${nombre} registrado con matrícula ${matricula}`);
    // Limpiar formulario
    setMatricula(''); setNombre(''); setCarrera(''); setEdad('');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
    },
    scroll: {
      padding: 20,
      justifyContent: 'center',
      flexGrow: 1,
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#333',
    },
    etiqueta: {
      fontSize: 16,
      marginBottom: 5,
      color: '#555',
    },
    input: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
      fontSize: 16,
    },
    boton: {
      backgroundColor: '#007BFF',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    textoBoton: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    creditos: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 14,
      color: '#888',
    }
  });

  return (
    // KeyboardAvoidingView evita que el teclado del celular tape el formulario
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <Text style={styles.titulo}>Registro de Alumnos</Text>

        {/* Cajas de texto para entrada de datos (Punto 3.1) */}
        <Text style={styles.etiqueta}>Matrícula:</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric" 
          value={matricula} 
          onChangeText={setMatricula} // Al escribir, actualiza el estado
        />

        <Text style={styles.etiqueta}>Nombre:</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

        <Text style={styles.etiqueta}>Carrera:</Text>
        <TextInput style={styles.input} value={carrera} onChangeText={setCarrera} />

        <Text style={styles.etiqueta}>Edad:</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric" 
          maxLength={2} 
          value={edad} 
          onChangeText={setEdad} 
        />

        {/* Botón personalizado usando TouchableOpacity */}
        <TouchableOpacity style={styles.boton} onPress={registrarAlumno}>
          <Text style={styles.textoBoton}>Guardar Datos</Text>
        </TouchableOpacity>
        <Text style={styles.creditos}>
          Trabajo Desarrollado por: "Alejandro Parra Leyva" - 24030778"
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );

} // Cierre de la función App

