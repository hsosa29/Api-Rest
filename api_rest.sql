-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 12-02-2020 a las 17:09:31
-- Versión del servidor: 5.7.21
-- Versión de PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `api_rest`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

DROP TABLE IF EXISTS `autores`;
CREATE TABLE IF NOT EXISTS `autores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `pseudonimo` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`id`, `email`, `contrasena`, `pseudonimo`, `avatar`) VALUES
(1, 'hugo29@gmail.com', '123456', 'hsosa', NULL),
(2, 'madelin@hotmail.com', '654321', 'mm04', NULL),
(3, 'hsosa@outlook.com', '12345', 'hsosa29', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(256) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `cantidad`, `precio`) VALUES
(1, 'arroz', 20, 2),
(2, 'Nuevaq', 3, 4),
(3, 'cereal', 24, 4),
(4, 'mantequilla', 10, 4.5),
(7, 'Nueva', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

DROP TABLE IF EXISTS `publicaciones`;
CREATE TABLE IF NOT EXISTS `publicaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `resumen` varchar(255) NOT NULL,
  `contenido` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `votos` int(11) DEFAULT '0',
  `fecha_hora` timestamp NULL DEFAULT NULL,
  `autor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_publicaciones_autor` (`id`),
  KEY `autor_id` (`autor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id`, `titulo`, `resumen`, `contenido`, `foto`, `votos`, `fecha_hora`, `autor_id`) VALUES
(1, 'Roma', 'Buen viaje a Roma', 'Roma', NULL, 0, '2018-09-10 07:08:27', 1),
(2, 'Grecia', 'Buen viaje a Grecia', 'Grecia', NULL, 0, '2018-09-11 07:08:27', 1),
(3, 'Paris', 'Buen viaje a Paris', 'Paris', NULL, 0, '2018-09-12 07:08:27', 1),
(4, 'Costa Rica', 'Buen viaje a Costa Rica', 'Costa Rica', NULL, 0, '2018-09-13 07:08:27', 2),
(5, 'Mar de Plata', 'Buen viaje a Mar de Plata', 'Mar de Plata', NULL, 0, '2018-09-14 07:08:27', 2),
(6, 'Guadalajara', 'Buen viaje a Guadalajara', 'Guadalajara', NULL, 0, '2018-09-15 07:08:27', 2),
(7, 'China', 'Buen viaje a China', 'China', NULL, 2, '2018-09-16 07:08:27', 3),
(8, 'Los Angeles', 'Viaje a Los Angeles', 'New York', NULL, 4, '2018-09-22 06:00:00', 3),
(9, 'Detroit', 'Viaje a Detroit', 'Detroit', NULL, 4, '2018-09-22 06:00:00', 3),
(10, 'Seattle', 'Viaje a Seattle', 'Seattle', NULL, 4, '2018-09-22 06:00:00', 3);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `autores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
