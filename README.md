# Gestión Digital
*Gestión Digital* es un aplicación móvil **(android)** desarrollada como proyecto de grado para solucionar la problematica de los distribuidores independientes en la ciudad de Villavicencio - Meta, que necesitan llevar su contabilidad diaria, mediante las ventas y los gastos registrados en sus rutas. Siendo posible llevar un control de inventario y ventas a clientes registrados en su agenda de clientes directamente en la aplicación. Dichas ventas pueden ser visualizadas en mapa si se ha guardado su ubicación en el registro.
## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos 📋

Este proyecto esta realizado con Firebase, por lo tanto es necesario configurar sus propias credenciales de usuario.

En el archivo **firebaseConfig.js** ubicado en la ruta ```./firebaseConfig.js```, editar lo siguiente con sus credenciales de firebase:

```
export default {
    apiKey: 'XXXX',
    authDomain: 'XXXX',
    databaseURL: 'XXXX',
    projectId: 'XXXX',
    storageBucket: 'XXXX',
    messagingSenderId: 'XXXX',
    appId: 'XXXX'
};
```
En el archivo **credentials.json** ubicado en la ruta ```./credentials.json```, editar lo siguiente con sus credenciales encontrados en GoogleCloud como su apiKey de GoogleSignIn(+GoogleMaps) junto a su hash y sus ClientID para aplicaciones android:

```
{
    "apiKey": "XXXX",
    "certificateHash": "XXXX",
    "androidClientId": "XXXX",
    "androidStandaloneClientId": "XXXX"
}
```

Y por ultimo y no menos importante habilitar Firestore en la consola firebase.

*Tambien es necesario tener una version reciente de Yarn y Node.js, para poder ejecutar este proyecto.*

### Instalación 🔧

Para instalar el proyecto con Node.js solo basta ejecutar:

```bash
$ yarn install
```

Esto instalara las dependencias necesarias para que nuestro proyecto funcione.

### Ejecutar proyecto (Expo Go) ⚡

Es necesario tener instalada la aplicación Expo Go encontrada en la PlayStore ([Expo Go Playstore](https://play.google.com/store/apps/details?id=host.exp.exponent))
```bash
$ yarn start
```
Y finalmente leer el codigo QR mostrado en consola desde la aplicación *Expo Go*.

## Construido con 🛠️
* [Node.js](https://nodejs.org/) - JavaScript runtime environment.
* [Yarn](https://yarnpkg.com/getting-started/) - Manejador de dependencias.
* [Expo](https://docs.expo.dev/workflow/expo-cli/) - Framework basado en React Native.
* [Firebase](https://firebase.google.com/) - Servicio usado como Backend de la aplicación.

## Autores ✒️

* **Jeyson Pereira** - [Jeyson Pereira](https://github.com/jeyson-pereira)
* **David Cortes** - [David Cortes](https://github.com/DavidCortes13)

## Licencia 📄

Este proyecto está bajo la Licencia (GPL) - mira la web oficial de la licancia [GPL](https://www.gnu.org/licenses/licenses.es.html) para detalles

