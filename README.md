# PID Tuner [![Netlify Status](https://api.netlify.com/api/v1/badges/5c00b705-8183-4a2a-9e15-ee96d5d26473/deploy-status)](https://pid-tuner.netlify.app/) [![Heroku](https://heroku-badge.herokuapp.com/?app=pid-tuner-condig)](https://pid-tuner-condig.herokuapp.com/)

> The best way to tune your PIDs.

This is a simple Web App that simulates the different PID tuning algorithms applied to your system. It allows you to visually compare the algorithms and pick the one that fits your project the best.

![Page Screenshot](/img/full-page)

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Teck Stack](#tech-stack)
- [Other Options](#other-options)
- [Authors](#authors)
- [License](#license)

## Live Demo

We are currently hosting the client on [Netlify](https://www.netlify.com/) and the server on [Heroku]().

- **Client:** https://pid-tuner.netlify.app/
- **Server:** https://pid-tuner-condig.herokuapp.com/

## Features

- Support for mobile platforms
- Simulate with your own system's model
- Execute various simulations in parallel to visually compare them
- Add Gaussian Noise to better simulate the real world
- Download the simulation results

## Tech Stack

We opted to go with a JavaScript frontend because it is, by far, the best tool in that department. Although, we prefered to create a Python backend because it is superior to JavaScript for Math and Simulations.

- **Client:** React, Chakra-UI
- **Server:** Flask, Numpy

## Other Options

If, instead of making the API in Python, we created some functions in JavaScript that could run directly in React, we could have then used [Electron](https://www.electronjs.org/) to turn this Web App into an executable and, therefore, access the USB Ports of the user to be able to apply the simulation to the actual system using the [Firmata.js](https://github.com/firmata/firmata.js/tree/master/packages/firmata.js) library.

Since we opted with a Python backend we cannot acess the user's system and can only simulate it. The ability to actually control the system in real-time would be a big addition to this project.

## Authors

- [1180798 - Pedro Morim](https://www.github.com/pmorim)
- [1180799 - Rui Sargo](https://github.com/RuiSargo)
- [1180872 - Miguel Santos](https://github.com/MjcSantos)

## License

[MIT](https://choosealicense.com/licenses/mit/)
