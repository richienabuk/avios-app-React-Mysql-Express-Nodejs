import productRoutes from "./product";
import express from "express";
import path from "path";

export default (app) => {
  app.get('/api/v1', (req, res) => res.status(200).send({
    status: 'success',
    data: 'Welcome to the Vasiti App API',
  }));

  app.use('/api/v1', productRoutes);

  app.use(express.static(path.join(__dirname, '../../../client/build')));

// Create a catch-all route for testing the installation.
  app.all('/api/v1/*', (req, res) => res.status(404).send({
    message: 'Route does not exist on this server',
  }));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/build/index.html'));
  });
};
