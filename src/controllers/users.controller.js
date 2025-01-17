const path = require('path');
const fs = require('fs');
const pathFile = path.resolve(__dirname, '../../data/users.json');

const usersController = {};

usersController.getAllUsers = (req, res) => {
  // primero leemos
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      // enviamos una respuesta de error
      res.status(500).json({ error: 'error reading the file' });
    } else {
      // guardamos la información leída
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    }
  });
};

usersController.getUserById = (req, res) => {
  const userId = req.params.id;

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.status(500).json({ error: 'error reading the file' });
    } else {
      const jsonData = JSON.parse(data);
      const userFounded = jsonData.find(user => user.userId === userId);
      if (userFounded) {
        res.status(200).json(userFounded);
      } else {
        res.status(404).json({ error: 'user not found' });
      }
    }
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
      res.status(500).json({ error: "error reading the file" });
    } else {
      // guardamos los datos originales
      const jsonData = JSON.parse(data);
      // guardamos los datos originales + los nuevos que introducimos de new data
      const newData = [...jsonData, newUser];
      // tenemos todos los datos en newData, ahora tenemos que escribirlo
      fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
        if (error) {
          res.status(500).json({ error: "error reading the file" });
        } else {
          res.status(201).json(newData);
        }
      });
    }
  });
};

usersController.updateUsers = (req, res) => {
  // buscar por id
  const userId = req.params.id;
  // primero debemos leer para buscar
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      // enviamos una respuesta de error
      res.status(500).json({ error: "error reading the file" });
    } else {
      // guardar los datos originales
      const jsonData = JSON.parse(data);
      // encontrar el usuario por el id
      const userFound = jsonData.find((user) => user.userId === userId);
      if (userFound) {
        res.status(200).json(userFound);
      } else {
        res.status(404).json({ error: "user not found" });
      }
      // escribir los nuevos datos
      userFound.name = req.body.name || userFound.name;
      userFound.email = req.body.email || userFound.email;
      // escribir lo nuevo
      fs.writeFile(pathFile, JSON.stringify(jsonData), (error) => {
        if (error) {
          res.status(500).json({ error: "error reading the file" });
        } else {
          // recurso actualizado
          res.status(202).json(jsonData);
        }
      });
    }
  });
};

usersController.deleteUser = (req, res) => {
  // buscar por id
  const userId = req.body.id;
  // primero leemos
  fs.readFile(pathFile, (error, data) => {
    // enviamos una respuesta de error
    if (error) {
      res.status(500).json({ error: "error reading the file"});
    } else {
      // guardamos los datos originales 
      const jsonData = JSON.parse(data);
      // encontramos el usuario por el id. con filter hacemos que muestre todos menos el borrado
      const usersUpdated = jsonData.filter(user => user.userId === userId);
      // escribir lo nuevo
      fs.writeFile(pathFile, JSON.stringify(usersUpdated), error => {
        if (error) {
          res.status(500).json({ error: "error reading the file"});
        } else {
          // recurso actualizado 
          res.status(202).json(usersUpdated);
        }
      });
    }
  });
};

module.exports = usersController;
