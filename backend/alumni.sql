-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 06, 2021 at 01:07 PM
-- Server version: 8.0.19
-- PHP Version: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alumni_db`
--
CREATE DATABASE IF NOT EXISTS `alumni_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `alumni_db`;

-- --------------------------------------------------------

--
-- Table structure for table `alumni`
--

CREATE TABLE `alumni` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `nim` char(20) NOT NULL,
  `nik` char(20) NOT NULL,
  `place_of_birth` varchar(45) NOT NULL,
  `date_of_birth` date NOT NULL,
  `major_study` varchar(45) NOT NULL,
  `graduation_year` year NOT NULL,
  `no_ijazah` char(20) NOT NULL,
  `phone` char(20) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `alumni_appraisers`
--

CREATE TABLE `alumni_appraisers` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `alumni_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `instansi` varchar(100) NOT NULL,
  `position` varchar(45) NOT NULL,
  `alumni_position` varchar(45) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `legalizes`
--

CREATE TABLE `legalizes` (
  `id` bigint UNSIGNED NOT NULL,
  `alumni_id` bigint UNSIGNED NOT NULL,
  `ijazah` varchar(255) NOT NULL,
  `transcript` varchar(255) NOT NULL,
  `is_verified` tinyint NOT NULL DEFAULT '0',
  `is_approved` tinyint NOT NULL DEFAULT '0',
  `verified_by` bigint UNSIGNED DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `approved_by` bigint UNSIGNED DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `ijazah_signed` varchar(255) DEFAULT NULL,
  `transcript_signed` varchar(255) DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 -> created\n2 -> process\n3 -> done',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` bigint UNSIGNED NOT NULL,
  `question_group_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `question_type` tinyint NOT NULL COMMENT '1 -> essay\n2 -> option\n3 -> checklist',
  `minimum_value` varchar(45) DEFAULT NULL,
  `maximum_value` varchar(45) DEFAULT NULL,
  `is_required` tinyint NOT NULL DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question_group_id`, `title`, `question_type`, `minimum_value`, `maximum_value`, `is_required`) VALUES
(1, 1, 'Bagaimana anda menggambarkan situasi sekarang?', 2, NULL, NULL, 1),
(2, 2, 'Tempat Kerja Anda saat ini', 1, NULL, NULL, 1),
(3, 2, 'Kapan Anda mulai mencari pekerjaan', 2, NULL, NULL, 1),
(4, 2, 'Bagaimana Anda mencari pekerjaan tersebut? (Jawaban boleh lebih dari satu)', 3, NULL, NULL, 1),
(5, 2, 'Berapa perusahaan/instansi/tempat kerja yang sudah Anda lamar (lewat surat atrau email) sebelum Anda memperoleh pekerjaan utama (jika tidak ada jawab lainnya)', 2, NULL, NULL, 1),
(6, 2, 'Berapa perusahaan/instansi/tempat kerja yang mengundang Anda untuk wawancara (jika tidak ada jawab lainnya', 2, NULL, NULL, 1),
(7, 2, 'Apa perusahaan/instansi/institusi tempat Anda bekerja sekarang?\n', 2, NULL, NULL, 1),
(8, 2, 'Kira-kira berapa pendapatan Anda setiap bulannya (IDR)? (isi dengan angka saja)\n', 1, NULL, NULL, 1),
(9, 3, 'Dimana anda melanjutkan kuliah :', 1, NULL, NULL, 1),
(10, 3, 'Jenjang kuliah saat ini: ', 2, NULL, NULL, 1),
(11, 4, 'Apakah anda aktif mencari pekerjaan dalam 4 minggu terakhir? ', 2, NULL, NULL, 1),
(12, 4, 'Apakah anda pernah bekerja sebelumya?', 2, NULL, NULL, 1),
(16, 5, 'Seberapa besar kesesuaian hubungan antara bidang studi dengan pekerjaan anda? (UNTUK YANG MENJAWAB CUKUP, KURANG, DAN TIDAK SAMA SEKALI, mohon jawab pertanyaan No. 9, JIKA ANDA MENJAWAB SANGAT SESUAI DAN SESUAI, silahkan jawab pertanyaan No. 10)', 2, NULL, NULL, 1),
(17, 5, 'Kemukanan alasan singkat, mengapa anda ambil pekerjaan ini \n', 1, NULL, NULL, 1),
(18, 5, 'Kesesuain kompetensi lulusan dengan kebutuhan tempat kerja Anda saat ini', 2, 'sangat sesuai', 'tidak sesuai', 1),
(19, 5, 'Alat praktek laboratorium yang Anda gunakan saat kuliah sesuai dengan standar', 2, 'sangat sesuai', 'tidak sesuai', 1),
(20, 5, 'Pembelajaran di laboratorium saat anda masih kuliah sudah sesuai dengan pencapaian kompetensi', 2, 'sangat sesuai', 'tidak sesuai', 1),
(21, 5, 'Sistem pembimbingan praktek klinik (rumah sakit, klinik, komunitas) di masa kuliah sudah sesuai dengan pasar kerja', 2, 'sangat sesuai', 'tidak sesuai', 1),
(22, 5, 'Kompetensi dosen pada saat kuliah sudah sesuai dengan keahliannya sehingga ilmu yang diberikan dapat diterapkan di pasar kerja\n', 2, 'sangat sesuai', 'tidak sesuai', 1),
(23, 5, 'Selain kompetensi utama yang saya miliki kompetensi tambahan lain yang harus dimiliki sesuai  dengan pekerjaan  saya (boleh pilih lebih dari satu)\n', 3, NULL, NULL, 1),
(24, 5, 'Kompetensi lain yang harus dimiliki/ditambah untuk bahan masukan ke jurusan/prodi saudara\n', 1, NULL, NULL, 1),
(25, 5, 'Sarana Prasarana yang harus dimiliki/ditambah untuk bahan masukan ke jurusan/prodi saudara (jelaskan dari alat laboratorium, bahan praktikum, metode pembelajaran, gedung, dll', 1, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `question_groups`
--

CREATE TABLE `question_groups` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `addressed_to` tinyint NOT NULL COMMENT '1 -> alumni\n2 -> alumni appraisal\n3 -> all',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `question_groups`
--

INSERT INTO `question_groups` (`id`, `title`, `addressed_to`) VALUES
(1, 'TRACER STUDY', 1),
(2, 'ISIAN UNTUK YANG SUDAH BEKERJA', 1),
(3, 'ISIAN UNTUK ALUMNI YANG MELANJUTKAN KULIAH', 1),
(4, 'ISIAN UNTUK ALUMNI YANG BELUM BEKERJA', 1),
(5, 'KESESUAIAN PEKERJAAN', 1),
(6, 'PENILAIAN PENGGUNA UNTUK ALUMNI', 2);

-- --------------------------------------------------------

--
-- Table structure for table `question_options`
--

CREATE TABLE `question_options` (
  `id` bigint UNSIGNED NOT NULL,
  `question_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `is_need_essay` tinyint NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `question_options`
--

INSERT INTO `question_options` (`id`, `question_id`, `title`, `is_need_essay`) VALUES
(1, 1, 'Saya sudah bekerja', 0),
(2, 1, 'Saya masih melanjutkan kuliah', 0),
(3, 1, 'Saya belum bekerja', 0),
(4, 1, 'Saya seddang mencari pekerjaan', 0),
(5, 1, 'Saya sudah menikah dan fokus mengurus keluarga', 0),
(6, 3, 'Sebelum lulus ', 0),
(7, 3, '≤3 bulan setelah lulus', 0),
(8, 3, '≥3 bulan setelah lulus', 0),
(9, 3, '≤6 bulan setelah lulus', 0),
(10, 3, '≥6 bulan setelah lulus', 0),
(11, 4, 'Melalui iklan di koran/majalan, brosur', 0),
(12, 4, 'Melamar ke perusahaan tanpa mengetahui lowongan yang ada\n', 0),
(13, 4, 'Pergi ke bursa pameran kerja', 0),
(14, 4, 'Mencari lewat internet/iklan online/milis', 0),
(15, 4, 'Dihubungi oleh perusahaan', 0),
(16, 4, 'Menghubungi agen tenaga kerja', 0),
(17, 4, 'Memperoleh informasi dari ikatan alumni\n', 0),
(18, 4, 'Memperoleh informasi dari kampus', 0),
(19, 4, 'Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll)\n', 0),
(20, 4, 'Melalui penempatan kerja atau magang', 0),
(21, 4, 'Bekerja di tempat praktek waktu semasa kuliah\n', 0),
(22, 5, 'Kurang dari 3 bulan', 0),
(23, 5, 'Lebih dari 3 bulan', 0),
(24, 5, 'Lainnya', 0),
(25, 6, 'Kurang dari 3 bulan', 0),
(26, 6, 'Lebih dari 3 bulan', 0),
(27, 6, 'Lainnya', 0),
(28, 7, 'Instansi pemerintah (termasuk BUMN)', 0),
(29, 7, 'Organisasi non profit/lembaga swadaya masyarakat', 0),
(30, 7, 'Perusahaan swasta', 0),
(31, 7, 'Wiraswasta/perusahaan sendiri', 0),
(32, 7, 'Lainnya', 0),
(33, 10, 'Sarjana terapan', 0),
(34, 10, 'Profesi', 0),
(35, 10, 'S2', 0),
(36, 10, 'Dll', 1),
(37, 11, 'Tidak', 0),
(38, 11, 'Tidak, tapi saya sedang menunggu hasil dari lamaran kerja', 0),
(39, 11, 'Ya, saya akan mulai bekerja dalam 2 minggu ke depan', 0),
(40, 11, 'Ya, tapi saya belum pasti akan berkerja dalam 2 minggu terakhir', 0),
(41, 12, 'Sudah di mana', 1),
(42, 12, 'Belum', 0),
(43, 16, 'Sangat sesuai\n', 0),
(44, 16, 'Sesuai', 0),
(45, 16, 'Cukup Sesuai', 0),
(46, 16, 'Kurang Sesuai\n', 0),
(47, 16, 'Tidak sama sekali', 0),
(48, 18, '1', 0),
(49, 18, '2', 0),
(50, 18, '3', 0),
(51, 18, '4', 0),
(52, 18, '5', 0),
(53, 19, '1', 0),
(54, 19, '2', 0),
(55, 19, '3', 0),
(56, 19, '4', 0),
(57, 19, '5', 0),
(58, 20, '1', 0),
(59, 20, '2', 0),
(60, 20, '3', 0),
(61, 20, '4', 0),
(62, 20, '5', 0),
(63, 21, '1', 0),
(64, 21, '2', 0),
(65, 21, '3', 0),
(66, 21, '4', 0),
(67, 21, '5', 0),
(68, 22, '1', 0),
(69, 22, '2', 0),
(70, 22, '3', 0),
(71, 22, '4', 0),
(72, 22, '5', 0),
(73, 23, 'Bahasa Asing', 0),
(74, 23, 'Kemampuan IT', 0),
(75, 23, 'Kemampuan berkomunikasi', 0),
(76, 23, 'Kemampuan analisis', 0),
(77, 23, 'Keterampilan riset', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_actived` tinyint NOT NULL DEFAULT '1',
  `user_type` tinyint NOT NULL DEFAULT '1' COMMENT '1 -> Alumni\n2 -> Alumni Appraiser\n3 -> Admin',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `is_actived`, `user_type`) VALUES
(1, 'rijal.asep.nugroho@gmail.com', '$2a$10$1di5VOOIKSolkQh/EqN59e1xsJgypVvOMdY507b3HouxXfWWkANC.', 'Admin', 1, 3),
(2, 'rijal.asep.nugroho@yandex.com', '$2a$10$1di5VOOIKSolkQh/EqN59e1xsJgypVvOMdY507b3HouxXfWWkANC.', 'Pejabat', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user_answers`
--

CREATE TABLE `user_answers` (
  `id` int UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `question_id` bigint UNSIGNED NOT NULL,
  `answer` json NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumni`
--
ALTER TABLE `alumni`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nim_unique` (`nim`),
  ADD UNIQUE KEY `nik_unique` (`nik`),
  ADD UNIQUE KEY `no_ijazah_unique` (`no_ijazah`),
  ADD UNIQUE KEY `phone_unique` (`phone`),
  ADD UNIQUE KEY `user_unique` (`user_id`),
  ADD KEY `fk_alumni_users_idx` (`user_id`);

--
-- Indexes for table `alumni_appraisers`
--
ALTER TABLE `alumni_appraisers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_unique` (`user_id`),
  ADD KEY `fk_alumni_appraisers_to_users_idx` (`user_id`),
  ADD KEY `fk_alumni_appraisers_to_alumni_idx` (`alumni_id`);

--
-- Indexes for table `legalizes`
--
ALTER TABLE `legalizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_legalizes_to_alumni_idx` (`alumni_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_questions_to_question_groups_idx` (`question_group_id`);

--
-- Indexes for table `question_groups`
--
ALTER TABLE `question_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question_options`
--
ALTER TABLE `question_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_question_options_to_questions_idx` (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_unique` (`email`);

--
-- Indexes for table `user_answers`
--
ALTER TABLE `user_answers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumni`
--
ALTER TABLE `alumni`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `alumni_appraisers`
--
ALTER TABLE `alumni_appraisers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `legalizes`
--
ALTER TABLE `legalizes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `question_groups`
--
ALTER TABLE `question_groups`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `question_options`
--
ALTER TABLE `question_options`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_answers`
--
ALTER TABLE `user_answers`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alumni`
--
ALTER TABLE `alumni`
  ADD CONSTRAINT `fk_alumni_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `alumni_appraisers`
--
ALTER TABLE `alumni_appraisers`
  ADD CONSTRAINT `fk_alumni_appraisers_to_alumni` FOREIGN KEY (`alumni_id`) REFERENCES `alumni` (`id`),
  ADD CONSTRAINT `fk_alumni_appraisers_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `legalizes`
--
ALTER TABLE `legalizes`
  ADD CONSTRAINT `fk_legalizes_to_alumni` FOREIGN KEY (`alumni_id`) REFERENCES `alumni` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_questions_to_question_groups` FOREIGN KEY (`question_group_id`) REFERENCES `question_groups` (`id`);

--
-- Constraints for table `question_options`
--
ALTER TABLE `question_options`
  ADD CONSTRAINT `fk_question_options_to_questions` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
