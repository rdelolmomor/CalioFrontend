# /middleware/socket.io/\*

Ficheros con lógica relativa a la gestión de la recepción y emisión de sockets.

- **socket.actionsV2**: Exporta las acciones que pueden ser disparadas desde Redux. Equivalen a realizar un socket.emit desde el cliente.
- **socket.constants**: DESUSO. Aquí deberían ir las constantes relativas a los sockets.
- **socket.eventHandlers**: las acciones, una vez interceptadas por el middleware, llamarán a las funciones definidas aquí para emitir un socket y gestionar la lógica una vez que se recibe una respuesta.
- **socket.listeners**: aquí se listan y se aplica la lógica de los manejadores de eventos para cada canal que se vaya a escuchar.
- **socket.middleware**: función encargada de interceptar las acciones de sockets y ejecutar la función correspondiente. Además, se encarga de distribuir las salas en el estado una vez logado; y captura el logout para limpiar las notificaciones y desconectar el socket.

# /features/\*

- **auth**: porción de estado (reducer) relativa a la información del usuario.
- **messages**: porción de estado (reducer) relativa a la lista de mensajes. Se sirve del _entityAdapter_.
- **notifications**: porción de estado (reducer) relativa a las notificaciones y a los popups.
- **polls**: porción de estado (reducer) relativa a las encuestas.
- **rooms**: porción de estado (reducer) relativa a las salas disponibles de un usuario. Se sirve del _entityAdapter_. Almacena también la sala activa.
- **users**: porción de estado (reducer) relativa a los usuarios conectados de la sala activa. Se sirve del _entityAdapter_.

# /contexts/ThemeContext

Permite manejar desde un contexto de React el tema claro/oscuro.

# app/\*

- **SocketClient**: clase que permite gestionar los eventos relacionados con los sockets. Sus métodos generalmente serán usados denrto de _/middleware/socket.io/\*_.
- **store**: declaración y fusión de los reducers de Redux, e implementación del middleware para capturar las acciones de los sockets.
- **themes**: declaración de las reglas CSS-in-JS para los temas de la web.

# /components/\*

- NavBar

  - NavItem
  - NavLabel
  - ProfileButton
  - ProfileDialog

- Home

  - HomeBox
  - Login

- ChatBox

  - **AdminPanel**: Modal que permite ejecutar acciones de administrador.
  - **Avatar**: Componente que permite renderizar un avatar de la librería Avataaars.
  - **FeedbackDialog**: Modal que permite enviar un reporte.
  - **Input**: Componentes relativos al formulario de envío de mensajes.
    - **CharacterCounter**: Contador de caracteres, aparece cuando en el formulario de envío quedan menos de 15 caracteres para llegar al límite (300).
    - **ExtraBox**: Caja multifunción que aparece cuando el usuario escribe @ o # en el formulario de envío, mostrando los usuarios online para hacer una mención o las etiquetas disponibles en la sala
    - **MessageInfo**: Caja que aparece debajo del formulario cuando se va a realizar una mención o un etiquetado del mensaje.
    - **Quote**: Caja que aparece cuando el usuario va a responder a un mensaje, mostrando el texto al que se responde.
  - **LabelsDialog**: `DESUSO`. Pendiente de hacer. Permitirá a un rol C1 en adelante o al creador del mensaje modificar las etiquetas de un mensaje.
  - **Message**: Componentes relativos a los mensajes de la lista de mensajes.
    - **Primary**: Componente que muestra el nombre de usuario y la fecha.
    - **Secondary**: Componente que muestra el contenido del mensaje + "@...:" cuando hay menciones.
  - **MessagesContextMenu**: Menú contextual que aparece al hacer click derecho sobre un mensaje siempre que tengas alguna acción que realizar.
  - **UsersContextMenu**: Menú contextual que aparece al hacer click derecho sobre un usuario.
  - **PollPanel**: Modal que permite la creación de encuestas para roles C1 en adelante.
  - **UserPoll**: Modal que permite responder a una encuesta en curso.
  - **ScrollButton**: Botón que aparece cuando se ha hecho cierta cantidad de scroll hacia arriba en la lista de mensajes. Al clickarlo hace scroll hasta abajo. Si este botón NO está, la lista bajará automáticamente al recibir nuevos mensajes; si el botón está, al recibir mensajes nuevos no cambiará el scroll.
  - **UsersList**: Componentes relativos a la lista de usuarios conectados.
    - **Placeholders**: Componentes que se muestran cuando no hay usuarios, resultados tras la búsqueda o las etiquetas de "# Agentes" y "# Staff".
    - **RewardsPanel**: Modal que permite otorgar reconocimientos a los roles "A1" y "A2" desde los roles C1 en adelante.
    - **UserItem**: Representa cada elemento en la lista de usuarios.
  - **VirtuosoContainer**: Componente encargado de renderizar de forma optimizada la lista de mensajes y hacer las gestiones relativas al scroll.

- Notifier
- Popups
- PrivateRoute
