# TASK 2 — Respuestas

### 1. ¿Cuál es la diferencia entre `onPress={handlePress}` y `onPress={handlePress()}`?

`onPress={handlePress}` ejecuta la función cuando presionamos el botón.

`onPress={handlePress()}` ejecuta la función inmediatamente, sin esperar a que presionemos el botón.

### 2. ¿Cuál es la diferencia entre Button y Pressable?

`Button` es un botón sencillo con pocas opciones de personalización.

`Pressable` permite cambiar el diseño y agregar efectos cuando lo presionamos.

### 3. ¿Cómo funciona `pressed` en Pressable?

`pressed` indica si estamos presionando el botón.

Podemos utilizarlo para cambiar su apariencia, por ejemplo, hacerlo más transparente mientras lo presionamos.

### 4. ¿Por qué utilizamos funciones para actualizar el estado en lugar de modificarlo directamente?

Porque React necesita saber cuándo cambia un valor para actualizar la pantalla.

Por eso utilizamos funciones como `setIsFollowing()` o `setMessage()`.

### 5. ¿Por qué calculamos los seguidores utilizando `isFollowing`?

Porque la cantidad de seguidores depende de si seguimos al usuario.

Si `isFollowing` es `true`, sumamos 1. Si es `false`, no sumamos nada.

### 6. ¿Qué hace que TextInput sea un componente controlado?

Utilizamos `value` para mostrar el texto guardado y `onChangeText` para actualizarlo cuando escribimos.

Así, React mantiene el control del contenido.

### 7. ¿Por qué debemos evitar modificar directamente los arreglos en React?

Porque React necesita recibir un nuevo arreglo para detectar correctamente los cambios.

Por eso utilizamos `filter()` o el operador de expansión (`...`) en lugar de modificar el arreglo original.