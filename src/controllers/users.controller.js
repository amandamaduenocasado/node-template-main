const path = require('path');
const fs = require('fs');
const pathFile = path.resolve(__dirname, '../../data/users.json');

const usersController = {};

usersController.getAllUsers = (req, res) => {
  // primero leemos
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      // enviamos una respuesta de error
      return res.status(500).json({ error: 'error reading file' });
    } 
      // guardamos la información leída
      const jsonData = JSON.parse(data);
      return res.status(200).json(jsonData);
  });
};

usersController.getUserById = (req, res) => {
  const userId = req.params.id;

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'error reading file' });
    } 
      const jsonData = JSON.parse(data);
      const userFounded = jsonData.find(user => user.userId === userId);
      if (userFounded) {
        return res.status(200).json(userFounded);
      } 
        return res.status(404).json({ error: 'user not found' });
  });
};

// send > Sirve para mandar cualquier información
// json > Sirve para mandar información en formato objeto

usersController.createNewUser = (req, res) => {
  // los nuevos datos que introducimos están en req.body
  const newUser = req.body;
  // primero leemos los datos disponibles
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      // enviamos una respuesta de error
      return res.status(500).json({ error: "error reading file" });
    }  
    // guardamos los datos originales
    const jsonData = JSON.parse(data);
    // guardamos los datos originales + los nuevos que introducimos de new data
    const newData = [...jsonData, newUser];
    // tenemos todos los datos en newData, ahora tenemos que escribirlo
    fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
      if (error) {
        return res.status(500).json({ error: "error writing file" });
      }  
      return res.status(201).json(newData);
    });
  });
};


/* simplificamos:
    - cambiamos el el const userFound por el let 
    - usamos el spread operator para el userfoud y el req.body, sobreescribimos lo que queremos actualizar (userFound) y las propiedades que ya tenemos da igual la que sea porque será todo el body (req.body)
    simplificamos:
    - podemos quitar el else sustituyendolo por un return 
*/ 

usersController.updateUser = (req, res) => {
  const userId = req.params.id;

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'error reading file' });
    }  
    const jsonData = JSON.parse(data);
  
    let userFound = jsonData.find(user => user.userId === userId);
    
    userFound = { ...userFound, ...req.body };

    fs.writeFile(pathFile, JSON.stringify(jsonData), error => {
      if (error) {
        return res.status(404).json({ error: "user not found" });
      }
      res.status(200).json(jsonData);
    });
  });
};



// usersController.updateUsers = (req, res) => {
//   // buscar por id
//   const userId = req.params.id;
//   // primero debemos leer para buscar
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       // enviamos una respuesta de error
//       res.status(500).json({ error: "error reading file" });
//     } else {
//       // guardar los datos originales
//       const jsonData = JSON.parse(data);
//       // encontrar el usuario por el id
//       const userFound = jsonData.find((user) => user.userId === userId);
//       if (userFound) {
//         res.status(200).json(userFound);
//       } else {
//         res.status(404).json({ error: "user not found" });
//       }
//       // si req.body.name tiene un valor (no es undefined) entonces userFound.name se actualiza con ese valor
//       // si no tiene un valor, userFound.name mantiene su valor anterior
//       userFound.name = req.body.name || userFound.name;
//       userFound.email = req.body.email || userFound.email;
//       // escribir lo nuevo
//       fs.writeFile(pathFile, JSON.stringify(jsonData), (error) => {
//         if (error) {
//           res.status(500).json({ error: "error reading file" });
//         } else {
//           // recurso actualizado
//           res.status(202).json(jsonData);
//         }
//       });
//     }
//   });
// };


usersController.deleteUser = (req, res) => {
  // buscar por id
  const userId = req.body.id;
  // primero leemos
  fs.readFile(pathFile, (error, data) => {
    // enviamos una respuesta de error
    if (error) {
      return res.status(500).json({ error: "error reading file" });
    }  
    // guardamos los datos originales 
    const jsonData = JSON.parse(data);
    // encontramos el usuario por el id. con filter hacemos que muestre todos menos el borrado
    const usersUpdated = jsonData.filter(user => user.userId === userId);
    // escribir lo nuevo
    fs.writeFile(pathFile, JSON.stringify(usersUpdated), error => {
      if (error) {
        return res.status(500).json({ error: "error writing file" });
      }  
      // recurso actualizado 
      return res.status(202).json(usersUpdated);
    });
  });
};


module.exports = usersController;
