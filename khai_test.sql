-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3308
-- Thời gian đã tạo: Th10 31, 2022 lúc 08:57 AM
-- Phiên bản máy phục vụ: 8.0.18
-- Phiên bản PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `khai_test`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `typeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_room_type` (`typeId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `rooms`
--

INSERT INTO `rooms` (`id`, `code`, `typeId`, `createdAt`) VALUES
(1, ' req.body.code', 1, '2022-10-31 07:16:40');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_types`
--

DROP TABLE IF EXISTS `room_types`;
CREATE TABLE IF NOT EXISTS `room_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pricePerDay` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `room_types`
--

INSERT INTO `room_types` (`id`, `name`, `pricePerDay`, `createdAt`) VALUES
(1, 'type room name', 10000, '2022-10-31 07:09:54');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `number` varchar(225) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `birthday` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `typeId` int(11) NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`email`),
  KEY `fk_user_user_type` (`typeId`),
  KEY `fk_user_user` (`createdBy`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `number`, `email`, `password`, `phoneNumber`, `birthday`, `address`, `picture`, `typeId`, `createdBy`, `createdAt`) VALUES
(1, 'admin account', '0', 'admin@gmail.com', '6c251d4a7bf52be824b34c4d8e34a26c1bd03c4e100510e8b3a02bdddea22c0e', NULL, NULL, NULL, NULL, 1, NULL, '2022-10-31 04:26:05'),
(5, 'user account', '1111 1111 1111 1111', 'user@gmail.com', '66727c3e48b44f1b1a5ac4c15a39027a7643f25800e9462432e9d824aa1ce735', '0967459885', 2147483647, 'Ho Chi Minh', NULL, 2, 1, '2022-10-31 07:10:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_room`
--

DROP TABLE IF EXISTS `user_room`;
CREATE TABLE IF NOT EXISTS `user_room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `roomId` int(11) NOT NULL,
  `start` double NOT NULL,
  `end` double NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_to_room` (`roomId`),
  KEY `fk_to_user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user_room`
--

INSERT INTO `user_room` (`id`, `userId`, `roomId`, `start`, `end`, `createdAt`) VALUES
(3, 5, 1, 1667204121000, 1667290521000, '2022-10-31 08:24:31'),
(4, 5, 1, 1667204121000, 1667290521000, '2022-10-31 08:24:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_types`
--

DROP TABLE IF EXISTS `user_types`;
CREATE TABLE IF NOT EXISTS `user_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user_types`
--

INSERT INTO `user_types` (`id`, `name`, `createdAt`) VALUES
(1, 'admin', '2022-10-31 10:53:25'),
(2, 'user', '2022-10-31 10:53:25');

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `fk_room_type` FOREIGN KEY (`typeId`) REFERENCES `room_types` (`id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_user` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_user_user_type` FOREIGN KEY (`typeId`) REFERENCES `user_types` (`id`);

--
-- Các ràng buộc cho bảng `user_room`
--
ALTER TABLE `user_room`
  ADD CONSTRAINT `fk_to_room` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`),
  ADD CONSTRAINT `fk_to_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
