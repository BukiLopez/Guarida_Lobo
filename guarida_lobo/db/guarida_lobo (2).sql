-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 04-08-2025 a las 17:09:08
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `guarida_lobo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `comic_id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT '1',
  `fecha_agregado` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id`, `usuario_id`, `comic_id`, `cantidad`, `fecha_agregado`) VALUES
(1, 3, 1, 1, '2025-07-18 08:51:37'),
(2, 3, 5, 1, '2025-07-18 09:29:48'),
(3, 4, 1, 1, '2025-07-18 10:44:11'),
(4, 4, 2, 1, '2025-07-18 10:44:35'),
(5, 4, 3, 1, '2025-07-18 10:44:37'),
(6, 4, 12, 1, '2025-07-18 10:44:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comics`
--

CREATE TABLE `comics` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `portada_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `editorial_id` int(11) DEFAULT NULL,
  `anio` int(11) DEFAULT NULL,
  `isbn` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saga_id` int(11) DEFAULT NULL,
  `numero_en_saga` int(11) DEFAULT NULL,
  `continuidad_id` int(11) DEFAULT NULL,
  `orden_en_continuidad` int(11) DEFAULT NULL,
  `contenido` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stock` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `comics`
--

INSERT INTO `comics` (`id`, `nombre`, `precio`, `descripcion`, `portada_url`, `editorial_id`, `anio`, `isbn`, `saga_id`, `numero_en_saga`, `continuidad_id`, `orden_en_continuidad`, `contenido`, `stock`) VALUES
(1, 'House of M', '199.00', 'Una realidad alterada por Scarlet Witch.', 'https://m.media-amazon.com/images/I/81ZQ6cJ4B2L._SY466_.jpg', 1, 2005, '9780785117213', 1, 1, 1, 1, 'House of M #1 al #8', 10),
(2, 'Messiah Complex', '219.00', 'La aparición de un nuevo mutante bebé cambia todo.', 'https://m.media-amazon.com/images/I/916Pg5ZI-IL._SY466_.jpg', 1, 2007, '9780785128677', 2, 1, 1, 2, 'X-Men #492–494, X-Men #205–207, New X-Men #44–46, X-Factor #25–27', 8),
(3, 'Second Coming', '229.00', 'Hope regresa al presente en medio del caos.', 'https://m.media-amazon.com/images/I/61ZzsrQ5MeL._SY466_.jpg', 1, 2010, '9780785146275', 3, 1, 1, 3, 'Second Coming #1–2, Uncanny X-Men #523–525, New Mutants #12–14, X-Men Legacy #235–237, X-Force #26–28', 7),
(4, 'Schism', '179.00', 'La ruptura entre Wolverine y Cyclops.', 'https://m.media-amazon.com/images/I/71z-flphcFL._SY466_.jpg', 1, 2011, '9780785156885', 4, 1, 1, 4, 'X-Men: Schism #1–5', 6),
(5, 'Civil War #1', '149.00', 'El conflicto entre héroes por el registro.', 'https://m.media-amazon.com/images/I/8178RfFOJSL._SY466_.jpg', 1, 2006, '9780785121791', 5, 1, NULL, NULL, 'Civil War #1', 5),
(6, 'Civil War #2', '149.00', 'Spider-Man revela su identidad.', 'https://m.media-amazon.com/images/I/81+UOyThIqL._SY466_.jpg', 1, 2006, '9780785121807', 5, 2, NULL, NULL, 'Civil War #2', 5),
(7, 'Dark Nights: Metal #1', '189.00', 'Los horrores del Multiverso Oscuro se desatan.', 'https://static.wikia.nocookie.net/marvel_dc/images/a/a4/Dark_Nights_Metal_Vol_1_1_Variant_1.jpg/revision/latest?cb=20170816195027', 2, 2017, '9781401277321', 6, 1, 2, 1, 'Dark Nights: Metal #1', 9),
(8, 'Dark Nights: Metal #2', '189.00', 'Batman cae ante Barbatos.', 'https://m.media-amazon.com/images/I/91mp9DnRxlL._UF894,1000_QL80_.jpg', 2, 2017, '9781401277338', 6, 2, 2, 2, 'Dark Nights: Metal #2', 9),
(9, 'Wolverine: Origin', '129.00', 'Los inicios de Logan.', 'https://m.media-amazon.com/images/I/81-rLP6ZJTL._SY466_.jpg', 1, 2001, '9780785109775', NULL, NULL, NULL, NULL, 'Wolverine: Origin #1–6', 7),
(10, 'Jean Grey: Phoenix Rising', '129.00', 'La resurrección de Jean.', 'https://cdn.marvel.com/u/prod/marvel/i/mg/6/e0/646b758fe80d0/clean.jpg', 1, 2005, '9780785118814', NULL, NULL, NULL, NULL, 'X-Men: Phoenix – The Untold Story + Classic material', 6),
(11, 'Batman: Year One', '149.00', 'Los primeros días de Batman.', 'https://m.media-amazon.com/images/I/61+hFGCapwL._SY466_.jpg', 2, 1987, '9781401207526', NULL, NULL, NULL, NULL, 'Batman #404–407', 10),
(12, 'Spider-Man: Blue', '129.00', 'Peter recuerda a Gwen.', 'https://m.media-amazon.com/images/I/719KB9F5Y7L._SY466_.jpg', 1, 2002, '9780785110719', NULL, NULL, NULL, NULL, 'Spider-Man: Blue #1–6', 8),
(13, 'The Walking Dead #115', '149.00', 'Inicio de All Out War.', 'https://m.media-amazon.com/images/I/61mYsuILB8L._SY466_.jpg', 3, 2013, '9781607068829', 7, 1, 3, 1, 'The Walking Dead #115', 4),
(14, 'The Walking Dead #126', '149.00', 'Final de All Out War.', 'https://m.media-amazon.com/images/I/5117plQlcML._SY466_.jpg', 3, 2014, '9781607068829', 7, 12, 3, 2, 'The Walking Dead #126', 4),
(15, 'Invincible #60', '139.00', 'El comienzo de la Viltrumite War.', 'https://m.media-amazon.com/images/I/61eT38aXqmL._SY466_.jpg', 3, 2009, '9781607060779', 8, 1, 4, 1, 'Invincible #60', 5),
(16, 'Invincible #75', '139.00', 'Guerra contra los Viltrumitas a toda escala.', 'https://m.media-amazon.com/images/I/611weYOtogL._SY466_.jpg', 3, 2010, '9781607061882', 8, 2, 4, 2, 'Invincible #75', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comic_personaje`
--

CREATE TABLE `comic_personaje` (
  `comic_id` int(11) NOT NULL,
  `personaje_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `comic_personaje`
--

INSERT INTO `comic_personaje` (`comic_id`, `personaje_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(9, 1),
(2, 2),
(3, 2),
(4, 2),
(2, 3),
(3, 3),
(10, 3),
(7, 4),
(8, 4),
(11, 4),
(8, 5),
(1, 6),
(5, 6),
(6, 6),
(12, 6),
(13, 7),
(14, 7),
(13, 8),
(14, 8),
(15, 9),
(16, 9),
(15, 10),
(16, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `continuidades`
--

CREATE TABLE `continuidades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `continuidades`
--

INSERT INTO `continuidades` (`id`, `nombre`) VALUES
(1, 'Extinción Mutante'),
(2, 'Multiverso Oscuro'),
(3, 'The Walking Dead Saga'),
(4, 'Invincible Saga');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `editoriales`
--

CREATE TABLE `editoriales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `editoriales`
--

INSERT INTO `editoriales` (`id`, `nombre`) VALUES
(1, 'Marvel'),
(2, 'DC Comics'),
(3, 'Image Comics');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajes`
--

CREATE TABLE `personajes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personajes`
--

INSERT INTO `personajes` (`id`, `nombre`) VALUES
(1, 'Wolverine'),
(2, 'Cyclops'),
(3, 'Jean Grey'),
(4, 'Batman'),
(5, 'Wonder Woman'),
(6, 'Spider-Man'),
(7, 'Rick Grimes'),
(8, 'Negan'),
(9, 'Invincible'),
(10, 'Omni-Man');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sagas`
--

CREATE TABLE `sagas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sagas`
--

INSERT INTO `sagas` (`id`, `nombre`) VALUES
(1, 'House of M'),
(2, 'Messiah Complex'),
(3, 'Second Coming'),
(4, 'Schism'),
(5, 'Civil War'),
(6, 'Dark Nights: Metal'),
(7, 'The Walking Dead: All Out War'),
(8, 'Invincible: Viltrumite War');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `password`) VALUES
(1, 'Marco Antonio', 'marcos@example.com', '$2b$10$BN/hb.oXMsw8uTVxzxK4qu8uCtxsq9oIESkIUDcZx8GlsgQi60Nuq'),
(2, 'Marco', 'marco@example.com', '$2b$10$ML79wx9ELkvSu2DMy8UDneNSIQX.X5C9kLkaMktaYG3bM6MZXSaKS'),
(3, 'Hassam', 'hassam@example.com', '$2b$10$hO0hng0/sTexaoIkbhgYleQ/HU9uKV/6WTHvKR27ol7fEKdYQeCOa'),
(4, 'dafnis', 'cain1@gmail.com', '$2b$10$irIhD/Chc6ClAuyYlZc.0OrDkzBLb62xTa7q/D55.fK9RrRUE7FWy');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario_id` (`usuario_id`,`comic_id`),
  ADD KEY `comic_id` (`comic_id`);

--
-- Indices de la tabla `comics`
--
ALTER TABLE `comics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `editorial_id` (`editorial_id`),
  ADD KEY `saga_id` (`saga_id`),
  ADD KEY `continuidad_id` (`continuidad_id`);

--
-- Indices de la tabla `comic_personaje`
--
ALTER TABLE `comic_personaje`
  ADD PRIMARY KEY (`comic_id`,`personaje_id`),
  ADD KEY `personaje_id` (`personaje_id`);

--
-- Indices de la tabla `continuidades`
--
ALTER TABLE `continuidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `editoriales`
--
ALTER TABLE `editoriales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sagas`
--
ALTER TABLE `sagas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `comics`
--
ALTER TABLE `comics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `continuidades`
--
ALTER TABLE `continuidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `editoriales`
--
ALTER TABLE `editoriales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `personajes`
--
ALTER TABLE `personajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `sagas`
--
ALTER TABLE `sagas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`comic_id`) REFERENCES `comics` (`id`);

--
-- Filtros para la tabla `comics`
--
ALTER TABLE `comics`
  ADD CONSTRAINT `comics_ibfk_1` FOREIGN KEY (`editorial_id`) REFERENCES `editoriales` (`id`),
  ADD CONSTRAINT `comics_ibfk_2` FOREIGN KEY (`saga_id`) REFERENCES `sagas` (`id`),
  ADD CONSTRAINT `comics_ibfk_3` FOREIGN KEY (`continuidad_id`) REFERENCES `continuidades` (`id`);

--
-- Filtros para la tabla `comic_personaje`
--
ALTER TABLE `comic_personaje`
  ADD CONSTRAINT `comic_personaje_ibfk_1` FOREIGN KEY (`comic_id`) REFERENCES `comics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comic_personaje_ibfk_2` FOREIGN KEY (`personaje_id`) REFERENCES `personajes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
