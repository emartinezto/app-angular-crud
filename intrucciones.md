## API DE USUARIOS
https://peticiones.online/users 

## URL Iconografia
https://phosphoricons.com/

- Componentes:

    - shared/header
    - pages/home => "/home" > donde ser cargará el listado de usuarios completo.
    - pages/user => "/user/:id" > donde ser cargará la vista de usuario con todos sus datos.
    - pages/newuser => "/newuser" > donde ser cargará un formulario que dará de alta un usuario siguiendo el patron del api de creater user.
    - pages/updateuser => "/updateuser/:id" > se cargará reutilizando el formulario de registro los datos del usuario a actualizar para que se pueda actualizar los datos y mandárselos al api.

- Interface user
- Servicios => que será el encargado de conectar con la API y traerse los datos. Y servirlos a los diferentes componentes

    - components/user-card => que es la tarjeta que vamos a cargar del propio usuario

    <!-- cosas pendientes -->
    - refactorizar archivos ts

    <!-- Cosas que comentar a Juan Antonio -->
    - cuando se actualizar un usuario cambia todas las propiedades menos el password, da igual que se lo enviemos, no lo actualiza. No pasa nada por pasarle el _id en el servicio, aun asi el servicio nos devuelve un response ok. No response.error

    - cuando se crea un nuevo recoge todas los campos menos image, da igual que se lo enviemos, no lo actualiza, te da uan pro defecto. No pasa nada por pasarle el _id en el servicio, aun asi el servicio nos devuelve un response ok. No response.error.
